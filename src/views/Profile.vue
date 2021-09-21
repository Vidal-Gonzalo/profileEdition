<template>
  <particles-bg type="lines" :bg="true" />
  <nav id="nav" class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <h3>Challenge</h3>
      <button @click="logout" class="btn btn-danger">Salir</button>
    </div>
  </nav>
  <section id="profile">
    <div class="container profile">
      <div class="profileWrap">
        <div
          class="row"
          :class="{ edit: true }"
          v-for="item in user"
          :key="item.id"
        >
          <div v-if="!edit">
            <div class="img">
              <img
                v-bind:src="`${item.image}`"
                class="profileImage"
                width="200"
              />
            </div>
            <p>{{ item.username }}</p>
            <p>{{ item.email }}</p>
            <div class="buttonWrap">
              <button @click="edit = !edit" class="btn btn-primary">
                Editar
              </button>
            </div>
          </div>
          <div v-else>
            <Form @submit="signup" :validation-schema="schema">
              <h5>Edita tu perfil aquí</h5>
              <div class="row g-2">
                <div class="col-md">
                  <div class="form-floating">
                    <Field
                      id="username"
                      class="form-control"
                      name="username"
                      type="username"
                      placeholder="Nombre de usuario"
                    />
                    <label for="username">Nombre y apellido </label>
                  </div>

                  <ErrorMessage class="errMsg" name="username" />
                </div>
                <div class="col-md">
                  <div class="form-floating">
                    <Field
                      id="email"
                      name="email"
                      class="form-control"
                      type="email"
                      placeholder="E-mail"
                    />
                    <label for="email">E-mail</label>
                  </div>

                  <ErrorMessage class="errMsg" name="email" />
                </div>
              </div>
              <div class="row mt-2 mb-2">
                <div class="col-md">
                  <div class="form-floating">
                    <Field
                      id="password"
                      name="password"
                      class="form-control"
                      type="password"
                      placeholder="Contraseña"
                    />
                    <label for="password">Contraseña</label>
                  </div>

                  <ErrorMessage class="errMsg" name="password" />
                </div>
              </div>
              <input
                class="form-control-file file"
                type="file"
                name="picture"
                id="picture"
                placeholder="Foto de perfil"
                @change="obtainImage"
              />
              <div class="buttonWrap mt-3">
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
            </Form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Axios from "axios";
import { ParticlesBg } from "particles-bg-vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "profile",
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
  data() {
    return {
      user: "",
      userImage: "",
      edit: false,
      editUsername: "",
      editPassword: "",
      editEmail: "",
      showImage: "",
    };
  },
  methods: {
    logout() {
      this.$router.push("/");
    },
    editProfile(values) {
      Axios.put("/api/user/" + values.email, {
        username: values.editUsername,
        password: values.editPassword,
        newEmail: values.editEmail,
        image: this.showImage,
      }).then((response) => {
        if (!response.data.error) {
          this.logout();
        }
      });
    },
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
  },
  created() {
    this.email = this.$route.params.email;
    Axios.get("/api/user/" + this.email).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        this.user = response.data;
      }
    });
  },
  computed: {
    img() {
      return this.image;
    },
  },
};
</script>

<style scoped>
#nav {
  display: flex;
  padding: 15px;
  background-color: transparent;
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
}

.profileWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 50px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: rgb(241, 241, 241, 0.1);
  backdrop-filter: blur(19px);
  -webkit-backdrop-filter: blur(19px);
  color: #fff;
}

.profileWrap input {
  padding: 20px;
  border: 1px solid #017bab;
  background: #252323;
  font-weight: bold;
  color: #fff;
}

.img {
  display: flex;
  justify-content: center;
  align-items: center;
}

.file{
  width: 100%;
}

.profileImage {
  width: 150px;
  border-radius: 80%;
}

.profileWrap h3,
.profileWrap p {
  font-family: Arial, Helvetica, sans-serif;
}

.profileWrap p {
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  margin-top: 15px;
}

.buttonWrap {
  display: flex;
  justify-content: flex-end;
}

.errMsg {
  color: red;
  font-size: 12px;
}
</style>