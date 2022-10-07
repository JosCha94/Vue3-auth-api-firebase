<template>
  <h1 class="my-2">Ingreso de usuarios</h1>
  <form @submit.prevent="procesarFormulario">
    <div class="form-group">
      <label for="email">Email address:</label>
      <input type="email" class="form-control my-2" id="email" placeholder="E-mail" v-model.trim="email" />
      <!-- v-model.trim QUITA LOS ESPACIOS EN BLANCO AL INICIO Y AL FINAL DE LA CADENA -->
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control my-2" id="pwd" placeholder="Password"  v-model.trim="password"/>
    </div>


    <button type="submit" class="btn btn-primary my-2" :disabled="bloquear">Login</button>
    <!-- DISABLED DESABILITA EL BOTON PARA Q NO SE PUEDA HACER CLIC -->
  </form>
</template>


<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            email: '',
            password: '',


        }
    },
    computed:{
        bloquear(){
            // VALIDA SI EL EMAIL TIENE UN @
            if (!this.email.includes('@')){
                return true
            }
            // VALIDA SI LA CONTRASEÑA TIENE MAS DE 6 CARACTERES Y VALIDA SI LAS CONTRASEÑAS SON IGUALES
            if (this.password.length > 6){
                return false
            } 
           return true            
            
        }
    },
    methods:{
        ...mapActions(['loginUser']),
        // REGISTRA Y LIMPIA LOS CAMPOS
        procesarFormulario(){
            this.loginUser({email: this.email,password: this.password})
            this.email='';
            this.password='';

        }
    }
};
</script>

