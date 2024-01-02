<script setup>
import {ref} from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import PokemonCard from '../components/PokemonCard.vue'

const router = useRouter();

let sprites = ref([]);  
let names = ref([""]);
let namesArray;

let imagenCargada = ref(false);
let numeroDePokemones = 1010;
let titulo="Home";

function irAHome(){router.push({ name: 'Home' });};
function determinarClase(id){return id < 650 ? 'sprite' : 'sprite-2';}
function ponerNombre(id){return names[id].charAt(0).toUpperCase()+names[id].slice(1);}
function ponerNombre2(id){return names[id].length> 8 ? 'nombrePokemon-2':'nombrePokemon';}

function TraerDatos() 
{
  imagenCargada.value = false; 

  const requests = [];
  
  for (let i = 1; i <= numeroDePokemones; i++) 
  {  
    const request = axios.get("https://pokeapi.co/api/v2/pokemon/" + i)
    .then((res) => {
      
      let sprite;
      
      if (res.data.id < 650) 
      {
        sprite = res.data.sprites.versions['generation-v']['black-white'].animated.front_default;
        
      } else 
      {
        sprite = res.data.sprites.other['official-artwork'].front_default;
      }

      names[i]=res.data.name;
      
      return {
        id: res.data.id,
          sprite: sprite
        };
      });
      
      requests.push(request);
  }
    
  Promise.all(requests).then((spritesData) => 
  {
    spritesData.sort((a, b) => a.id - b.id);
    sprites.value = spritesData.map((item) => item.sprite);
    imagenCargada.value = true;

    localStorage.setItem('pokemonNames', JSON.stringify(names));
    let pokemonNamesString = localStorage.getItem('pokemonNames');
    namesArray = JSON.parse(pokemonNamesString);
    namesArray = Object.values(namesArray);
  })
  .catch(error => console.log(error));
}

TraerDatos();




function Busqueda(nombre) 
{
  let nombreInterno;
  let nombreAsNumber = Number(nombre);

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
<!-- NAVVBAR -->
<Navbar :Titulo="titulo" :Ir="irAHome" :Busqueda="Busqueda"/>

<!-- Pokebola -->

<div v-if="imagenCargada" class="Container">
  <PokemonCard 
  v-for="(sprite, index) in sprites" :key="index"  
  :sprite="sprite" 
  :index="index" 
  :determinarClase="determinarClase" 
  :ponerNombre="ponerNombre" :ponerNombre2="ponerNombre2" :Busqueda="Busqueda" />
</div>

</template>


<style scoped>
.Container
{
 /*background-color: blue;*/
  margin: 3.8em 1em 1em 1em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>

<!-- Agregar un fondo con patron de pokebolas  -->
