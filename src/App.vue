<template>
  <NavbarComp />
  <div class="container">
    <router-view/>
  </div>
  
</template>

<script>
import {mapActions} from 'vuex'
import NavbarComp from './components/Navbar.vue'
export default {
  components: {
    NavbarComp
  },
  methods:{
    ...mapActions(['cargarAlStorage'])
  },
  created(){
    this.cargarAlStorage()
  }
  
}
</script>

