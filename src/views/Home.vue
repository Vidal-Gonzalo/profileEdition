<template>
  <particles-bg type="polygon" :bg="true" />
  <div class="login" id="login">
    <div class="loginWrap">
      <form v-on:submit.prevent="login">
        <h5>¡Entra a nuestra plataforma!</h5>
        <label for="">Nombre de usuario o e-mail</label>
        <input
          class="form-control my-3"
          type="text"
          name="email"
          id="email"
          v-model="email"
          required
        />
        <label for="">Contraseña</label>
        <input
          class="form-control my-3"
          type="password"
          name="password"
          id="password"
          v-model="password"
          required
        />

        <p class="errMsg">{{ err_msg }}</p>
        <div class="buttonWrap d-flex justify-content-end">
          <button class="btn btn-primary" type="submit">Iniciar sesión</button>
        </div>
        <br />
        <router-link to="/signup"
          >¿Todavía no te registraste? Regístrate aquí</router-link
        >
      </form>
    </div>
  </div>
</template>


<script>
import Axios from "axios";
import { ParticlesBg } from "particles-bg-vue";

export default {
  name: "login",
  components: {
    ParticlesBg,
  },
  data: function () {
    return {
      translate: "",
      email: "",
      password: "",
      err_msg: "",
      message: "",
    };
  },
  methods: {
    login() {
      Axios.post("/api/login", {
        email: this.email,
        password: this.password,
      }).then((response) => {
        if (response.data.errMsg) {
          this.err_msg = response.data.errMsg;
        } else {
          this.$router.push("/profile/" + this.email);
        }
      });
    },
  },
};
</script>



<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.loginWrap {
  width: 400px;
  background: #4e4d4d;
  margin: auto;
  border-radius: 20px;
  box-shadow: 7px 13px 37px #000;
  padding: 20px 30px;
  color: #fff;
}

.loginWrap h5 {
  margin: 0;
  text-align: center;
  height: 40px;
  margin-bottom: 30px;
  border-bottom: 1px solid;
  font-size: 20px;
}

.loginWrap input {
  border: 1px solid #017bab;
  margin-bottom: 15px;
  padding: 11px 10px;
  background: #252323;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}

a {
  text-decoration: none;
  font-weight: bold;
  color: #7793ee;
  font-size: 14px;
}

.errMsg {
  color: rgb(235, 54, 54);
  font-weight: bold;
}
</style>

