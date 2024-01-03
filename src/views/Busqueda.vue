<script setup>
import { useRoute, useRouter} from 'vue-router'
import {ref ,watch} from 'vue'
import Navbar from '../components/Navbar.vue'
import InformacionPokemon from '../components/InformacionPokemon.vue';

const route = useRoute();//Ruta
const router = useRouter(); //Router

let pokemon = ref(route.params.pokemon);

let pokemonNamesString = localStorage.getItem('pokemonNames');
let namesArray = JSON.parse(pokemonNamesString);
    
watch(route, () => {pokemon.value = route.params.pokemon;});
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
    <Navbar :Titulo="pokemon" :Ir="irAHome" :Busqueda="Busqueda"/>
    <InformacionPokemon :pokemonName="pokemon" :key="pokemon"></InformacionPokemon>
</template>

<style scoped>

</style>