<template>
  <div>
    <p>Name: {{ coin.name }}</p>
    <p>Symbol: {{ coin.symbol }}</p>
    <p>Price (USD): {{ coin.price_usd }}</p>
  </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'Coins',

        data() {
            return {
                coin: {}
            }
        },

        created() {
            this.fetchData()
        },

        watch: {
            '$route': 'fetchData'
        },

        methods: {
            fetchData() {
                axios.get('https://api.coinmarketcap.com/v1/ticker/'+this.$route.params.id+'/')
                    .then((resp) => {
                        this.coin = resp.data[0]
                        console.log(resp)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style>
  #app {
    size: portrait;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #555555;
    text-align: center;
    color: #ffffff;
    margin-top: 60px;
  }
</style>
