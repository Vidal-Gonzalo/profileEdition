<template>
  <div class="signup" id="signup">
    <div class="signupWrap">
      <form v-on:submit.prevent="signup">
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
        <br>
        <input
          class="form-control-file my-3"
          type="file"
          name="picture"
          id="picture"
          @change="obtainImage"
        />
        <br>
        <div v-if = newImage>
          <figure>
            <img width="200" height="200" :src="showImage" />
          </figure>
        </div>
        <br>

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

       

        <button class="btn btn-primary" type="submit">Registrarse</button>
        <p>{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "signup",
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.signupWrap {
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 50px;
  background-color: rgb(241, 241, 241);
  box-shadow: 3px 3px 15px #ccc;
}
</style>

