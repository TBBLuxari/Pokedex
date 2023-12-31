<script setup>
const props = defineProps({
  evolucion: { type: Object, required: true },
});

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
    <div class="Contenedor-Evoluciones">

        <div class="Nombre-Sprite-Condiciones">

            <div class="Nombre-Sprite">
                <div class="Nombre">{{ evolucion.nombre }}</div>
                <img  :class="determinarClase(evolucion.id)" :src="evolucion.sprite">
            </div>

            <div class="ContenedorCondiciones">
                <div v-for="(condicion, index) in evolucion.condiciones" :key="index">
                    <div v-for="(valor, clave) in condicion" :key="clave">
                        {{ clave }}: {{ valor }} 
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

.Contenedor-Evoluciones
{
    background-color: brown;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}
.Nombre-Sprite-Condiciones
{
    background-color: darkmagenta;
    border: white dashed;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
}
.Nombre-Sprite
{
    background-color: darkgoldenrod;
    display: flex;   
    flex-direction: column;
    align-items: center;
}
.Nombre
{
    background-color:yellow;
}
.Sprite
{
    background-color: yellowgreen;
    image-rendering: pixelated;
    object-fit:contain;
    width: 100%;
}
.Sprite-2
{
    background-color: yellowgreen;
    object-fit:contain;
    width: 35%;
}
.ContenedorCondiciones
{
   background-color: darksalmon;
}

</style>