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

function nuevaPartida(){
    resetLetras();
    eliminarHijos(document.getElementById("letrasPalabra"));
    comenzarJuego();
}

function rendirse() {
    jugando = false;
    cerrarPantalla(juego);
    irMenuPrincipal();
    resetLetras();
    eliminarHijos(document.getElementById("letrasPalabra"));
}

function resetLetras() {
    document.getElementById("letrasUsadas").innerHTML = "";
    letrasUsadas = [];
}

function comenzarJuego() {
    jugando = true;
    intentos = 6;
    palabra = palabras[Math.floor(Math.random() * palabras.length)];

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

function dibujarCabeza(){

}

function dibujarTorso(){

}

function dibujarBrazoIzq(){

}

function dibujarBrazoDer(){

}

function dibujarPiernaIzq(){

}

function dibujarPiernaDer(){
    
}

function dibujarMonigote(parte){
    switch(parte){
        case 1: dibujarCabeza(); break;
        case 2: dibujarTorso(); break;
        case 3: dibujarBrazoIzq(); break;
        case 4: dibujarBrazoDer(); break;
        case 5: dibujarPiernaIzq(); break;
        case 6: dibujarPiernaDer(); break;
    }
}

const palabras = ["HOLA", "JAMON", "GATO", "PEPINO"];

var menuPrincipal = document.getElementById("menu-principal");
var menuPalabra = document.getElementById("menu-agregarPalabra");
var juego = document.getElementById("juego");
var letrasUsadas = [];

var jugando = false;
var intentos = 6;
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

window.addEventListener('keydown', function (k) {
    let kLetra = k.key;

    if (jugando && intentos) {

        //Se evalua si la tecla presionada esta entre la a y la a
        if (kLetra.charCodeAt(0) >= 97 && kLetra.charCodeAt(0) <= 122) {
            kLetra = kLetra.toLocaleUpperCase();

            //Si la letra no se habia ingresado antes la agrega al arreglo
            if (!letrasUsadas.includes(kLetra)) {
                letrasUsadas.push(kLetra);
            }

            //Se escribe en pantalla la lista de letras ya usadas
            this.document.getElementById("letrasUsadas").innerHTML = letrasUsadas.join(" ");

            //Si la letra esta en la palabra a adivinar, esta se escribe en las lineas superiores
            if (palabra.includes(kLetra)) {
                for (let i = 0; i < palabra.length; i++) {
                    if (palabra[i] == kLetra) {
                        document.getElementById("letrasPalabra").children.item(i).firstChild.innerHTML = kLetra;
                    }
                }
            } else {
                intentos--;

                dibujarMonigote(intentos);

                if(!intentos){
                    this.alert("GAME OVER");
                }
            }
        }





    }
})