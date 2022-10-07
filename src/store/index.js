import { createStore } from "vuex";
import router from "../router";

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: "",
      nombre: "",
      categorias: [],
      nivel: "",
      numero: 0,
    },
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    cargar(state, payload) {
      state.tareas = payload;
    },
    set(state, payload) {
      state.tareas.push(payload);
      // console.log(state.tareas)
      // la sgt linea es para cargarlo al estorage
      // localStorage.setItem("tareas", JSON.stringify(state.tareas));
    },
    // filter es una funcion de JS para filtrar
    borrar(state, payload) {
      state.tareas = state.tareas.filter((item) => item.id !== payload);
      localStorage.setItem("tareas", JSON.stringify(state.tareas));
    },
    // find es una funcion de JS para buscar
    mostrar(state, payload) {
      if (!state.tareas.find((item) => item.id === payload)) {
        router.push("/");
        return;
      }
      state.tarea = state.tareas.find((item) => item.id === payload);
    },
    // map es una funcion de JS q debuelve un array segun la condicion q se indique
    update(state, payload) {
      state.tareas = state.tareas.map((item) =>
        item.id === payload.id ? payload : item
      );
      router.push("/");
      localStorage.setItem("tareas", JSON.stringify(state.tareas));
    },
  },
  actions: {
    async loginUser({ commit }, usuario) {
      try {
        const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4-ZI526wZyJFn4nQDvbL9znaMqBCgMfk",
          {
            method: "POST",
            body: JSON.stringify({
              email: usuario.email,
              password: usuario.password,
              returnSecureToken: true,
            }),
          })
          const userDB = await res.json() 
          console.log('userDB',userDB)  
          if (userDB.error) {
            console.log(userDB.error);
          } 
          commit("setUser", userDB);   
          router.push("/"); 
      } catch (error) {
        console.log(error);
      }
    },
    async registroUser({ commit }, usuario) {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4-ZI526wZyJFn4nQDvbL9znaMqBCgMfk",
          {
            method: "POST",
            body: JSON.stringify({
              email: usuario.email,
              password: usuario.password,
              returnSecureToken: true,
            }),
          })
          const userDB = await res.json() 
          console.log(userDB)  
          if (userDB.error) {
            console.log(userDB.error);
          } 
          commit("setUser", userDB);    
          router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async cargarAlStorage({ commit, state }) {
      try {
        const resp = await fetch(
          `https://vue-api-94e08-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=$${state.user.idToken}`
        );
        const db = await resp.json();
        const arrayDatos = [];
        for (let id in db) {
          arrayDatos.push(db[id]);
        }
        console.log(arrayDatos);
        commit("cargar", arrayDatos);
      } catch (error) {
        console.log(error);
      }
    },
    // Siempres q se usa async y await se debe utilizar try catch
    async setTareas({ commit, state }, tarea) {
      try {
        // toda la peticion a la api se guarda en res

        const res = await fetch(
          // Las comillas invertidas permiten incorporar una variable dentro de una cadena de texto
          // CUANDO PONEMOS TAREA.ID ESTAMOS SELECCIONANDO EL CAMPO ID DEL PARAMETRO TAREA Q PASAMOS
          `https://vue-api-94e08-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=$${state.user.idToken}`,
          {
            method: "PUT",
            // en la cabecera: Se expecifica q los datos q van a viajar son en JSON
            headers: {
              "Content-Type": "application/json",
            },
            // las tareas q pasamos van en body
            body: JSON.stringify(tarea),
          }
        );
        // la respuesta se almacena en DAtaDB
        const dataDB = await res.json();
        console.log(dataDB);
        commit("set", tarea);
      } catch (error) {
        console.log(error);
      }
    },
    async borrarTarea({ commit, state }, id) {
      try {
        const respt = await fetch(
          `https://vue-api-94e08-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=$${state.user.idToken}`,
          {
            method: "DELETE",
            // EN EL DELETE NO SE NECESITA ENVIAR EL BODY
          }
        );
        commit("borrar", id);
      } catch (error) {
        console.log(error);
      }
    },
    mostrarTarea({ commit }, tareaid) {
      commit("mostrar", tareaid);
    },
    async updateTarea({ commit, state }, tarea) {
      try {
        const respt = await fetch(
          `https://vue-api-94e08-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=$${state.user.idToken}`,
          {
            method: "PATCH",
            body: JSON.stringify(tarea),
          }
        );
        // const dataDB = await respt.json()
        // console.log(dataDB)
        commit("update", tarea);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
