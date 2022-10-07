<template>
  <h1 class="my-2">Registro de usuarios</h1>
  <form @submit.prevent="procesarRegistro">
    <div class="form-group">
      <label for="email">Email address:</label>
      <input type="email" class="form-control my-2" id="email" placeholder="E-mail" v-model.trim="email" />
      <!-- v-model.trim QUITA LOS ESPACIOS EN BLANCO AL INICIO Y AL FINAL DE LA CADENA -->
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control my-2" id="pwd" placeholder="Password"  v-model.trim="password"/>
    </div>
    <div class="form-group">
      <label for="pwd-r">Password:</label>
      <input type="password" class="form-control my-2" id="pwd-r" placeholder="Repeat password"  v-model.trim="passwordRepeat"/>
    </div>

    <button type="submit" class="btn btn-primary my-2" :disabled="bloquear">Registrar</button>
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
            passwordRepeat: ''

        }
    },
    computed:{
        bloquear(){
            // VALIDA SI EL EMAIL TIENE UN @
            if (!this.email.includes('@')){
                return true
            }
            // VALIDA SI LA CONTRASEÑA TIENE MAS DE 6 CARACTERES Y VALIDA SI LAS CONTRASEÑAS SON IGUALES
            if (this.password.length > 6 && this.password === this.passwordRepeat){
                return false
            } 
           return true            
            
        }
    },
    methods:{
        ...mapActions(['registroUser']),
        // REGISTRA Y LIMPIA LOS CAMPOS
        procesarRegistro(){
            this.registroUser({email: this.email,password: this.password})
            this.email='';
            this.password='';
            this.passwordRepeat='';
        }
    }
};
</script>

