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
        selected: "",
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
      if (this.lang.selected === this.lang.applied) {
        return;
      }

      if (this.lang.selected === "" && !localStorage.selectedLanguage) {
        this.lang.selected = this.lang.default;
      } else if (this.lang.selected === "") {
        this.lang.selected = localStorage.getItem("selectedLanguage");
      }

      this.lang.applied = this.lang.selected;

      localStorage.setItem("selectedLanguage", this.lang.applied);

      Axios.get("assets/" + this.lang.applied + ".json").then((response) => {
        this.$emit("g11n", response.data);
      });
    },
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