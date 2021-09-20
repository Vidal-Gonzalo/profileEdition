<template>
  <nav id="nav" class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <h3>Challenge</h3>
      <button @click="logout" class="btn btn-danger">Salir</button>
    </div>
  </nav>
  <section id="profile">
    <div class="container profile">
      <div class="profileWrap">
        <div class="row" v-for="item in user" :key="item.id">
          <div class="col-12">
            <div v-if="!edit">
              <h3>Nombre y apellido:</h3>
              <p>{{ item.firstName }} {{ item.lastName }}</p>
              <h3>E-mail:</h3>
              <p>{{ item.email }}</p>
              <div class="buttonWrap">
                <button @click="edit = !edit" class="btn btn-primary">
                  Editar
                </button>
              </div>
            </div>
            <div v-else>
              <form v-on:submit.prevent="editProfile">
                <label>Nombre</label>
                <input
                  class="form-control my-3"
                  type="text"
                  name="name"
                  id="editName"
                  v-model="editName"
                  
                />
                <label>Apellido</label>
                <input
                  class="form-control my-3"
                  type="text"
                  name="lastName"
                  id="editLastName"
                  v-model="editLastName"
                />
                <label>Contraseña</label>
                <input
                  class="form-control my-3"
                  type="password"
                  name="password"
                  id="editPassword"
                  v-model="editPassword"
                />
                <label>E-mail</label>
                <input
                  class="form-control my-3"
                  type="text"
                  name="email"
                  id="editEmail"
                  v-model="editEmail"
                />
                <div class="buttonWrap">
                  <button
                    type="button"
                    @click="edit = !edit"
                    class="btn btn-danger me-3"
                  >
                    Cancelar
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Confirmar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Axios from "axios";

export default {
  name: "profile",
  data() {
    return {
      user: "",
      userImage: "",
      edit: false,
      editName: "",
      editLastName: "",
      editPassword: "",
      editEmail: ""
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem("is-authenticated");
      this.$router.push("/");
    },
    editProfile(){
      Axios.put("/api/user/" + this.email, {
        firstName: this.editName,
        lastName: this.editLastName,
        password: this.editPassword,
        newEmail: this.editEmail
      }).then((response) => {
        if(response.data.error){
          alert(response.data.error)
        }
      })
    }
  },
  mounted(){
    this.email = this.$route.params.email;
    Axios.get("/api/user/" + this.email).then((response) => {
      if(response.data.error){
        alert(response.data.error)
      }else{
        this.user = response.data
      }
    })
  }
};
</script>

<style scoped>
#nav {
  display: flex;
  padding: 15px;
  background-color: #3b7dfa;
}

#nav h3 {
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

#nav button {
  width: 60px;
  height: 40px;
  text-align: center;
}

.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.profileWrap {
  width: 50%;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 50px;
  background-color: rgb(241, 241, 241);
  box-shadow: 3px 3px 15px #ccc;
}

.profileWrap h3,
.profileWrap p {
  font-family: Arial, Helvetica, sans-serif;
}

.buttonWrap {
  display: flex;
  justify-content: flex-end;
}
</style>