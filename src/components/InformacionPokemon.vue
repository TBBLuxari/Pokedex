<script setup>
import { ref,reactive } from "vue";
import axios from "axios";
import Evolucion from "./Evolucion.vue"
const props = defineProps({pokemonName:{ type:String ,required:true }});

let datos = ref({
  PokeNombre:"",
  Sprite:"",
  Tipos:[],
  Evoluciones:[],
  DescripcionTexto:"",
  Stats:[],
  Altura:"",
  Peso:"",
  Sonido:"",
  Tabla:{
    SuperDebil:[],
    Debil:[],
    Normal:[],
    Resistente:[],
    Superresistente:[],
    Inmune:[]
  },
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
  "iron-leaves",
  "nidoran-m",
  "nidoran-f"
  ];

  const exceptions2 = {
  wormadam: "wormadam-plant",
  giratina: "giratina-altered",
  shaymin: "shaymin-land",
  basculin: "basculin-red-striped",
  darmanitan: "darmanitan-standard",
  tornadus: "tornadus-incarnate",
  thundurus: "thundurus-incarnate",
  landorus: "landorus-incarnate",
  keldeo: "keldeo-ordinary",
  meloetta: "meloetta-aria",
  meowstic: "meowstic-male",
  aegislash: "aegislash-shield",
  pumpkaboo: "pumpkaboo-average",
  gourgeist: "gourgeist-average",
  oricorio: "oricorio-baile",
  lyncanroc: "lyncanroc-midday",
  wishiwashi: "wishiwashi-solo",
  minior: "minior-red-meteor",
  mimikyu: "mimikyu-disguised",
  toxtricity: "toxtricity-amped",
  eiscue: "eiscue-ice",
  indeedee: "indeedee-male",
  morpeko: "morpeko-full-belly",
  urshifu: "urshifu-single-strike",
  basculegion: "basculegion-male",
  enamorus: "enamorus-incarnate"
};

const typeRelations = 
{
  steel: 
  { 
    strong: ['steel', 'bug', 'dragon','fairy','ice','normal','grass','psychic','rock','flying'], 
    weak: ['fire', 'fighting', 'ground'], 
    immune: ['poison'] 
  },
  water: 
  { 
    strong: ['steel', 'water', 'fire', 'ice'], 
    weak: ['electric', 'grass'], 
    immune: [] 
  },
  bug: 
  { 
    strong: ['fighting','grass','ground'], 
    weak: ['fire', 'flying', 'rock'], 
    immune: [] 
  },
  dragon: 
  { 
    strong: ['water', 'electric', 'fire', 'grass'], 
    weak: ['dragon', 'fairy', 'ice'], 
    immune: [] 
  },
  electric: 
  { 
    strong: ['steel', 'electric', 'flying'], 
    weak: ['ground'], 
    immune: [] 
  },
  ghost: 
  { 
    strong: ['bug', 'poison',], 
    weak: ['ghost', 'dark'], 
    immune: ['fighting','normal'] 
  },
  fire: 
  { 
    strong: ['steel', 'bug', 'fire', 'fairy' ,'ice','grass'], 
    weak: ['water', 'rock', 'tierra'], 
    immune: [] 
  },
  fairy: 
  { 
    strong: ['bug', 'fighting','dark'], 
    weak: ['steel', 'poison'], 
    immune: ['dragon'] 
  },
  ice: 
  { 
    strong: ['ice'], 
    weak: ['steel', 'fire', 'fighting' ,'rock'], 
    immune: [] 
  },
  fighting: 
  { 
    strong: ['bug', 'rock', 'dark'], 
    weak: ['fairy', 'psychic', 'flying'], 
    immune: [] 
  },
  normal: 
  { 
    strong: [], 
    weak: ['fighting'], 
    immune: ['ghost'] 
  },
  grass: 
  { 
    strong: ['water', 'electric', 'grass', 'ground'], 
    weak: ['bug', 'fire', 'ice' ,'poison','flying'], 
    immune: [] 
  },
  psychic: 
  { 
    strong: ['fighting', 'psychic'], 
    weak: ['bug', 'ghost', 'dark'], 
    immune: [] 
  },
  rock: 
  { 
    strong: ['fire', 'normal', 'poison', 'flying'], 
    weak: ['steel', 'water', 'fighting','grass','ground'], 
    immune: [] 
  },
  dark: 
  { 
    strong: ['ghost','dark'], 
    weak: ['bicho', 'fairy', 'fighting'], 
    immune: ['psychic'] 
  },
  ground: 
  { 
    strong: ['rock','poison'], 
    weak: ['water', 'ice', 'grass'], 
    immune: ['electric'] 
  },
  poison: 
  { 
    strong: ['bug', 'fairy', 'fighting', 'grass','poison'], 
    weak: ['psychic', 'ground'], 
    immune: [] 
  },
  flying: 
  { 
    strong: ['bug', 'fighting', 'grass'], 
    weak: ['electric', 'ice', 'rock'], 
    immune: ['ground'] 
  },
};

let clases= ref({Sprite:"",})
let busquedas = -1;


const typeToClass = {
  steel: 'Acero',
  water: 'Agua',
  bug:'Bicho',
  dragon:'Dragon',
  electric:'Electrico',
  ghost:'Fantasma',
  fire:'Fuego',
  fairy:'Hada',
  ice:'Hielo',
  fighting:'Lucha',
  normal:'Normal',
  grass:'Planta',
  psychic:'Psiquico',
  rock:'Roca',
  dark:'Siniestro',
  ground:'Tierra',
  poison:'Veneno',
  flying:'Volador'
};

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

let url1 = 
`https://pokeapi.co/api/v2/pokemon/${props.pokemonName.toLocaleLowerCase()}/`; 

let url2 = 
`https://pokeapi.co/api/v2/pokemon-species/${CortarGuion(props.pokemonName.toLocaleLowerCase())}/`;

async function Awake() 
{
  try {
    const res = await axios.get(url1);
    const data = res.data;
    // Nombre
    datos.value.PokeNombre = data.name;
    // Sprite
    if (data.id < 650) 
    {
      datos.value.Sprite = data.sprites.versions['generation-v']['black-white'].animated.front_default;
      clases.value.Sprite ="Sprite";
    } 
    else
    {
      datos.value.Sprite = data.sprites.other['official-artwork'].front_default;
      clases.value.Sprite ="Sprite2";
    }
    // Tipos
    datos.value.Tipos = data.types.map(type => 
    {
      return {
        name: type.type.name,
        class: typeToClass[type.type.name] || 'defaultClass'
      };
    });



    // Stats
    datos.value.Stats = data.stats.map(stat => stat.base_stat);
    // Características
    datos.value.Altura = data.height;
    datos.value.Peso = data.weight;

    // Tabla

    // Obtenemos las relaciones de los tipos del Pokémon
    const relations1 = typeRelations[datos.value.Tipos[0].name];
    const relations2 = datos.value.Tipos[1] ? typeRelations[datos.value.Tipos[1].name] : null;

    // Inmune: los tipos a los que al menos uno de los tipos del Pokémon es inmune
    datos.value.Tabla.Inmune = relations1.immune.concat(relations2 ? relations2.immune : []);

    // Superresistente: los tipos a los que ambos tipos del Pokémon son fuertes y no están en Inmune
    datos.value.Tabla.Superresistente = relations2 ? relations1.strong.filter(tipo => 
      relations2.strong.includes(tipo) && 
      !datos.value.Tabla.Inmune.includes(tipo)
    ) : [];

    // SuperDebil: los tipos a los que ambos tipos del Pokémon son débiles y no están en Inmune ni en Superresistente
    datos.value.Tabla.SuperDebil = relations2 ? relations1.weak.filter(tipo => 
      relations2.weak.includes(tipo) && 
      !datos.value.Tabla.Inmune.includes(tipo) && 
      !datos.value.Tabla.Superresistente.includes(tipo)
    ) : [];

    // Resistente: los tipos a los que al menos uno de los tipos del Pokémon es fuerte y no están en Inmune, Superresistente, ni SuperDebil
    datos.value.Tabla.Resistente = relations1.strong.concat(relations2 ? relations2.strong : []).filter(tipo => 
      !datos.value.Tabla.Inmune.includes(tipo) &&
      !datos.value.Tabla.Superresistente.includes(tipo) &&
      !datos.value.Tabla.SuperDebil.includes(tipo)
    );

    // Debil: los tipos a los que al menos uno de los tipos del Pokémon es débil y no están en Inmune, Superresistente, Resistente ni SuperDebil
    datos.value.Tabla.Debil = relations1.weak.concat(relations2 ? relations2.weak : []).filter(tipo => 
      !datos.value.Tabla.Inmune.includes(tipo) &&
      !datos.value.Tabla.Superresistente.includes(tipo) &&
      !datos.value.Tabla.Resistente.includes(tipo) &&
      !datos.value.Tabla.SuperDebil.includes(tipo)
    );

    // Normal: los tipos que no están en ninguna otra categoría
    const allRelations = [
      ...datos.value.Tabla.SuperDebil,
      ...datos.value.Tabla.Debil,
      ...datos.value.Tabla.Resistente,
      ...datos.value.Tabla.Superresistente,
      ...datos.value.Tabla.Inmune
    ];
    datos.value.Tabla.Normal = Object.keys(typeRelations).filter(tipo => !allRelations.includes(tipo));

  } 
  catch (error) 
  {
    console.error('Error:', error);
  }

  try 
  {
    // Primera solicitud
    const res = await axios.get(url2);
    const data = res.data;
    if (data.flavor_text_entries && data.flavor_text_entries.length > 0) 
    {
      datos.value.DescripcionTexto = data.flavor_text_entries[1].flavor_text;
      //Soulsilver
    } 
    else 
    {
      datos.value.DescripcionTexto = "This pokemon does not yet have an entry in the pokedex";
    }
    //**************************************************** */
    // Segunda solicitud
    const res2 = await axios.get(data.evolution_chain.url);
    const chain = res2.data.chain;
    busquedas = 0;
    // Procesar la cadena de evolución
    let promises = [];
    processEvolutionChain(chain, [], promises);
    // Recoger los resultados de las promesas
    const sprites = await Promise.all(promises);
    datos.value.SpritesEvo = sprites;
  } 
  catch (error) 
  {
    console.error('Error:', error);
  }

}


// function processEvolutionChain(chain, evolutionPath, promises) 
// {  
//   let speciesName;
//   speciesName = chain.species.name; 

//   // Crea un nuevo objeto para la evolución
//   let evolucion = 
//   {
//     nombre: speciesName,
//     sprite: 'url_de_imagen_de_carga', 
//     condiciones: [],
//     evoluciona_a:0
//   };
//   //Traer los sprites
//   if (!datos.value.Evoluciones.some(e => e.nombre === speciesName)) 
//   {
//     datos.value.Evoluciones.push(evolucion);
//     if (busquedas == 0 && exceptions2[speciesName])
//     {
//       promises.push(getSprite(exceptions2[speciesName]).then(sprite => {
//         evolucion.sprite = sprite;
//         // Reemplaza el objeto antiguo con uno nuevo
//         datos.value.Evoluciones.splice(
//           datos.value.Evoluciones.findIndex(e => e.nombre === evolucion.nombre),
//           1,
//           {...evolucion}
//         );
//       }));
//     }
//     else
//     {
//       promises.push(getSprite(speciesName).then(sprite => {
//         evolucion.sprite = sprite;
//         // Reemplaza el objeto antiguo con uno nuevo
//         datos.value.Evoluciones.splice(
//           datos.value.Evoluciones.findIndex(e => e.nombre === evolucion.nombre),
//           1,
//           {...evolucion}
//         );
//       }));
//     }
//   }
//   //Traer datos de evolucion

//   if (chain.evolves_to.length > 0) 
//   {
//     for (let i = 0; i < chain.evolves_to.length; i++) 
//     {
//       const evolvesTo = chain.evolves_to[i];
//       const evolutionDetails = evolvesTo.evolution_details[0];

//       // Creamos un objeto para guardar todas las condiciones de evolución
//       let condicionesEvolucion = {};

//       // Para cada condición de evolución, si existe, la añadimos al objeto
//       if (evolutionDetails.trigger.name) {condicionesEvolucion.triggerName = evolutionDetails.trigger.name; }
//       if (evolutionDetails.min_level) {condicionesEvolucion.minLevel = evolutionDetails.min_level;}
//       if (evolutionDetails.item && evolutionDetails.item.name) {condicionesEvolucion.itemName = evolutionDetails.item.name;}
//       if (evolutionDetails.held_item && evolutionDetails.held_item.name) {condicionesEvolucion.heldItemName = evolutionDetails.held_item.name;}
//       if (evolutionDetails.gender) {condicionesEvolucion.gender = evolutionDetails.gender;}
//       if (evolutionDetails.known_move && evolutionDetails.known_move.name) {condicionesEvolucion.knownMove = evolutionDetails.known_move.name;}
//       if (evolutionDetails.min_beauty) {condicionesEvolucion.minBeauty = evolutionDetails.min_beauty;}
//       if (evolutionDetails.time_of_day) {condicionesEvolucion.timeOfDay = evolutionDetails.time_of_day;}
//       if (evolutionDetails.min_happiness) {condicionesEvolucion.minHappiness = evolutionDetails.min_happiness;}

//       // Añadimos el objeto a CondicinesDeEvolucion
//       evolucion.evoluciona_a +=1;
//       evolucion.condiciones.push(condicionesEvolucion);

//       processEvolutionChain(evolvesTo, evolutionPath.slice(),promises);      

//     }
//     busquedas += 1;
//   } 
//   else 
//   { 
//     evolucion.evoluciona_a += 0;
//     //console.log(`${speciesName} Forma fina de evolucion`);
//   }

// }

function processEvolutionChain(chain, evolutionPath = [], promises) 
{  
  let speciesName = chain.species.name; 

  // Crea un nuevo objeto para la evolución
  let evolucion = reactive({
    nombre: speciesName,
    sprite: 'url_de_imagen_de_carga', 
    condiciones: [],
    evoluciona_a: [],
    id:0
  });

  // Añade la evolución actual al final del camino de evolución
  evolutionPath.push(evolucion);


  //Traer los sprites
  if (!datos.value.Evoluciones.some(e => e.nombre === speciesName)) 
  {
    if (busquedas == 0 && exceptions2[speciesName])
    {
      promises.push(getSprite(exceptions2[speciesName]).then(({ spriteUrl, id }) => {
        evolucion.sprite = spriteUrl;
        evolucion.id = id;
      }));
    }
    else
    {
      promises.push(getSprite(speciesName).then(({ spriteUrl, id }) => {
        evolucion.sprite = spriteUrl;
        evolucion.id = id;
      }));
    }
  }


  //Traer datos de evolucion
  if (chain.evolves_to.length > 0) 
  {
    for (let i = 0; i < chain.evolves_to.length; i++) 
    {
      const evolvesTo = chain.evolves_to[i];
      const evolutionDetails = evolvesTo.evolution_details[0];

      // Creamos un objeto para guardar todas las condiciones de evolución
      let condicionesEvolucion = {};

      // Para cada condición de evolución, si existe, la añadimos al objeto
      if (evolutionDetails.trigger.name) {condicionesEvolucion.triggerName = evolutionDetails.trigger.name; }
      if (evolutionDetails.min_level) {condicionesEvolucion.minLevel = evolutionDetails.min_level;}
      if (evolutionDetails.item && evolutionDetails.item.name) {condicionesEvolucion.itemName = evolutionDetails.item.name;}
      if (evolutionDetails.held_item && evolutionDetails.held_item.name) {condicionesEvolucion.heldItemName = evolutionDetails.held_item.name;}
      if (evolutionDetails.gender) {condicionesEvolucion.gender = evolutionDetails.gender;}
      if (evolutionDetails.known_move && evolutionDetails.known_move.name) {condicionesEvolucion.knownMove = evolutionDetails.known_move.name;}
      if (evolutionDetails.min_beauty) {condicionesEvolucion.minBeauty = evolutionDetails.min_beauty;}
      if (evolutionDetails.time_of_day) {condicionesEvolucion.timeOfDay = evolutionDetails.time_of_day;}
      if (evolutionDetails.min_happiness) {condicionesEvolucion.minHappiness = evolutionDetails.min_happiness;}

      // Añadimos el objeto a CondicinesDeEvolucion
      evolucion.condiciones.push(condicionesEvolucion);

      processEvolutionChain(evolvesTo, evolutionPath.slice(), promises);      
    }

    busquedas += 1;
  } 

  // Si estamos en la raíz de la cadena de evolución, añade la evolución al array de Evoluciones
  if (evolutionPath.length === 1) {
    datos.value.Evoluciones.push(evolucion);
  }
  // Si no, añade la evolución al array evoluciona_a de la evolución padre
  else {
    const parentEvolution = evolutionPath[evolutionPath.length - 2];
    parentEvolution.evoluciona_a.push(evolucion);
  }
}


async function getSprite(name) 
{
  try 
  {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    let spriteUrl;
    let id = res.data.id;
    
    if (res.data.id < 650) 
    {
      spriteUrl = res.data.sprites.versions['generation-v']['black-white'].animated.front_default;
    } 
    else 
    {
      spriteUrl = res.data.sprites.other['official-artwork'].front_default;
    }
    
    //console.log(spriteUrl); // Imprimir la URL del sprite
    return {spriteUrl, id};
  } 
  catch (error) {
    console.error('Error:', error);
  }
}

async function Start()
{
  await Awake();
  //console.log(datos._rawValue.Evoluciones);
}
Start();

</script>

<template>

  <div class="Card">

    <div class="NombrePokemon">{{ CortarGuion(props.pokemonName.toLocaleLowerCase()) }}</div>

    <div class="SpritePokemon">
      <img  :class="clases.Sprite" :src="datos.Sprite">
    </div>

    <div class="Tipos">
      <div v-for="tipo in datos.Tipos" :key="tipo.name" :class="['Tipo', tipo.class]">{{ tipo.name }}</div>
    </div>

    <div class="CadenaEvolutiva">
      <Evolucion v-for="evolucion in datos.Evoluciones" :key="evolucion.Nombre" :evolucion="evolucion" />
    </div>

    <div class="Descripcion">
  
      <div class="Texto">{{ datos.DescripcionTexto }}</div>
      <div class="Stats">
          <span>PS {{ datos.Stats[0] }}</span><br>
          <span>ATK {{ datos.Stats[1] }}</span> <br>
          <span>DF {{ datos.Stats[2] }}</span><br>
          <span>ATKSP {{ datos.Stats[3] }}</span><br>
          <span>DefSP {{ datos.Stats[4] }}</span><br>
          <span>Speed {{ datos.Stats[5] }}</span>
      </div>

      <div class="Altura"> Height {{ datos.Altura/10 }}m</div>
      <div class="Peso"> Weight {{ datos.Peso /10 }}kg</div>

    </div>

    <div class="Tabla">
      <div class="SuperDebil"><span>Super Weak to:</span> {{ datos.Tabla.SuperDebil.join(',') }}</div>
      <div class="Debil"><span>Weak to:</span> {{ datos.Tabla.Debil.join(',') }}</div>
      <div class="DNormal"><span>Normal damage to:</span> {{ datos.Tabla.Normal.join(',') }}</div>
      <div class="Resistente"><span>Strong against to:</span> {{ datos.Tabla.Resistente.join(',') }}</div>
      <div class="SuperResistente"><span>Super Strong against to:</span> {{ datos.Tabla.Superresistente.join(',') }}</div>
      <div class="Inmune"><span>Inmmune to:</span> {{ datos.Tabla.Inmune.join(',') }}</div>
    </div>

  </div>
  
</template>

<style scoped>
.Card
{
  margin-top: 4vh;
  /*background-color: yellow;*/
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.NombrePokemon
{
  /*background-color: rgb(198, 244, 178);*/
  font-size: x-large;
  font-weight: 600;
  text-transform: capitalize;
}
.SpritePokemon
{
  background-color: brown;
  width: 9em;
  height: 9em;
  margin: 1em;
  border-radius: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Tipos
{
  /*background-color: chartreuse;*/
  width: 10em;
  display: flex;
  justify-content: space-around;
  text-transform: capitalize;
}
.Tipo
{
  height: 2em;
  min-width: 4em;
  display: flex;
  justify-content: center;
  align-items: center;

}
/********************************************************************************* */
.CadenaEvolutiva
{
  background-color: rgba(21, 0, 255, 0.762);
  padding: 10px;
  width:30em;
}

/********************************************************************************* */
.Descripcion
{
  background-color: chocolate;
  width: 30em;
  margin: 1em;
}
.Tabla
{
  background-color: rgb(215, 236, 26);
  width: 30em;
}
.SuperDebil{ background-color: red;}
.Debil{background-color: orange;}
.DNormal{background-color: gray;}
.Resistente{background-color: aquamarine;}
.SuperResistente{background-color: green;}
.Inmune{background-color: rgb(165, 160, 160);}
/*Clases*/
.Sprite
{
  image-rendering: pixelated;
  object-fit:contain;
  width: 4em;
}
.Sprite2
{
  width: 4em;
  width: 100%;
}
/*Tipos*/
.Acero
{
  background-color: cornflowerblue;
}
.Agua
{
  background-color: aqua;
}
.Bicho
{
  background-color: green;
}
.Dragon
{
  background-color: blue;
}
.Electrico
{
  background-color: yellow;
}
.Fantasma
{
  background-color: blueviolet;
}
.Fuego
{
  background-color: red;
}
.Hada
{
  background-color: pink;
}
.Hielo
{
  background-color: lightskyblue;
}
.Lucha
{
  background-color: orange;
}
.Normal
{
  background-color: gray;
}
.Planta
{
  background-color: darkgreen;
}
.Psiquico
{
  background-color: fuchsia;
}
.Roca
{
  background-color: lightgray;
}
.Siniestro
{
  background-color: darkgoldenrod;
}
.Tierra
{
  background-color: chocolate;
}
.Veneno
{
  background-color: violet;
}
.Volador
{
  background-color: lightblue;
}
</style>