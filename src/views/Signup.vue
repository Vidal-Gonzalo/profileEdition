<template>
  <particles-bg type="polygon" :bg="true" />
  <div class="signup" id="signup">
    <div class="signupWrap">
      <Form @submit="signup" :validation-schema="schema">
        <h5>¡Regístrate aquí!</h5>

        <label class="mt-3" for="username">Nombre y apellido</label>
        <Field
          id="username"
          class="form-control my-3"
          name="username"
          type="username"
        />
        <div class="err mb-3">
          <ErrorMessage class="errMsg" name="username" />
        </div>

        <label for="email">Email</label>
        <Field id="email" name="email" class="form-control my-3" type="email" />
        <ErrorMessage class="errMsg" name="email" />

        <br />
        <label for="profilePic">Foto de perfil</label>
        <br />
        <input
          class="form-control-file my-3"
          type="file"
          name="picture"
          id="picture"
          @change="obtainImage"
        />
        <div v-if="image">
          <figure>
            <img width="200" height="200" :src="showImage" />
          </figure>
        </div>
        <br />
        <label for="password">Contraseña</label>
        <Field
          id="password"
          name="password"
          class="form-control my-3"
          type="password"
        />
        <ErrorMessage class="errMsg" name="password" />

        <div class="buttonWrap mt-3 d-flex justify-content-end">
          <button class="btn btn-primary" type="submit">Registrarse</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { ParticlesBg } from "particles-bg-vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "signup",
  components: {
    ParticlesBg,
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const schema = Yup.object().shape({
      username: Yup.string().min(5).required().label("Username"),
      email: Yup.string().email().required().label("Email Address"),
      password: Yup.string().min(5).required().label("Your Password"),
    });

    return { schema };
  },

  data: function () {
    return {
      username: "",
      password: "",
      email: "",
      image: null,
      showImage: "",
      button: false,
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

    signup(values) {
      Axios.post("/api/signup/", {
        username: values.username,
        password: values.password,
        email: values.email,
        image: this.showImage,
      }).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          this.$router.push("/profile/" + values.email);
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
.signupWrap input {
  border: 1px solid #017bab;
  margin-bottom: 15px;
  padding: 11px 10px;
  background: #252323;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}
.errMsg {
  color: red;
  padding-bottom: 10px;
}
</style>

