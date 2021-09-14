<template>
  <div class="login" id="login">
    <div class="loginWrap">
      <form v-on:submit.prevent="login">
        <label for="">Nombre de usuario o e-mail</label>
        <input
          class="form-control my-3"
          type="text"
          name="email"
          id="email"
          v-model="email"
        />
        <label for="">Contraseña</label>
        <input
          class="form-control my-3"
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
        <button class="btn btn-primary" type="submit">Iniciar sesión</button>
        <br> <br>
        <router-link to="/signup"
          >¿Todavía no te registraste? Regístrate aquí</router-link
        >
        <p class="errMsg">{{ message }}</p>
      </form>
    </div>
  </div>
</template>


<script>
import Axios from "axios";

export default {
  name: "login",
  data: function () {
    return {
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    login() {
      Axios.post("/api/login", {
        email: this.email,
        password: this.password,
      }).then((response) => {
        if (response.data.error) {
          this.message = response.data.error;
        } else {
          this.message = "Logueado";
          this.$router.push("profile");
        }
      });
    }, //g118n
  },
};
</script>



<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
}
.loginWrap {
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 50px;
  background-color: rgb(241, 241, 241);
  box-shadow: 3px 3px 15px #ccc;
}
a {
  text-decoration: none;
  color: #0a30ad;
}
.errMsg{
  margin-top: 30px;
  color: red;
}
</style>

