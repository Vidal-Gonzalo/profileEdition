<template>
  <div id="app">
    <router-view :g11n="g11n"/>
    <Footer @g11n = "setG11N($event)"/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: "app",
  components: {
    Footer
  },
  data(){
    return {
      g11n: null
    }
  },
  methods: {
    setG11N(data) {
      this.g11n = data;
    }
  }
  
};
</script>



