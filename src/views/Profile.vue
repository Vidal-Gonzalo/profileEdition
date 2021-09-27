<template>
  <particles-bg type="lines" :bg="true" :canvas="canvasStyle" />
  <nav id="nav" class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <h3>Challenge</h3>

      <button @click="logout" class="btn btn-danger">
        {{ lang.translate.buttons.logout }}
      </button>
    </div>
  </nav>
  <section id="profile">
    <div class="container profile">
      <div v-if="loading" class="loading">{{ lang.translate.loading }}</div>

      <div v-if="error" class="error">{{ error }}</div>

      <div v-if="profile" class="profileWrap">
        <div class="wrapLang mb-3">
          <select class="lang" name="language" @change="onChange($event)">
            <option
              v-for="option in lang.available"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
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
                {{ lang.translate.buttons.edit }}
              </button>
            </div>
          </div>
          <div v-else>
            <Form @submit="editProfile" :validation-schema="schema">
              <h5>{{ lang.translate.titles.title }}</h5>
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
                    <label for="username">
                      {{ lang.translate.labels.username }}
                    </label>
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
                    <label for="email">{{ lang.translate.labels.email }}</label>
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
                      required
                    />
                    <label for="password">{{
                      lang.translate.labels.password
                    }}</label>
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
                  {{ lang.translate.buttons.cancel }}
                </button>
                <button type="submit" class="btn btn-primary">
                  {{ lang.translate.buttons.confirm }}
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
      loading: false,
      error: null,
      profile: null,
      lang: {
        applied: null,
        selected: "English",
        available: ["English", "Español"],
        translate: "",
      },
      user: "",
      userImage: "",
      edit: false,
      userEdit: {
        showImage: "",
      },
      canvasStyle: {
        height: "calc(100vh + 50px);",
      },
    };
  },
  methods: {
    onChange(event) {
      this.lang.selected = event.target.value;
      Axios.get("assets/" + this.lang.selected + ".json").then((response) => {
        this.lang.translate = response.data.Profile;
      });
    },
    logout() {
      Axios.post("/api/logout").then((response) => {
        if (!response.data.error) {
          this.$router.push("/");
        }
      });
    },
    editProfile(values) {
      Axios.put("/api/user/" + values.email, {
        username: values.username,
        password: values.password,
        newEmail: values.email,
        oldEmail: this.email,
        image: this.userEdit.showImage,
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
        this.userEdit.showImage = e.target.result;
      };

      reader.readAsDataURL(file);
    },
  },
  created() {
    this.loading = true;

    //Get user info
    this.email = this.$route.params.email;
    Axios.get("/api/user/" + this.email).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        this.user = response.data;
      }
    });
    //Get translations
    if (!this.lang.applied) {
      Axios.get("assets/" + this.lang.selected + ".json")
        .then((response) => {
          this.lang.translate = response.data.Profile;
          this.lang.applied = this.lang.selected;
          this.loading = false;
        })
        .then(() => {
          this.profile = true;
        })
        .catch((err) => {
          this.error = err.toString();
        });
    }
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
  margin-left: 10px;
  font-size: 13px;
  text-align: center;
}

.wrapLang {
  display: flex;
  justify-content: start;
}

.lang {
  height: 20%;
  border: 1px solid #017bab;
  background: #252323;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
}

.profile {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profileWrap {
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
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file {
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