<script setup>
import { defineProps,ref } from 'vue'
import PokeBall from '../assets/PokeBola.svg';

const inputValue = ref('') 
const props = defineProps({
  Titulo: String,
  Ir: Function,
  Busqueda:Function
});

const exceptions = [
  "ho-oh",
  "jangmo-o",
  "hakamo-o",
  "kommo-o",
  "tapu-koko",
  "tapu-lele",
  "tapu-bulu",
  "tapu-fini",
  "great-tusk",
  "scream-tail",
  "brute-bonnet",
  "flutter-mane",
  "slither-wing",
  "sandy-shocks",
  "iron-treads",
  "iron-bundle",
  "iron-hands",
  "iron-jugulis",
  "iron-moth",
  "iron-thorns",
  "wo-chien",
  "chien-pao",
  "ting-lu",
  "chi-yu",
  "roaring-moon",
  "iron-valiant",
  "walking-wake",
  "iron-leaves"
  ];

function CortarGuion(name) 
{
  if (exceptions.includes(name)) 
  {
    return name; 
  }else
  {
    return name.split("-")[0];
  }
}


const buscarPokemon = () => 
{
  props.Busqueda(inputValue.value);
  inputValue.value = '';
};
</script>

<template>
  <nav class="navbar navbar-expand-lg custom-navbar ">
    <div class="container-fluid navbar-container">
        <a class="navbar-brand" href="#" @click="props.Ir">
            <img :src="PokeBall" class="img-logo">
            TBBLuxari
        </a>
        <div class="flex-grow-1 text-center titulo-container">
            <span class="navbar-text titulo-navbar">{{ CortarGuion(props.Titulo.toLocaleLowerCase()) }}</span>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <form id="BuscarPokemon" class="d-flex ms-auto" @submit.prevent="buscarPokemon">
            <input type="text" class="form-control input-search"  v-model="inputValue" placeholder=" Example (Cofagrigus or 563)" name="search">
            <button type="submit" class="btn custom-search-btn ms-3">Search</button>
          </form>
        </div>
    </div>
  </nav>
</template>

<style scoped>
.custom-navbar
{
  background-color: rgb(231, 15, 15);
}
.navbar-toggler 
{
  border-color: #ffffff;
}
.navbar-toggler-icon 
{
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
@media (min-width: 992px) 
{ 
  .titulo-container 
  {
    margin-left: 25%;
  }
}
.input-search::placeholder 
{
  font-size: 14px;
}
.titulo-container 
{
    display: flex;
    justify-content: space-around;
}
.titulo-navbar
{
    font-size: xx-large;
    font-weight: bold;
    color: black;
    text-transform: capitalize;
}

.custom-search-btn 
{
  color: #ffffff;
  border-color: #ffffff;
}
.custom-search-btn:hover, .custom-search-btn:focus 
{
  color: #ffffff;
  border-color: #ffffff;
}
.img-logo
{
  width: 3em;
  height: 3em;
}
</style>