<script setup>
import Navbar from '../components/Navbar.vue'
import { useRouter} from 'vue-router'
import sprite from '../assets/MissingNo.png'

const router = useRouter(); //Router
const titulo="MissigNo";

let pokemonNamesString = localStorage.getItem('pokemonNames');
let namesArray = JSON.parse(pokemonNamesString);


function irAHome(){router.push({ name: 'Home' });};

function Busqueda(nombre) 
{
  let nombreInterno;
  let nombreAsNumber = Number(nombre);
  namesArray = Object.values(namesArray);

  if(!isNaN(nombreAsNumber) && nombreAsNumber > 1010) 
  {
    router.push({name:'MissingNo'})
  }
  else if(!isNaN(nombreAsNumber) && nombreAsNumber >= 1 && nombreAsNumber <= 1011) 
  {
    nombreInterno = namesArray[nombreAsNumber - 1];
  }
  else
  {
    nombreInterno = nombre.toLowerCase();
  }

  if(nombre == null || nombre == undefined || nombre =='' ||!namesArray.includes(nombreInterno)) 
  { 
    router.push({name:'MissingNo'})
  }
  else
  {
    nombreInterno = nombreInterno.charAt(0).toUpperCase()+ nombreInterno.slice(1);
    router.push({name:'Search', params:{pokemon:nombreInterno}})
  }
}

</script>
<template>
    <Navbar :Titulo="titulo" :Ir="irAHome" :Busqueda="Busqueda"/>
    <div class="contenedor">
        <h1 class="titulo" >MissingNo</h1>
        <img class="imagen" :src="sprite">
    </div>
</template>

<style scoped>
.contenedor
{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.titulo
{
    margin-top: 0.5em;
}
.imagen
{    
    margin-top: 0.5em;
    margin-bottom: 1em;
}

html
{
    margin: 0;
    padding: 0;
}

/* Arreglar el problema del bordesito blanco abajo */

</style>