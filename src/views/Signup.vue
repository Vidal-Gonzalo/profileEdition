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
          id="newFirstName"
          v-model="newFirstName"
        />
        <label for="">Apellido</label>
        <input
          class="form-control my-3"
          type="text"
          name=""
          id="newLastName"
          v-model="newLastName"
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
        <div v-if="newImage">
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
          id="newEmail"
          v-model="newEmail"
        />
        <label for="">Contraseña</label>
        <input
          class="form-control my-3"
          type="password"
          name=""
          id="newPassword"
          v-model="newPassword"
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
      newFirstName: "",
      newPassword: "",
      newLastName: "",
      newEmail: "",
      newImage: null,
      showImage: "",
      message: "",
    };
  },
  methods: {
    obtainImage(e) {
      let file = e.target.files[0];
      this.newImage = file;
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
      Axios.post("/api/signup", {
        newFirstName: this.newFirstName,
        newPassword: this.newPassword,
        newLastName: this.newLastName,
        newEmail: this.newEmail,
        newImage: this.showImage,
      }).then((response) => {
        if (response.data.error) {
          this.message = response.data.error;
        } else {
          this.$router.push("profile");
        }
      });
    }, //g118n
  },
  computed: {
    img() {
      return this.newImage;
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

