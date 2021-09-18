<template>
  <particles-bg type="polygon" :bg="true" />
  <div class="signup" id="signup">
    <div class="signupWrap">
      <form v-on:submit.prevent="signup">
        <h5>¡Regístrate!</h5>
        <label for="">Nombre</label>
        <input
          class="form-control my-3"
          type="text"
          name=""
          id="firstName"
          v-model="firstName"
        />
        <label for="">Apellido</label>
        <input
          class="form-control my-3"
          type="text"
          name=""
          id="lastName"
          v-model="lastName"
        />
        <label for=""> Foto de perfil </label>
        <br />
        <input
          class="form-control-file my-3"
          type="file"
          name="picture"
          id="picture"
          @change="obtainImage"
        />
        <br />
        <div v-if="image">
          <figure>
            <img width="200" height="200" :src="showImage" />
          </figure>
        </div>
        <br />

        <label for="">Email</label>
        <input
          class="form-control my-3"
          type="text"
          name=""
          id="email"
          v-model="email"
        />
        <label for="">Contraseña</label>
        <input
          class="form-control my-3"
          type="password"
          name=""
          id="password"
          v-model="password"
        />

        <div class="buttonWrap d-flex justify-content-end">
          <button class="btn btn-primary" type="submit">Registrarse</button>
        </div>

        <p>{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { ParticlesBg } from "particles-bg-vue";

export default {
  name: "signup",
  components: {
    ParticlesBg,
  },
  data: function () {
    return {
      firstName: "",
      password: "",
      lastName: "",
      email: "",
      image: null,
      showImage: "",
      message: "",
    };
  },
  methods: {
    obtainImage(e) {
      let file = e.target.files[0];
      this.image = file;
      this.loadImage(file);
    },

    loadImage(file) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.showImage = e.target.result;
      };

      reader.readAsDataURL(file);
    },

    signup() {
      Axios.post("/api/signup/", {
        firstName: this.firstName,
        password: this.password,
        lastName: this.lastName,
        email: this.email,
        image: this.showImage,
      }).then((response) => {
        if (response.data.error) {
          alert(response.data.error)
        } else {
          this.$router.push("/profile/" + this.email)
        }
      });
    }, //g118n
  },
  computed: {
    img() {
      return this.image;
    },
  },
};
</script>



<style scoped>
.signup {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
}
.signupWrap {
  width: 400px;
  background: #4e4d4d;
  margin: auto;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 7px 13px 37px #000;
  padding: 20px 30px;
  color: #fff;
}
.signupWrap h5 {
  text-align: center;
  height: 40px;
  border-bottom: 1px solid;
  font-size: 20px;
}
.signupWrap input{
  border: 1px solid #017bab;
  margin-bottom: 15px;
  padding: 11px 10px;
  background: #252323;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}

</style>

