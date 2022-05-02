"use strict";
const inputNombre = document.querySelector("#nombre");
const inputPoder = document.querySelector("#poder");
const inputFoto = document.querySelector("#foto");
const inputEdad = document.querySelector("#edad");
const imgUnicornio = document.querySelector("#unicornio");
const btnCrear = document.querySelector("#btnCrear");
const card = document.querySelector("#card");
const form = document.querySelector("#form");

const modNombre = document.querySelector("#moNombre");
const modPoder = document.querySelector("#moPoder");
const modFoto = document.querySelector("#moFoto");
const modEdad = document.querySelector("#moEdad");

//Validacion del formulario
function crearUnicornio() {
  const nombreUnicornio = inputNombre.value;
  const nombrePoder = inputPoder.value;
  const nombreFoto = inputFoto.value;
  const textoEdad = inputEdad.value;
   
   if (nombreUnicornio ===""){
     return alert("Falta el nombre")
   }
   
   if (nombrePoder ===""){
   return alert("NO tiene poder")
  }

  if (nombreFoto ===""){
   return alert("Se requiere foto")
  }

   if(textoEdad>9){
     return alert(
       "EL avatar esta muy viejo para pertenecer a este grupo"
     );
   }
  

  const dataUnicornio = {
    name: nombreUnicornio,
    power: nombrePoder,
    image: nombreFoto,
    age: textoEdad,
  };



  const fetchConfig = {
    method: "POST",
    body: JSON.stringify(dataUnicornio),
    headers: {
      "Content-type": "application/json",
    },
  };
  fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns", fetchConfig)
    .then((result) => {     
      return result.json();      
    })
    .then((result) => {
      console.log(result);
      limpiarInputs();
      obtenerUnicornios();
      
    })
    .catch((err) => {
      console.log(err);
    });
}

function limpiarInputs() {
  inputEdad.value = "";
  inputFoto.value = "";
  inputNombre.value = "";
  inputPoder.value = "";
}

function obtenerUnicornios() {
  fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns")
    .then((result) => result.json())
    .then((result) => {
      mostrarUnicornios(result);
    })
    .catch((err) => console.log(err));
}

function mostrarUnicornios(arrayUnicornios) {
  arrayUnicornios.forEach((element) => {
  
    const div = document.createElement("div");
    const button = document.createElement("button");
    const modificar = document.createElement("button");
    
    div.className = 'col-7 col-md-5  col-sm-6'
    const liTemplate = `
            <div class="card">
            <img src='${element.image}' class="card-img-top"> </img>  
            <ul class="list-group list-group-flush">           
                  <li class="list-group-item"> <h4> ${"Name: "+element.name} </h4></li>
                  <li class="list-group-item"> <h4> ${"Power: "+element.power} </h4></li>
                  <li class="list-group-item"> <h4> ${"Age: "+element.age} </h4></li>
                  
            </ul>

                <button oncLick="modificarUnicornio('${element._id}')" type="button" class="btn btn-outline-primary"> MODIFICAR </button> 
                <button oncLick="deleteUnicornio('${element._id}')" type="button" class="btn btn-outline-primary"> DELETE </button> 
                </div>
        
    `;
/* <button oncLick="modificarUnicornio('${element._id}')" type="button"> MODIFICAR </button> */
    modificar.addEventListener("click", function (){
      modificarUnicornio(element._id);
    });

    button.addEventListener("click", function () {
      deleteUnicornio(element._id);
    });
  
    div.innerHTML = liTemplate;
    card.appendChild(div);
  });
}
//Metodo ELiminar
function deleteUnicornio(id) {

  const setupOp = {
    method: "DELETE",
  };
  
  fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns/" + id, setupOp)
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
}


//Metodo Modificar
function modificarUnicornio(id) {
  const nombre = modNombre.value;
  const poder = modPoder.value;
  const foto = modFoto.value;
  const edad = modEdad.value;

  const data = {
    name: nombre,
    power: poder,
    image: foto,
    age: edad,
  };

  const options = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns/" +id, options)
    .then((result) => result.json())
    // .then((result)=> console.log(result))
    .catch((err) => console.log(err));
}


btnCrear.addEventListener("click", crearUnicornio);
obtenerUnicornios();

//validacion del formulario agregar



//Metodo

/* // Metodo get / obtener datos. */
// function renderUnicornio(imagen){
//     const image = document.createElement('img')
//     image.id = "unicornio"
//     image.src = imagen
//     card.appendChild(image)

//    /* imgUnicornio.src = image.toString() */
// }

// function obtenerUnicornios(){
//     fetch("https://unicorns-api.herokuapp.com/api/v1/unicorns")
//         .then(response => response.json())
//         .then(data =>  {
//             console.log(data)
//             let imagen = data[1].image
//             renderUnicornio(imagen)
//         }

//             //
//                 )
//         .catch(error=>(console.log(error)))
//     }

// form.addEventListener("submit",e=> {
//   e.preventDefault()
//   let warning = ""
//   if(inputEdad.Value.length >9){
//     console.log("ES mayor que 9")
//     alert("El avatar no puede ser mayor de 9 años")
//   }
