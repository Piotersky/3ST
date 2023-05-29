let dev = false;

document.addEventListener("DOMContentLoaded", function () {
  window.bridge.updateMessage(updateMessage);
});

const lang_en = [
  "3ST",
  "3 Sides of Triangle",
  "Signs description:",
  "Side a length",
  "Side b length",
  "Side c length",
  "Calculate!",
  "This triangle doesn't exist!",
  "Equilateral triangle",
  "Isosceles triangle",
  "Rectangular triangle",
  "Scalene triangle",
  "Triangle type: ",
  "Perimeter: ",
  "Height: ",
  "Area: ",
  "Angle measure α: ",
  "Angle measure β: ",
  "Angle measure γ: ",
  "Computing and rendering time: ",
  "Checking for updates...",
  "Downloading updates...",
  "Installing updates...",
];
const lang_pl = [
  "3ST",
  "3 Boki trójkąta   ",
  "Opis oznaczeń:",
  "Długość boku a",
  "Długość boku b",
  "Długość boku c",
  "Oblicz!",
  "Taki trójkąt nie istnieje!",
  "Trójkąt równoboczny",
  "Trójkąt równoramienny",
  "Trójkąt prostokątny",
  "Trójkąt różnoboczny",
  "Rodzaj trójkąta: ",
  "Obwód: ",
  "Wysokość: ",
  "Pole: ",
  "Miara kąta α: ",
  "Miara kąta β: ",
  "Miara kąta γ: ",
  "Czas obliczania i renderowania: ",
  "Sprawdzanie aktualizacji...",
  "Pobieranie aktualizacji...",
  "Instalowanie aktualizacji...",
];

let lang = lang_en;

let lang_elmt = document.getElementById("lang");
let ozn_elmt = document.getElementById("ozn");
let calc_btn = document.getElementById("calc");
let msg_elmt = document.getElementById("message");
let legenda_elmt = document.getElementById("legenda");

window.api.send("get", "");

window.api.receive("lang", (data) => {
  if (data == "pl") {
    lang = lang_pl;
    lang_elmt.src = "./img/pl.png";
    setText();
  }
  if (data == "en") {
    lang = lang_en;
    lang_elmt.src = "./img/en.png";
    setText();
  }
});

if (dev == false) {
  function updateMessage(event, message) {
    if (message == "0") message = lang[20];
    if (message == "1") message = lang[21];
    if (message == "2") {
      msg_elmt.style.display = "none";
      calc_btn.style.display = "inline-block";
      div_inputs.style.display = "inline-block";
      ozn_elmt.style.display = "inline";
      legenda_elmt.style.display = "inline";
    }
    if (message == "3") message = lang[22];
    msg_elmt = document.getElementById("message");
    msg_elmt.innerHTML = message;
  }

  let div_inputs = document.getElementById("inputs");

  div_inputs.style.display = "none";
  calc_btn.style.display = "none";
  ozn_elmt.style.display = "none";
  legenda_elmt.style.display = "none";
} else {
  msg_elmt.style.display = "none";
}

function setText() {
  document.title = lang[0];
  document.getElementById("title-text").textContent = lang[1];
  document.getElementById("ozn").textContent = lang[2];
  document.getElementById("a_side_text").textContent = lang[3];
  document.getElementById("b_side_text").textContent = lang[4];
  document.getElementById("c_side_text").textContent = lang[5];
  calc_btn.textContent = lang[6];
}

function change_lang(language) {
  if (language == "pl") {
    lang = lang_pl;
    lang_elmt.src = "./img/pl.png";
    window.api.send("set_pl", "pl");
    setText();
  }
  if (language == "en") {
    lang = lang_en;
    lang_elmt.src = "./img/en.png";
    window.api.send("set_en", "en");
    setText();
  }
}

