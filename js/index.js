function calc() {
  let start = Date.now();

  let string_a = document.getElementById("a_side").value;
  let string_b = document.getElementById("b_side").value;
  let string_c = document.getElementById("c_side").value;

  a = parseFloat(string_a.replaceAll(",", "."));
  b = parseFloat(string_b.replaceAll(",", "."));
  c = parseFloat(string_c.replaceAll(",", "."));

  L = a + b + c;

  P = Math.sqrt((L / 2) * (L / 2 - a) * (L / 2 - b) * (L / 2 - c));

  h = (P * 2) / a;

  /**********************************/
  type = "";
  α = 1;
  β = 1;
  γ = 1;

  /***************************************************************/

  let type_elmt = document.getElementById("type");
  let L_elmt = document.getElementById("L");
  let h_elmt = document.getElementById("h");
  let p_elmt = document.getElementById("p");
  let K_elmt = document.getElementById("k1");
  let K2_elmt = document.getElementById("k2");
  let K3_elmt = document.getElementById("k3");

  /**********************************/

  type_elmt.textContent = "Rodzaj trójkąta: " + type;
  L_elmt.textContent = "Obwód: " + L;
  h_elmt.textContent = "Wysokość: " + h;
  p_elmt.textContent = "Pole: " + P;
  K_elmt.textContent = "Miara kąta α: " + α + "°";
  K2_elmt.textContent = "Miara kąta β: " + β + "°";
  K3_elmt.textContent = "Miara kąta γ: " + γ + "°";

  /********************************************* */

  let scale;

  // if(a + b + c < 12) {
  //   scale = 15
  // }
  // if(a + b + c < 30 && a + b + c > 12) {
  //   scale = 20
  // }
  // if(a + b + c < 60 && a + b + c > 30) {
  //   scale = 30
  // }

  scale = 45 / L;

  a = a * scale;
  b = b * scale;
  c = c * scale;

  L = a + b + c;

  P = Math.sqrt((L / 2) * (L / 2 - a) * (L / 2 - b) * (L / 2 - c));

  h = (P * 2) / a;

  let XA, YA, XB, XC, YC;

  XA = 0;
  YA = 0;
  XB = XA + a;

  YC = YA + h;

  XC = XB - Math.sqrt(b ** 2 - h ** 2);

  if (β > 70) {
    XC = XA + Math.sqrt(c ** 2 - h ** 2);
  }

  // XA = XA * scale;
  // YA = YA * scale;
  // XB = XB + scale;
  // XC = XC + scale;
  // YC = YC + scale;

  var width = 500;
  var height = 500;
  var minX = -12;
  var maxX = 12;
  var minY = -12;
  var maxY = 12;
  var rangeX = maxX - minX;
  var rangeY = maxY - minY;
  var scaleX = width / rangeX;
  var scaleY = -height / rangeY;

  var stage = new Konva.Stage({
    container: "canvas",
    width: width,
    height: height,
    scaleX: scaleX,
    scaleY: scaleY,
    offset: {
      x: -12,
      y: 12,
    },
  });

  var layer = new Konva.Layer();
  stage.add(layer);

  var rect = new Konva.Rect({
    x: -12,
    y: -12,
    width: 24,
    height: 24,

    stroke: "white",
    strokeWidth: 0.1,
  });
  layer.add(rect);

  var AB = new Konva.Line({
    points: [XA, YA, XB, YA],
    stroke: "orange",
    strokeWidth: 0.25,
    lineCap: "round",
    lineJoin: "round",
  });

  layer.add(AB);

  var BC = new Konva.Line({
    points: [XB, YA, XC, YC],
    stroke: "orange",
    strokeWidth: 0.25,
    lineCap: "round",
    lineJoin: "round",
  });

  layer.add(BC);

  var CA = new Konva.Line({
    points: [XC, YC, XA, YA],
    stroke: "orange",
    strokeWidth: 0.25,
    lineCap: "round",
    lineJoin: "round",
  });

  layer.add(CA);

  layer.draw();

  // var stage = new Konva.Stage({
  //   container: "canvas",
  //   width: width,
  //   height: height,
  //   scaleX: scaleX,
  //   scaleY: scaleY,
  //   offset: {
  //     x: -12,
  //     y: 12,
  //   },
  // });

  // var layer = new Konva.Layer();
  // stage.add(layer);

  // var circle = new Konva.Circle({
  //   x: stage.width() / 2,
  //   y: stage.height() / 2,
  //   radius: 50,
  //   fill: "green",
  // });
  // layer.add(circle);

  // var scaleBy = 1.02;
  // stage.on("wheel", (e) => {
  //   // stop default scrolling
  //   e.evt.preventDefault();

  //   var oldScale = stage.scaleX();
  //   var pointer = stage.getPointerPosition();

  //   var mousePointTo = {
  //     x: (pointer.x - stage.x()) / oldScale,
  //     y: (pointer.y - stage.y()) / oldScale,
  //   };

  //   // how to scale? Zoom in? Or zoom out?
  //   let direction = e.evt.deltaY > 0 ? 1 : -1;

  //   // when we zoom on trackpad, e.evt.ctrlKey is true
  //   // in that case lets revert direction
  //   if (e.evt.ctrlKey) {
  //     direction = -direction;
  //   }

  //   var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  //   stage.scale({ x: newScale, y: newScale });

  //   var newPos = {
  //     x: pointer.x - mousePointTo.x * newScale,
  //     y: pointer.y - mousePointTo.y * newScale,
  //   };
  //   stage.position(newPos);
  // });

  let time = document.getElementById("time");
  time.textContent =
    "Czas obliczania i renderowania: " + (Date.now() - start) + " milisekund";
}

