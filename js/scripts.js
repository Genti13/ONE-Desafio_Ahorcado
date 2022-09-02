function cerrarPantalla(pantalla) {
    pantalla.style.display = "none";
}

function abrirPantalla(pantalla, modo) {
    pantalla.style.display = modo;
}

function irMenuPrincipal() {
    cerrarPantalla(menuPalabra);
    abrirPantalla(menuPrincipal, "flex");
}

function irMenuPalabra() {
    cerrarPantalla(menuPrincipal);
    abrirPantalla(menuPalabra, "block");
}

function irJuego() {
    cerrarPantalla(menuPrincipal);
    abrirPantalla(juego, "block");
    comenzarJuego();
}

function nuevaPartida() {
    resetLetras();
    eliminarHijos(document.getElementById("letrasPalabra"));
    comenzarJuego();
}

function rendirse() {
    cerrarPantalla(juego);
    irMenuPrincipal();
    resetLetras();
    eliminarHijos(document.getElementById("letrasPalabra"));
}

function resetLetras() {
    document.getElementById("letrasUsadas").innerHTML = "";
    letrasUsadas = [];
}

function resetIntentos() {
    intentos = 7;
}

function resetLetrasCorrectas() {
    letrasCorrectras = 0;
}

function comenzarJuego() {
    jugando = true;
    resetIntentos();
    resetLetrasCorrectas();
    palabra = palabras[Math.floor(Math.random() * palabras.length)];

    limpiarCanvas();
    dibujarHorca();


    for (let i = 0; i < palabra.length; i++) {
        var nuevoDiv = document.createElement("div");
        var nuevaLetra = document.createElement("h3");
        var nuevaBarra = document.createElement("img");

        nuevaBarra.setAttribute('src', "img/barra.png");

        nuevoDiv.appendChild(nuevaLetra);
        nuevoDiv.appendChild(nuevaBarra);

        document.getElementById("letrasPalabra").appendChild(nuevoDiv);
    }

}

function eliminarHijos(padre) {
    while (padre.firstChild) {
        padre.removeChild(padre.firstChild);
    }
}

function agregarPalabra() {
    let nuevaPalabra = document.getElementById("palabraNueva").value;
    nuevaPalabra = nuevaPalabra.toUpperCase();

    if (palabras.includes(nuevaPalabra)) {
        alert("Ya existe " + nuevaPalabra + " en la lista");
    } else {
        if (nuevaPalabra.length > 8 || nuevaPalabra.length < 4) {
            alert("La palabra debe contener como maximo 8 caracteres y minimo 4")
        }
        else {
            palabras.push(nuevaPalabra);
            alert("Se agrego " + nuevaPalabra + " a la lista");
            nuevaPalabra.innerHTML = "";
        }
    }
}

function dibujarCabeza(radio) {
    pincel.arc(ancho * 0.7, altura * 0.3 + radio, radio, 1.5 * Math.PI, 3.5 * Math.PI);
}

function dibujarTorso(cabeza) {
    dibujarLinea(ancho * 0.7, altura * 0.3 + 2 * cabeza, ancho * 0.7, altura * 0.65);
}

function dibujarBrazoIzq() {
    dibujarLinea(ancho * 0.7, altura * 0.43, ancho * 0.75, altura * 0.50);
}

function dibujarBrazoDer() {
    dibujarLinea(ancho * 0.7, altura * 0.43, ancho * 0.65, altura * 0.50);
}

function dibujarPiernaIzq() {
    dibujarLinea(ancho * 0.7, altura * 0.65, ancho * 0.73, altura * 0.7);
}

function dibujarPiernaDer() {
    dibujarLinea(ancho * 0.7, altura * 0.65, ancho * 0.67, altura * 0.7);

}

function dibujarMonigote(parte) {
    let radCabeza = 50;

    pincel.beginPath();

    switch (parte) {
        case 7: dibujarCabeza(radCabeza); break;
        case 6: dibujarTorso(radCabeza); break;
        case 5: dibujarBrazoIzq(); break;
        case 4: dibujarBrazoDer(); break;
        case 3: dibujarPiernaIzq(); break;
        case 2: dibujarPiernaDer(); break;
    }

    pincel.stroke();
}

