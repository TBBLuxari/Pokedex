<script setup>

const props = defineProps({evolucion: { type: Object, required: true }});

function isEevee()
{
    if(props.evolucion.nombre =="eevee")
    {
        return true;
    }
    {
        return false;
    }
}

function determinarClase(id)
{
    if(id<650)
    {
        return 'Sprite'
    }else
    {
        return 'Sprite-2'
    }
}


</script>


<template>
    <div :class="'Contenedor-Evoluciones'+'-'+isEevee()">

        <div class="Nombre-Sprite-Condiciones">

            <div class="Nombre-Sprite">
                <div class="Nombre">{{ evolucion.nombre }}</div>
                <img  :class="determinarClase(evolucion.id)" :src="evolucion.sprite">
            </div>

        <div class="ContenedorCondiciones">
                <div v-for="(condicion, index) in evolucion.condiciones" :key="index" class="CondicionEvolucion">
                    <div v-for="(valor, clave) in condicion" :key="clave" class="Condicion">
                        {{ valor }} 
                        <!-- {{ Object.values(condicion).join(' ') }} -->
                    </div>
                </div>
            </div> 
        </div>

        
        <div>
            <div v-for="(proximaEvolucion, index) in evolucion.evoluciona_a" :key="index" >
                <Evolucion :evolucion="proximaEvolucion"  />
            </div>
        </div>

    </div>
</template>
  
<style scoped>

.Contenedor-Evoluciones-true 
{
    /*background-color: black;*/
    width: 100%;
    height: auto; /*eevee*/ 

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:center;
    align-items: center; 
}
.Contenedor-Evoluciones-false
{
    /*background-color: black;*/
    width: 100%;
    height: 100%; /*wurmple*/ 

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:center;
    align-items: center;
}

.Nombre-Sprite-Condiciones
{
    /*background-color: wheat;*/
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.Nombre-Sprite
{
    margin-top: 1em;
    margin-bottom: 1em;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.Nombre
{
    background-color: rgb(231, 15, 15);
    color: white;
    /*width: 100%;*/
    text-transform: capitalize;
    font-size: medium;
    text-align: center;
    font-weight: 600; 
}
.Sprite
{
    background-color: white;
    image-rendering: pixelated;
    object-fit:contain;
    width: 80px;
    height: 80px;
}
.Sprite-2
{
    background-color: white;
    object-fit:contain;
    height: 80px;
    width: 80px;
}
.ContenedorCondiciones
{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.CondicionEvolucion
{
    border: rgb(222, 94, 25) dashed;
    border-width: 2px;
    margin: 0.3em;    
}
.Condicion
{
    font-size: small;
    text-align: center;
}


</style>