// var yaxis = new Konva.Arrow({
//   points: [0, 11, 0, -11],
//   pointerLength: 0.3,
//   pointerWidth: 0.2,
//   pointerAtBeginning: true,
//   fill: "green",
//   stroke: "green",
//   strokeWidth: 0.1,
// });
// layer.add(yaxis);

// var xaxis = new Konva.Arrow({
//   points: [11, 0, -11, 0],
//   pointerLength: 0.3,
//   pointerWidth: 0.2,
//   pointerAtBeginning: true,
//   fill: "green",
//   stroke: "green",
//   strokeWidth: 0.1,
// });
// layer.add(xaxis);

// function updateText(e) {
//   // position.text(
//   //   "(" + stage.getPointerPosition() + ")"
//   // );
//   // layer.batchDraw();
//   var pointerPos = stage.getPointerPosition();
//   var x = pointerPos.x;
//   var y = pointerPos.y;
//   position.text("(" + x + ", " + y + ")");
//   layer.batchDraw();
// }

//let start = Date.now();

// console.log(a);
// console.log(b);
// console.log(c);
// console.log(h);
// console.log(p);
// console.log(o);
// console.log(t);
// console.log(k1);
// console.log(k2);
// console.log(start)

/****************************************************************/

// var canvasElement = document.querySelector("#myCanvas");
// var ctx = canvasElement.getContext("2d");

/****************************************************************/

// let scale;

// scale = 50;

// a = a * scale;
// b = b * scale;
// c = c * scale;

/****************************************************************/

// let Xa, Ya, Xb, Xc, Yc;

// Xa = 30;
// Ya = 480;
// Xb = a;

/****************************************************************/

/*Xc = (b ** 2 + Xa ** 2 - Xb ** 2) / 2 * (Xa - Xb);

let D = (Ya * -2) ** 2 - 4 * (Ya ** 2 - c ** 2 + Xc ** 2 - 2 * Xc * Xa + Xa ** 2);

Yc = (b * -1 - Math.sqrt(D)) / 2 * a;*/

// for (let ka = 0; ka < 360; ka++) {
//     console.log(ka);
// }

// for (let kb = 0; kb < 360; kb++) {
//     console.log(kb);
// }

/****************************************************************/

//Xc = 0;
//Yc = 100;

