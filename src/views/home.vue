<template>
  <particles-bg type="polygon" :bg="true" />
  <div class="login" id="login">

    <div class="loginWrap">
      <form v-if="translations" v-on:submit.prevent="login">
        <h5>{{ translations.titles.title }}</h5>
        <label for=""> {{ translations.labels.email }} </label>
        <input
          class="form-control my-3"
          type="text"
          name="email"
          id="email"
          v-model="user.email"
          required
        />
        <label for=""> {{ translations.labels.password }} </label>
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
          <button class="btn btn-primary" type="submit"> {{ translations.buttons.login }} </button>
        </div>
        <br />
        <router-link to="/signup"> {{ translations.buttons.signup }} </router-link>
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
  props: ['g11n'],
  data: function () {
    return {
      user: {
        email: "",
        password: "",
      },
      err_msg: "",
    };
  },
  computed: {
    translations(){
      return this.g11n !== null ? this.g11n.Home : false
    }
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
            this.err_msg = this.translations.validations.error;
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
  height: 90vh;
}
.lang {
  width: 50%;
  height: 20%;
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

