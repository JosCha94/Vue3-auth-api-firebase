<template>
  {{ tareas }}
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">NOMBRE</th>
        <th scope="col">LENGUAJE</th>
        <th scope="col">DIFICULTAD</th>
        <th scope="col">NOTA</th>
        <th scope="col">ACCION</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tareas" :key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.nombre }}</td>
        <td>
          <!-- array join para unir con comas -->
          {{ item.categorias.join(', ')}}
          <!-- Si no se usa el metodo anterior en necesario hacer otro for dentro del for actual para separar con comas las categorias -->
            <!-- <span v-for="(cate, index) in item.categorias" :key="index">
              {{ item.categorias.length === index + 1 ? cate : cate + ', ' }}
            </span> -->
        </td>
        <td>{{ item.nivel }}</td>
        <td>{{ item.numero }}</td>
        <td>
          <button class="btn btn-danger btn-sm" @click="borrarTarea(item.id)">Eliminar</button>
        <router-link 
        class="btn btn-warning btn-sm ms-2" 
        :to="{
          name: 'Editar',
          params: {
            id: item.id
          }
        }"
        >Editar</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["tareas"]),
  },
  methods: {
    ...mapActions(["borrarTarea"]),
  },
};
</script>

