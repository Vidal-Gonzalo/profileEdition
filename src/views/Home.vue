<template>
  <particles-bg type="polygon" :bg="true" />
  <div class="login" id="login">
    <div class="loginWrap">
      <div class="wrapLang mb-3">
        <select class="lang" name="language" @change="onChange($event)" v-model="language">
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </div>

      <form v-on:submit.prevent="login">
        <h5>{{ translate.Home.title }}</h5>
        <label for=""> {{ translate.Home.emailLabel }} </label>
        <input
          class="form-control my-3"
          type="text"
          name="email"
          id="email"
          v-model="user.email"
          required
        />
        <label for="">{{ translate.Home.passwordLabel }}</label>
        <input
          class="form-control my-3"
          type="password"
          name="password"
          id="password"
          v-model="user.password"
          required
        />

        <p class="errMsg">{{ err_msg }}</p>
        <div class="buttonWrap d-flex justify-content-end">
          <button class="btn btn-primary" type="submit">
            {{ translate.Home.login }}
          </button>
        </div>
        <br />
        <router-link to="/signup">{{ translate.Home.signup }}</router-link>
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
      user: {
        email: "",
        password: "",
      },
      language: "es",
      translate: "",
      err_msg: "",
      message: "",
    };
  },
  methods: {
    login() {
      Axios.post("/api/login", {
        email: this.user.email,
        password: this.user.password,
      })
        .then(() => {
          this.$router.push("/profile/" + this.user.email);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.err_msg = "E-mail y/o contraseña incorrectos";
          }
        });
    },
    onChange(event) {
      this.language = event.target.value;
      switch (this.language) {
        case "en":
          fetch("assets/en_US.json")
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.translate = data;
            });
          break;
        default:
          fetch("assets/es_AR.json")
            .then(function (response) {
              return response.json();
            })
            .then((data) => {
              this.translate = data;
            });
      }
    },
  },
  created() {
    fetch("assets/es_AR.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.translate = data;
      });
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
.lang{
  border: 1px solid #017bab;
  background: #252323;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
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