function dibujarLinea(x1, y1, x2, y2) {
    pincel.moveTo(x1, y1);
    pincel.lineTo(x2, y2);
}

function limpiarCanvas() {
    pincel.fillStyle = "#ffffff";
    pincel.fillRect(0, 0, ancho, altura);
}

function dibujarHorca() {
    let grosorPincel = 30;
    pincel.lineWidth = grosorPincel;
    pincel.strokeStyle = "#0A3871";

    pincel.beginPath();

    dibujarLinea(ancho * 0.33, altura - grosorPincel/2, ancho * 0.66, altura - grosorPincel/2);

    dibujarLinea(ancho * 0.5, altura, ancho * 0.5, altura * 0.2);

    dibujarLinea(ancho * 0.5 - grosorPincel/2, altura * 0.2, ancho * 0.7, altura * 0.2);

    dibujarLinea(ancho * 0.7, altura * 0.2 - grosorPincel/2, ancho * 0.7, altura * 0.3);

    pincel.stroke();

}

const palabras = ["HOLA", "JAMON", "GATO", "PEPINO", "JUPITER", "MERCEDES", "FRIO",
    "LIBRO", "PAIS", "PERRO", "LORO", "RATA", "JAPON", "MINERAL"];

var menuPrincipal = document.getElementById("menu-principal");
var menuPalabra = document.getElementById("menu-agregarPalabra");
var juego = document.getElementById("juego");
var letrasUsadas = [];

var intentos;
var letrasCorrectras = 0;
var palabra;

//Menu Principal
const boton_start = document.getElementById("boton_start");
const boton_palabraNueva = document.getElementById("boton_palabraNueva");

boton_palabraNueva.onclick = irMenuPalabra;
boton_start.onclick = irJuego;

//Menu de agregar Nueva Palabra
const boton_guardar = document.getElementById("boton_guardar");
const boton_volver = document.getElementById("boton_volver");

boton_volver.onclick = irMenuPrincipal;
boton_guardar.onclick = agregarPalabra;

//Juego
const boton_nuevaPartida = document.getElementById("boton_nuevaPartida");
const boton_rendirse = document.getElementById("boton_rendirse");

boton_rendirse.onclick = rendirse;
boton_nuevaPartida.onclick = nuevaPartida;

//Canvas
const canvas = document.getElementById("monigote");
const altura = canvas.height;
const ancho = canvas.width;
const pincel = canvas.getContext("2d");

function validaLetra(letra) {
    if (intentos && letrasCorrectras != palabra.length && juego.style.display == "block") {

        //Se evalua si la tecla presionada esta entre la a y la a
        if (letra.charCodeAt(0) >= 97 && letra.charCodeAt(0) <= 122) {
            letra = letra.toUpperCase();

            //Si la letra no se habia ingresado antes la agrega al arreglo y ejecuta todo
            //Si la letra ya se uso, retorna y no ejecuta nada
            if (!letrasUsadas.includes(letra)) {
                letrasUsadas.push(letra);

                //Se escribe en pantalla la lista de letras ya usadas
                this.document.getElementById("letrasUsadas").innerHTML = letrasUsadas.join(" ");

                //Si la letra esta en la palabra a adivinar, esta se escribe en las lineas superiores

                if (palabra.includes(letra)) {
                    for (let i = 0; i < palabra.length; i++) {
                        if (palabra[i] == letra) {
                            document.getElementById("letrasPalabra").children.item(i).firstChild.innerHTML = letra;
                            letrasCorrectras++;

                            if (letrasCorrectras == palabra.length) {
                                setTimeout(function () {
                                    alert("GANASTE");
                                }, 100)

                            }
                        }
                    }

                } else {
                    dibujarMonigote(intentos);
                    intentos--;

                    if (!intentos) {
                        alert("GAME OVER la palabra era: " + palabra);
                    }

                }
            }
        }

    }
}

canvas.addEventListener('touchstart', function () {
    validaLetra(prompt("Ingrese Letra"));
})

window.addEventListener('keydown', function (k) {
    if (k.key.length == 1) {
        validaLetra(k.key.toLocaleLowerCase());
    }
})