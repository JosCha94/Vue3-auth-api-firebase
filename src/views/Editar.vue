<template>
  Editar {{ $route.params.id }} - {{ tarea }}
  <!-- este componente recibe como props a tarea -->
  <form @submit.prevent="updateTarea(tarea)">
     <InputComp :tarea="tarea"/> 
  </form>
  
</template>

<script>

import { mapState, mapActions } from "vuex";
import InputComp from '../components/Input'
export default {
  components: {
    InputComp
  },
  computed: {
    ...mapState(["tarea"]),
  },
  methods: {
    ...mapActions(["mostrarTarea", "updateTarea"]),
  },
  created() {
    this.mostrarTarea(this.$route.params.id);
  },
};
</script>
