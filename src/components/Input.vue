<template>
  <!-- Cuando se utiliza objetos hay q especificar el objeto y su propiedad -->
  <!-- trim sirve para q el v-model no considere espacios en blanco -->
  <h4>Nombre de la tarea</h4>
  <input
    type="text"
    class="form-control my-2" 
    placeholder="Nombre de tarea a traves de objeto"
    v-model.trim="tarea.nombre"
  />
  <hr />
  <!-- checkboxes -->
  <h4>Lenguaje de la tarea</h4>
  <div class="form-check form-check-inline my-2">
    <input
      class="form-check-input"
      type="checkbox"
      id="chk1"
      value="JavaScript"
      v-model="tarea.categorias"
    />
    <label class="form-check-label" for="chk1">JavaScript</label>
  </div>
  <div class="form-check form-check-inline my-2">
    <input
      class="form-check-input"
      type="checkbox"
      id="chk2"
      value="NodeJS"
      v-model="tarea.categorias"
    />
    <label class="form-check-label" for="chk2">NodeJS</label>
  </div>
  <div class="form-check form-check-inline my-2">
    <input
      class="form-check-input"
      type="checkbox"
      id="chk3"
      value="PHP"
      v-model="tarea.categorias"
    />
    <label class="form-check-label" for="chk3">PHP</label>
  </div>
  <hr />
  <h4>Dificultad de la tarea</h4>
  <!-- RadioButtons -->
  <div class="form-check form-check-inline my-2">
    <input
      class="form-check-input"
      type="radio"
      v-model="tarea.nivel"
      id="radio1"
      value="FACIL"
    />
    <label class="form-check-label" for="radio1">FACIL</label>
  </div>
  <div class="form-check form-check-inline my-2">
    <input
      class="form-check-input"
      type="radio"
      v-model="tarea.nivel"
      id="radio2"
      value="MODERADO"
    />
    <label class="form-check-label" for="radio2">MODERADO</label>
  </div>
  <div class="form-check form-check-inline my-2">
    <input
      class="form-check-input"
      type="radio"
      v-model="tarea.nivel"
      id="radio3"
      value="DIFICIL"
    />
    <label class="form-check-label" for="radio3">DIFICIL</label>
  </div>
  <hr />
  <h4>Nota de la tarea</h4>
  <!-- si no se agrega el siguiente parametro al v-model, este tomara al v-model como un string -->
  <input
    type="number"
    class="form-control my-2"
    placeholder="Numero"
    v-model.number="tarea.numero"
  />
  <hr />
  <!-- los 2 puntos hacen dinamico a disabled -->
  <div class="d-grid gap-2 my-2">
    <button class="btn btn-dark" type="submit" :disabled="bloquear">
      Procesar
    </button>
  </div>
</template>

<script>
export default {
  // Para recibir el prop q se envio desde el componente padre
  props: {
    tarea: Object,
  },
  computed: {
    bloquear() {
      return this.tarea.nombre.trim() === "" ? true : false;
    },
  },
};
</script>