function calc() {
  let start = Date.now();

  let string_a = document.getElementById("a_side").value;
  let string_b = document.getElementById("b_side").value;
  let string_c = document.getElementById("c_side").value;

  a = parseFloat(string_a.replaceAll(",", "."));
  b = parseFloat(string_b.replaceAll(",", "."));
  c = parseFloat(string_c.replaceAll(",", "."));

  if (a + b <= c || c + b <= a || c + a <= b ) {
    document.getElementById("ozn").textContent = lang[7];
    return
  }

  L = a + b + c; //Obwód

  P = Math.sqrt((L / 2) * (L / 2 - a) * (L / 2 - b) * (L / 2 - c)); // Pole ze wzoru Herona

  h = (P * 2) / a; // Wysokość z przekształcenia wzoru na pole trójkąta

  /**********************************/

  if (a == b && b == c) {
    type = lang[8];
  } else if (a == b || b == c || a == c) {
    type = lang[9];
  } else if (
    a ** 2 + b ** 2 == c ** 2 ||
    c ** 2 + b ** 2 == a ** 2 ||
    a ** 2 + c ** 2 == b ** 2
  ) {
    type = lang[10];
  } else {
    type = lang[11];
  }

  R = (a * b * c) / (4 * P);

  α = (Math.asin(b / (2 * R)) * 180) / Math.PI;
  γ = (Math.asin(a / (2 * R)) * 180) / Math.PI; //Suma miar kątów w trójkąccie jest równa 180°
  β = 180 - α - γ;

  /***************************************************************/

  let type_elmt = document.getElementById("type");
  let L_elmt = document.getElementById("L");
  let h_elmt = document.getElementById("h");
  let p_elmt = document.getElementById("s");
  let K_elmt = document.getElementById("a1");
  let K2_elmt = document.getElementById("a2");
  let K3_elmt = document.getElementById("a3");

  /***************************************************************/

  type_elmt.textContent = lang[12] + type;
  L_elmt.textContent = lang[13] + L;
  h_elmt.textContent = lang[14] + parseFloat(h.toFixed(4));
  p_elmt.textContent = lang[15] + parseFloat(P.toFixed(4));
  K_elmt.textContent = lang[16] + parseFloat(α.toFixed(4)) + "°";
  K2_elmt.textContent = lang[17] + parseFloat(β.toFixed(4)) + "°";
  K3_elmt.textContent = lang[18] + parseFloat(γ.toFixed(4)) + "°";
  ozn_elmt.textContent = "";

  /***************************************************************/

  let scale = 45 / L; //Ustalamy skalę

  //Skalujemy wdługości wszystkich boków

  a = a * scale;
  b = b * scale;
  c = c * scale;

  //Jeszcze raz liczymy obwód, pole i wysokość po przeskalowaniu wszystkich długości
  L = a + b + c;

  P = Math.sqrt((L / 2) * (L / 2 - a) * (L / 2 - b) * (L / 2 - c));

  h = (P * 2) / a;

  let XA, YA, XB, XC, YC; //Współrzędne wierzchołków na wizualizacji

  XA = -10;
  YA = -10;
  XB = XA + a;

  YC = YA + h;

  XC = XB - Math.sqrt(b ** 2 - h ** 2);

  if (β > 70) {
    XC = XA + Math.sqrt(c ** 2 - h ** 2);
  }

  // Ustalamy właściwości okienka wizualizacji
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

  //Zmieniamy układ współrzędnych na Kartezjański

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

  // Dodajemy obramówkę
  var rect = new Konva.Rect({
    x: -12,
    y: -12,
    width: 24,
    height: 24,

    stroke: "white",
    strokeWidth: 0.1,
  });

  var line_a;
  var line_b;
  var line_c;
  var line_h;
  var text_h;

  function refresh(step) {
    stage.removeChildren(); // Czyścimy canvas
    //Dodajemy do nowego canvasu
    var layer = new Konva.Layer();
    stage.add(layer);
    layer.add(rect);

    if (step == 1) layer.add(line_a);
    if (step == 2) {
      layer.add(line_a);
      layer.add(line_b);
    }
    if (step == 3) {
      layer.add(line_a);
      layer.add(line_b);
      layer.add(line_c);
    }
    if (step == 4) {
      layer.add(line_a);
      layer.add(line_b);
      layer.add(line_c);
      layer.add(line_h);
    }
    if (step == 5) {
      layer.add(line_a);
      layer.add(line_b);
      layer.add(line_c);
      layer.add(line_h);
      layer.add(text_h);

      // Lustrzane odbicie
      layer.find("Text").forEach((text) => {
        text.to({
          scaleY: -text.scaleY(),
        });
      });
    }
    layer.draw(); // Rysujemy
  }

  function animation(X1, Y1, X2, Y2, lenght) {
    j = (Y2 - Y1) / (X2 - X1);
    d = (Y1 * (X2 - X1) - X1 * (Y2 - Y1)) / (X2 - X1);

    Xci = X1 + (i * (X2 - X1)) / lenght;
    Yci = j * Xci + d;

    return [X1, Y1, Xci, Yci];
  }

  let i = 1;
  anim_a();
  function anim_a() {
    setTimeout(function () {
      animation_a();
      i++;
      if (i < a * 5) anim_a();
      else {
        i = 1;
        anim_b();
      }
    }, 20);
  }
  function anim_b() {
    setTimeout(function () {
      animation_b();
      i++;
      if (i < b * 5) anim_b();
      else {
        i = 1;
        anim_c();
      }
    }, 20);
  }
  function anim_c() {
    setTimeout(function () {
      animation_c();
      i++;
      if (i < c * 5) anim_c();
      else {
        i = 1;
        anim_h();
      }
    }, 20);
  }
  function anim_h() {
    setTimeout(function () {
      animation_h();
      i++;
      if (i < h * 5) anim_h();
      else {
        i = 1;
        half = YC - ((YC + 10) / 2);

        text_h = new Konva.Text({
          x: XC + 0.25,
          y: half,
          text: "h",
          fontSize: 1.5,
          fontFamily: "Calibri",
          fill: "white",
        });
        refresh(5);
      }
    }, 20);
  }

  function animation_a() {
    if (XA == XC) {
      Yci = YA + (((i / 25) * (YC - YA)) / a) * 5;
      line_a = new Konva.Line({
        points: [XA, YA, XC, Yci],
        stroke: "orange",
        strokeWidth: 0.25,
        lineCap: "round",
        lineJoin: "round",
      });
    } else {
      line_a = new Konva.Line({
        points: animation(XA, YA, XB, YA, a * 5),
        stroke: "orange",
        strokeWidth: 0.25,
        lineCap: "round",
        lineJoin: "round",
      });
    }
    refresh(1);
  }
  function animation_b() {
    if (XB == XC) {
      Yci = YA + (((i / 25) * (YC - YA)) / b) * 5;
      line_b = new Konva.Line({
        points: [XB, YA, XC, Yci],
        stroke: "orange",
        strokeWidth: 0.25,
        lineCap: "round",
        lineJoin: "round",
      });
    } else {
      line_b = new Konva.Line({
        points: animation(XB, YA, XC, YC, b * 5),
        stroke: "orange",
        strokeWidth: 0.25,
        lineCap: "round",
        lineJoin: "round",
      });
    }
    refresh(2);
  }
  function animation_c() {
    line_c = new Konva.Line({
      points: animation(XC, YC, XA, YA, c * 5),
      stroke: "orange",
      strokeWidth: 0.25,
      lineCap: "round",
      lineJoin: "round",
    });
    refresh(3);
  }

  function animation_h() {
    Yci = YA + (((i / 25) * (YC - YA)) / h) * 5;
    line_h = new Konva.Line({
      points: [XC, YA, XC, Yci],
      stroke: "red",
      strokeWidth: 0.15,
      lineCap: "round",
      lineJoin: "round",
    });
    refresh(4);
  }

  layer.draw();

  /***************************************************************/

  let time = document.getElementById("time");
  time.textContent = lang[19] + (Date.now() - start) + " ms";
}
