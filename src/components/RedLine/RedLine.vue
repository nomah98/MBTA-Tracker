<template>

  <div  id="red">
    <p style="font-size:200%;">Service Alerts:</p>
    <p style="font-size:125%;">{{info2}}</p>
    <h1> Stations: </h1>
    <ul style="list-style-type:none;">
      <li  v-for="stop in stops">
        <router-link :to="{name: 'RedLineTemp', params: {station: stop.stationName,  alewifeID: stop.alewifeID, brainAshID: stop.brainAshID}}"> {{stop.stationName }}</router-link> </li> </ul>
    <router-view></router-view>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "RedLine",
        data() {
            return {
                alerts: {},
                info: {},
                info2: {},
                stops: [
                    {
                        stationName: "Alwewife", alewifeID: '', brainAshID: 70061
                    },
                    {
                        stationName: "Davis", alewifeID: 70064, brainAshID: 70063
                    },
                    {
                        stationName: "Porter", alewifeID: 700066, brainAshID: 70065
                    },
                    {
                        stationName: "Harvard", alewifeID: 70068, brainAshID: 70067
                    },
                    {
                        stationName: "Central", alewifeID: 70070, brainAshID: 70069
                    },
                    {
                        stationName: "Kendall", alewifeID: 70072, brainAshID: 70071
                    },
                    {
                        stationName: "Charles", alewifeID: 70074, brainAshID: 70073
                    },
                    {
                        stationName: "Park", alewifeID: 70076, brainAshID: 70075
                    },
                    {
                        stationName: "DTX", alewifeID: 70078, brainAshID: 70077
                    },
                    {
                        stationName: "South", alewifeID: 70080, brainAshID: 70079
                    },
                    {
                        stationName: "Broadway", alewifeID: 70082, brainAshID: 70081
                    },
                    {
                        stationName: "Andrew", alewifeID: 70084, brainAshID: 70083
                    },
                    {
                        stationName: "JFK", alewifeID: 70017, brainAshID: 70016
                    },
                    {
                        stationName: "North Quincy", alewifeID: 70098, brainAshID: 70097
                    },
                    {
                        stationName: "Wollaston", alewifeID: 70100, brainAshID: 70099
                    },
                    {
                        stationName: "Quincy Center", alewifeID: 70102, brainAshID: 70101
                    },
                    {
                        stationName: "Quincy Adams", alewifeID: 70104, brainAshID: 70103
                    },
                    {
                        stationName: "Braintree", alewifeID: '', brainAshID: 70105
                    },
                    {
                        stationName: "Savin Hill", alewifeID: 70088, brainAshID: 70087
                    },
                    {
                        stationName: "Field's Corner", alewifeID: 70090, brainAshID: 70089
                    },
                    {
                        stationName: "Shawmut", alewifeID: 70092, brainAshID: 70091
                    },
                    {
                        stationName: "Ashmont", alewifeID: 70094, brainAshID: ''
                    },

                ],
                function() {
                    return {
                        MM: this.$route.params.id
                    }
                }
            }
        },
        created() {
            this.fetchAlerts(),
                this.findAlertData(data)
        },

        methods: {
            fetchAlerts() {
                axios.get('https://api-v3.mbta.com/alerts?filter[route]=Red')
                    .then((resp) => {
                        /*this.alerts = resp.data['data'][1];*/
                        this.findAlertData(resp.data)

                    })
                    .catch((err) => {
                    })
            },
            findAlertData(data) {
                        this.routeType = data['data'][0]['attributes']['informed_entity'][0]['route_type'];
                        this.info = this.routeType
                        if (data['data'][0]['attributes']['informed_entity'][0]['route_type'] === 1) {
                            this.info2 = data['data'][0]['attributes']['header'] + data['data'][0]['attributes']['description']
                }
            }
        }
    }
</script>

<style scoped>
  #red {
    size: portrait;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #ff0000;
    text-align: center;
    color: #ffffff;
    margin-top: 60px;

  }

  a {
    color: white;
  }

</style>
