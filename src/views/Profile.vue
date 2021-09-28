<template>
  <particles-bg type="lines" :bg="true" :canvas="canvasStyle" />
  <div v-if="translations">
    <nav id="nav" class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <h3>Vue Challenge</h3>
        <button @click="logout" class="btn btn-danger">
          {{ translations.buttons.logout }}
        </button>
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
                  v-bind:src="item.image"
                  class="profileImage"
                  width="200"
                />
              </div>
              <p class="userInfo">{{ item.username }}</p>
              <p class="userInfo">{{ item.email }}</p>
              <div class="buttonWrap">
                <button @click="edit = !edit" class="btn btn-primary">
                  {{ translations.buttons.edit }}
                </button>
              </div>
            </div>
            <div v-else>
              <Form @submit="editProfile" :validation-schema="schema">
                <h5>{{ translations.titles.title }}</h5>
                <div class="row g-2">
                  <div class="col-md">
                    <div class="form-floating">
                      <Field
                        id="username"
                        class="form-control"
                        name="username"
                        type="username"
                        placeholder=this.translations.labels.username
                      />
                      <label for="username">
                        {{ translations.labels.username }}
                      </label>
                      <ErrorMessage class="errMsg" as="p" name="username">
                        {{ translations.validations.username }}
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
                        placeholder=this.translations.labels.username
                      />
                      <label for="email">{{ translations.labels.email }}</label>
                      <ErrorMessage class="errMsg" as="p" name="email">
                        {{ translations.validations.email }}
                      </ErrorMessage>
                    </div>
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
                        placeholder=this.translations.labels.username
                        required
                      />
                      <label for="password">{{
                        translations.labels.password
                      }}</label>

                      <ErrorMessage class="errMsg" as="p" name="password">
                        {{ translations.validations.password }}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>
                <input
                  class="form-control-file file"
                  type="file"
                  name="picture"
                  id="picture"
                  @change="obtainImage"
                />

                <div class="buttonWrap mt-3">
                  <button
                    type="button"
                    @click="edit = !edit"
                    class="btn btn-danger me-3"
                  >
                    {{ translations.buttons.cancel }}
                  </button>
                  <button type="submit" class="btn btn-primary">
                    {{ translations.buttons.confirm }}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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
  props: ["g11n"],
  setup() {
    const schema = Yup.object().shape({
      username: Yup.string().min(5).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(5).required(),
    });

    return { schema };
  },
  data() {
    return {
      user: "",
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
    //Get user info
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
    translations() {
      return this.g11n !== null ? this.g11n.Profile : false;
    },
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
  text-align: center;
  margin-top: 15px;
}

.userInfo {
  font-size: 20px;
}

.buttonWrap {
  display: flex;
  justify-content: flex-end;
}

.errMsg {
  color: red;
  font-size: 13px;
}
</style>