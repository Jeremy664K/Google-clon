const botonAbrirApps = document.querySelector(".apps");
const botonAbrirCuentas = document.querySelector(".cuenta");

const aplicaciones = document.querySelector(".encabezado__aplicaciones");
const cuentas = document.querySelector(".encabezado__cuenta");

const buscador = document.querySelector(".buscador");

const contenedorBuscadorVoz = document.querySelector(".busqueda__voz");
const textoBuscadorVoz = document.querySelector(".busqueda__voz-texto");
const botonBuscadorVoz = document.querySelector(".busqueda__voz-boton");

const accesoDirectoHecho = document.querySelector(".acceso__directo__hecho");

let menuAbierto = false;

const abrirApps = () => {
  cuentas.classList.remove("grid");
  botonAbrirCuentas.classList.remove("pulsado__cuentas");
  aplicaciones.classList.toggle("grid");
  botonAbrirApps.classList.toggle("pulsado");

  menuAbierto = true;
};

const abrirCuentas = () => {
  aplicaciones.classList.remove("grid"),
  botonAbrirApps.classList.remove("pulsado"),
  cuentas.classList.toggle("grid"),
  botonAbrirCuentas.classList.toggle("pulsado__cuentas");

  menuAbierto = true;
};

const busqueda = (e) => {
  if ("Enter" == e.key) {
    const { value } = buscador;

    if (value != "") {
      window.location.href = "https://www.google.com/search?q=" + e;
      buscador.value = "";
    }
  }
};

const busquedaVoz = () => {
  botonBuscadorVoz.classList.add("grabando");
  textoBuscadorVoz.textContent = "Hable ahora";

  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

  const voice = new window.SpeechRecognition();

  voice.onresult = ({ results }) => {
    const result = results[0][0].transcript;
    textoBuscadorVoz.textContent = result;

    voice.stop();

    setTimeout(() =>
      window.open("https://google.com/search?q=" + result, 1800)
    );
  };

  voice.start();
};

const vistaBusquedaVoz = () => {
  contenedorBuscadorVoz.classList.toggle("grid");
  botonBuscadorVoz.classList.remove("grabando");
  textoBuscadorVoz.textContent = "Pulse el boton para hablar";
};

const accesoDirecto = (e) => {
  e.preventDefault();

  const nameValue = document.querySelector("#nombre").value;
  const urlValue = "https://" + document.querySelector("#url").value;

  if (nameValue != "" && urlValue != "") {
    const divContent = document.createElement("div");

    const anchor = document.createElement("a");

    anchor.href = urlValue;
    anchor.title = nameValue;

    const button = document.createElement("button");
    button.classList.add("transparente", "nuevo__acceso");

    const divTitleFirstLetter = document.createElement("div");
    divTitleFirstLetter.textContent = nameValue[0].toUpperCase();

    const paragraphValue = document.createElement("p");
    paragraphValue.textContent = nameValue;

    button.appendChild(divTitleFirstLetter);
    button.appendChild(paragraphValue);
    anchor.appendChild(button);
    divContent.appendChild(anchor);

    document.querySelector(".acceso__directo").appendChild(divContent);
    document.querySelector(".contenedor__crear__acceso").classList.remove("flex");

  } else alert("Rellene todos los campos");
};

document.querySelector(".acceso__directo__cancelar")
  .addEventListener("click", (e) => {
    e.preventDefault(); 

    document.querySelector("#nombre").value = "";
    document.querySelector("#url").value = "";
    document.querySelector(".contenedor__crear__acceso").classList.remove("flex");
  });

document.querySelector(".agregar__acceso-boton")
  .addEventListener("click", () => {
    document.querySelector(".contenedor__crear__acceso").classList.add("flex");
    document.getElementById("nombre").focus();
  });

document.querySelector(".personalizar").addEventListener("click", () => {
  const backgrounds = ["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B",];
  const randomChoice = Math.round(Math.random() * (backgrounds.length - 1));

  document.querySelector("body").style.backgroundColor = backgrounds[randomChoice];
  document.querySelector(".reiniciar__color").style.display = "block";
});

document.querySelector(".reiniciar__color").addEventListener("click", (e) => {
  e.preventDefault();

  document.body.style.backgroundColor = "#fff";
  document.querySelector(".reiniciar__color").style.display = "none";
});

document.querySelector(".contenido").addEventListener("click", (e) => {
  if(!e.target.classList.contains("encabezado__aplicaciones") || !e.target.classList.contains("encabezado__cuenta")) {
    aplicaciones.classList.remove("grid")
    botonAbrirApps.classList.remove("pulsado");
    cuentas.classList.remove("grid");
    botonAbrirCuentas.classList.remove("pulsado__cuentas");
    menuAbierto = false;
   }  
});

botonAbrirApps.addEventListener("click", abrirApps);
botonAbrirCuentas.addEventListener("click", abrirCuentas);

buscador.addEventListener("keypress", busqueda);

document.querySelector(".buscador__voz").addEventListener("click", vistaBusquedaVoz);
document.querySelector(".busqueda__voz-cerrar").addEventListener("click", vistaBusquedaVoz);
botonBuscadorVoz.addEventListener("click", busquedaVoz);

accesoDirectoHecho.addEventListener("click", accesoDirecto);