/****************************************************************/

// function boki() {

//     ctx.beginPath();

//     ctx.moveTo(Xa, Ya);
//     ctx.lineTo(Xb, Ya);

//     ctx.lineTo(Xc, Yc);

//     ctx.closePath();

//     ctx.lineWidth = 3;
//     ctx.strokeStyle = '#000000';
//     ctx.stroke();
// }

/****************************************************************/

// console.log("P1: " + Xa + ", " + Ya);
// console.log("P2: " + Xb + ", " + Ya);
// console.log("P3: " + Xc + ", " + Yc);

/****************************************************************/

// ctx.font = "20px Arial";
// ctx.fillStyle = "#FFFFFF";

// if(Xb > Xc) {
//     ctx.fillText("b", (Xb - Xc) / 2, (Ya - Yc) / 2 + Yc - 10)
// }

// if(Xb < Xc) {
//     ctx.fillText("b", (Xc - Xb) / 2, (Ya - Yc) / 2 + Yc - 10)
// }

// if(Xa > Xc) {
//     ctx.fillText("c", (Xa - Xc) / 2 - 15, (Ya - Yc) / 2 + Yc + 10)

//     console.log((Xa - Xc) / 2, (Ya - Yc) / 2 + Yc + 10)
// }

// if(Xa < Xc) {
//     ctx.fillText("c", (Xc - Xa) / 2, (Ya - Yc) / 2 + Yc)
// }

// ctx.fillText("a", (Xb - Xa) / 2 - 10, Ya + 20)

/****************************************************************/

// boki();

// ctx.fillStyle = "#FFCC00";
// ctx.fill();

/****************************************************************/

// ctx.beginPath();

// ctx.moveTo(Xa, Ya);
// ctx.arc(Xa, Ya, 50, 0, 2 * Math.PI);

// ctx.moveTo(Xb, Ya);
// ctx.arc(Xb, Ya, 50, 0, 2 * Math.PI);

// ctx.moveTo(Xc, Yc);
// ctx.arc(Xc, Yc, 50, 0, 2 * Math.PI);

// ctx.closePath();

// ctx.strokeStyle = '#3d3d3d';
// ctx.stroke();

/****************************************************************/

// ctx.font = "25px Arial";
// ctx.fillStyle = "#000000";

// ctx.fillText("α", Xa + 20, Ya - 20)
// ctx.fillText("β", Xb - 37, Ya - 5)
// ctx.fillText("γ", Xc + 5, Yc + 40)

/****************************************************************/

// let k3 = 180 - k1 - k2;

// boki();

/****************************************************************/

// let rodzaj = document.getElementById("rodzaj");

// if (t == 0) {
//     rodzaj.textContent = "Trójkąt równoramienny";
// }

// if (t == 1) {
//     rodzaj.textContent = "Trójkąt równoboczny";
// }

// if (t == 2) {
//     rodzaj.textContent = "Trójkąt różnoboczny";
// }

// if (t == 3) {
//     rodzaj.textContent = "Trójkąt prostokątny";
// }

/****************************************************************/

// let a1 = document.getElementById("a");
// let b1 = document.getElementById("b");
// let c1 = document.getElementById("c");
// let h1 = document.getElementById("h");
// let p1 = document.getElementById("p");
// let K1 = document.getElementById("k1");
// let K2 = document.getElementById("k2");
// let K3 = document.getElementById("k3");
// let czas = document.getElementById("czas");

// /****************************************************************/

// a1.textContent = "Długość boku a = " + a;
// b1.textContent = "Długość boku b = " + b;
// c1.textContent = "Długość boku c: " + c;
// h1.textContent = "Wysokość: " + h;
// p1.textContent = "Pole: " + p;
// K1.textContent = "Miara kąta α: " + k1 + "°";
// K2.textContent = "Miara kąta β: " + k2 + "°";
// K3.textContent = "Miara kąta γ: " + k3 + "°";
// czas.textContent = "Czas generowania: " + (Date.now() - start) + " milisekund";
