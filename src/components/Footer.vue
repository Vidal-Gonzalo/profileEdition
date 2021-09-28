<template>
  <div class="footer">
    <div class="wrapLang">
      <select
        v-model="lang.selected"
        class="lang"
        name="lang"
        @change="fetchTranslations"
      >
        <option
          v-for="option in lang.available"
          :key="option.key"
          :value="option.key"
        >
          {{ option.value }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Footer",
  emits: ["g11n"],
  data: function () {
    return {
      lang: {
        applied: null,
        selected: null,
        default: "en_US",
        available: [
          { key: "en_US", value: "English" },
          { key: "es_AR", value: "Español" },
        ],
      },
    };
  },
  methods: {
    fetchTranslations() {
      if (this.lang.selected === this.lang.applied && this.lang.applied !== null) {
        return 
      }

      this.lang.applied = this.lang.selected = this.resolveLang()

      Axios.get("assets/" + this.lang.applied + ".json").then((response) => {
        this.$emit("g11n", response.data);
      });
    },
    resolveLang(){
        if (this.lang.selected !== null) {
            return this.lang.selected
        }
        if (localStorage.selectedLanguage){
            return localStorage.getItem("selectedLanguage")
        }
        localStorage.setItem("selectedLanguage", this.lang.default)
        return this.lang.default
    }
  },

  created() {
    this.fetchTranslations();
  },
};
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  background: #4e4d4d;
  width: 100%;
  height: 40px;
  box-shadow: 5px 5px 8px 5px #000;
}

.wrapLang {
  color: #fff;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
}

.lang {
  height: 30px;
  width: 100px;
  margin: 0px 20px 0px 20px;
  border: 1px solid #017bab;
  background: #252323;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
}
</style>