<template>
  <particles-bg type="polygon" :bg="true" />
  <div class="signup" id="signup">
    <div v-if="translations" class="signupWrap">
      <Form @submit="signup" :validation-schema="schema">
        <h5>{{translations.titles.title}}</h5>
        <div class="row g-2 mt-2">
          <div class="col-md">
            <div class="form-floating">
              <Field
                id="username"
                class="form-control"
                name="username"
                type="username"
                placeholder="Nombre de usuario"
              />
              <label for="username">{{translations.labels.username}}</label>
              <ErrorMessage class="errMsg" as="p" name="username">
                {{translations.validations.username}}
              </ErrorMessage>
            </div>
          </div>
          <div class="col-md">
            <div class="form-floating">
              <Field
                id="email"
                name="email"
                class="form-control"
                type="email"
                placeholder="email"
                label="error"
                :rules="validateEmail"
              />
              <label for="email">{{translations.labels.email}}</label>
              <ErrorMessage class="errMsg" as="p" name="email">
                {{translations.validations.email}}
              </ErrorMessage>
            </div>
          </div>
        </div>
        <div class="row g-2">
          <div class="col-md">
            <label for="profilePic">{{translations.labels.profilePic}}</label>
            <div class="form-floating">
              <input
                class="form-control-file my-3"
                type="file"
                name="picture"
                id="picture"
                @change="obtainImage"
              />
            </div>
          </div>
          <div class="col-md text-center">
            <div v-if="image">
              <figure>
                <img width="100" height="100" :src="user.showImage" />
              </figure>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md">
            <div class="form-floating">
              <Field
                id="password"
                name="password"
                class="form-control"
                type="password"
                placeholder="password"
              />

              <label for="password">{{translations.labels.password}}</label>
              <ErrorMessage class="errMsg" as="p" name="password">
                {{translations.validations.password}}
              </ErrorMessage>
            </div>
          </div>
        </div>

        <div class="buttonWrap mt-3 d-flex justify-content-end">
          <button class="btn btn-primary" type="submit">{{translations.buttons.register}}</button>
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
  props: ['g11n'],
  setup() { 
    const schema = Yup.object().shape({
      username: Yup.string().min(5).required().label(),
      email: Yup.string().email().required().label("Email Address"),
      password: Yup.string().min(5).required().label("Your Password"),
    });
    return { schema };
  },

  data: function () {
    return {
      user: {
        image: null,
        showImage: "",
      },
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
        this.user.showImage = e.target.result;
      };

      reader.readAsDataURL(file);
    },

    signup(values) {
      Axios.post("/api/signup/", {
        username: values.username,
        password: values.password,
        email: values.email,
        image: this.user.showImage,
      }).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          this.$router.push("/profile/" + values.email);
        }
      });
    },
  },
  computed: {
    translations(){
      return this.g11n !== null ? this.g11n.Signup : false
    },
    img() {
      return this.user.image;
    },
  },
};
</script>



<style scoped>
.signup {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
}
.signupWrap {
  background: #4e4d4d;
  margin: auto;
  margin-top: 30px;
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

