let entrada, boton;
let rebanadas = 0;
let mostrarPizzas = false;

function setup() {
  createCanvas(800, 300);
  angleMode(DEGREES);

  entrada = createInput();
  entrada.position(10, height + 10);
  entrada.attribute("placeholder", "Rebanadas");

  boton = createButton("Generar Pizzas");
  boton.position(entrada.x + entrada.width + 10, height + 10);
  boton.mousePressed(() => {
    rebanadas = int(entrada.value());
    if (rebanadas > 0) mostrarPizzas = true;
  });
}

function draw() {
  background(255);

  if (mostrarPizzas && rebanadas > 0) {
    dibujarPizza(
      130,
      height / 2,
      100,
      rebanadas,
      lineaPuntoPendiente,
      "Punto-Pendiente"
    );
    dibujarPizza(400, height / 2, 100, rebanadas, lineaDDA, "DDA");
    dibujarPizza(670, height / 2, 100, rebanadas, lineaBresenham, "Bresenham");
  }
}

function dibujarPizza(x, y, radio, rebanadas, algoritmoLinea, etiqueta) {
  fill(255, 240, 200);
  stroke(0);
  ellipse(x, y, radio * 2, radio * 2);

  fill(0);
  textAlign(CENTER);
  text(etiqueta, x, y + radio + 20);

  let pasoAngulo = 360 / rebanadas;
  for (let i = 0; i < rebanadas; i++) {
    let angulo = i * pasoAngulo;
    let xFinal = x + radio * cos(angulo);
    let yFinal = y + radio * sin(angulo);
    algoritmoLinea(x, y, xFinal, yFinal);
  }
}

//puntopendiente
function lineaPuntoPendiente(x0, y0, x1, y1) {
  stroke(255, 100, 100);

  let dx = x1 - x0;
  let dy = y1 - y0;

  if (abs(dx) >= abs(dy)) {
    let m = dy / dx;
    let paso = dx > 0 ? 1 : -1;
    for (let x = x0; x !== int(x1); x += paso) {
      let y = y0 + m * (x - x0);
      point(x, y);
    }
  } else {
    let mInv = dx / dy;
    let paso = dy > 0 ? 1 : -1;
    for (let y = y0; y !== int(y1); y += paso) {
      let x = x0 + mInv * (y - y0);
      point(x, y);
    }
  }
  point(x1, y1);
}

//dda
function lineaDDA(x0, y0, x1, y1) {
  stroke(100, 100, 255);
  let dx = x1 - x0;
  let dy = y1 - y0;

  let pasos = max(abs(dx), abs(dy));
  let incrementoX = dx / pasos;
  let incrementoY = dy / pasos;

  let x = x0;
  let y = y0;
  for (let i = 0; i <= pasos; i++) {
    point(round(x), round(y));
    x += incrementoX;
    y += incrementoY;
  }
}

//bresenham
function lineaBresenham(x0, y0, x1, y1) {
  stroke(150, 0, 150);

  let dx = abs(x1 - x0);
  let dy = abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let error = dx - dy;

  while (true) {
    point(x0, y0);
    if (x0 === int(x1) && y0 === int(y1)) break;
    let e2 = 2 * error;
    if (e2 > -dy) {
      error -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      error += dx;
      y0 += sy;
    }
  }
}
