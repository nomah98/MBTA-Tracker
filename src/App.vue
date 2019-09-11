
<template>
    <div id="header">
      <p style="font-size:125%;"> MBTA App</p>
      <b><router-link to="/">Home</router-link></b>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style scoped >
  #header {
    size: portrait;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #555555;
    text-align: center;
    color: #000000;
  }
</style>
