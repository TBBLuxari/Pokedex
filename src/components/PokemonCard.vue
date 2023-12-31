<script setup>

const props = defineProps({
  sprite: String,
  index: Number,
  determinarClase: Function,
  ponerNombre: Function,
  ponerNombre2: Function,
  Busqueda: Function
})
</script>
  
<template>
  <div class="card">
    <div class="PokebolaBG" @click="Busqueda(ponerNombre(index+1))"></div>
    <div class="center">
      <span class="numeroPokemon">Nº{{ index+1 }}</span>
      <img :src="sprite" :class="determinarClase(index+1)">
      <h3 :class="ponerNombre2(index+1)">{{ponerNombre(index+1)}}</h3>
    </div>
  </div>
</template>


<style scoped>
 @keyframes girar 
{
  from {rotate: 0deg;}
  to {rotate: 360deg;}
}

.card
{
  display: flex;

  width: 12em;
  height: 12em;
  
  align-items: center; 
  justify-content: space-around;
  border: none;

  border-radius: 10em; 
  margin: 1em 0.5em 1em 0.5em;
  transition: opacity 0.7s; 
 
}
.PokebolaBG
{
  background-color: green;
  width: 12em;
  height: 12em;
  position: absolute;

  background-image: url('../assets/PokeBola.svg');
  background-size: 12em;
  background-position: center;

  border-radius: 10em; 

  z-index: 0;
}
.PokebolaBG:hover
{
  background-blend-mode:soft-light;
  background-color:rgba(0, 0, 0, 0.3);
  animation: girar 0.4s 1 ease-in-out; 
}
.center
{
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 66.6%;
  height: 58.3%; 
  z-index: 1;
  pointer-events: none;
}
.numeroPokemon
{
  font-family: 'Roboto', sans-serif;
  font-size:small;
  font-weight:700;

  margin: -2em 0em 0em 0em;

  color: rgb(255, 255, 255);
}
.sprite
{
  width: 100%;
  height: 100%;
  margin: 0em 0em -1em 0em;
  image-rendering: pixelated;
  object-fit: contain;
}
.sprite-2
{
  width: 100%;
  height: 100%;
  margin: 0em 0em -1em 0em;
  object-fit: contain;
}
.nombrePokemon
{
  font-family: 'Roboto', sans-serif;
  font-size:1em;
  position:absolute;
  margin-top: 7.1em;
  font-weight: 600;
}
.nombrePokemon-2
{
  font-family: 'Roboto', sans-serif;
  font-size:0.7em;
  position:absolute;
  margin-top: 10em;
  font-weight: 600;
}
</style>