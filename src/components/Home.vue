<template>
  <div>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <div id="home">
    <router-link to="/OrangeLine">OrangeLine</router-link>
    <router-link to="/RedLine">RedLine</router-link>
    <router-link to="/GreenLine">GreenLine</router-link>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
    export default {
        name: 'Hello',
        data () {
            return {
                msg: 'Welcome to Mbta Info. Please select your desired transportation line'
            }
        }
    }
</script>

<style scoped>


  #home {
    size: portrait;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #ffffff;
    text-align: center;
    color: #000000;
    margin-top: 60px;
  }

</style>
