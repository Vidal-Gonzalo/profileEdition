<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> 
    </div>
  </div>
</template>

<script>
    export default{
        name: 'Navbar'
    }
</script>

<style scoped>


#nav {
  padding: 30px;
  background-color: black;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
