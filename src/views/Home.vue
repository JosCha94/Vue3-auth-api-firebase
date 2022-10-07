<template>
<h2 class="text-center my-2">Formulario con Vue.js</h2>
  <form @submit.prevent="procesarform">
    <!-- Los props sirven para enviar info -->
    <InputComp :tarea="tarea"/>
  </form>
  <hr>
  <p>{{ tarea }}</p>
  <hr>
  <h2 class="text-center my-2">Lista de tareas</h2>
  <ListaComp />
</template>


<script>
import InputComp from '../components/Input.vue'
import {mapActions} from 'vuex'
const shortid = require('shortid');
import ListaComp from '../components/ListaTareas.vue'

export default {
  name: "Home",
  components: {
    InputComp,
    ListaComp

  },
  data() {
    return {
      tarea: {
        id:"",
        nombre: "",
        categorias: [],
        nivel: "",
        numero: 0,
      },
    };
  },
  methods: {
    ...mapActions(['setTareas','cargarAlStorage']),
    procesarform() {
      console.log(this.tarea);
      if (this.tarea.nombre.trim() === "") {
        alert("No se ingreso nombre");
        return;
      }
      alert("campos no vacios");
      // generar id
      this.tarea.id = shortid.generate()
      console.log(this.tarea.id)

      // enviar data
      this.setTareas(this.tarea)
      // para limpiar los campos despues de enviar el formulario
      this.tarea = {
        id:"",
        nombre: "",
        categorias: [],
        nivel: "",
        numero: 0,
      };
    },
  },
  created(){
    this.cargarAlStorage()
  }
  
};
</script>
