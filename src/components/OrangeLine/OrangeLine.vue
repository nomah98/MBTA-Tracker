<template>

  <div  id="orange">
    <p style="font-size:200%;">Service Alerts:</p>
    <p style="font-size:125%;">{{info2}}</p>
    <h1> Stations: </h1>
    <ul style="list-style-type:none;">
      <li v-for="stop in stops">
        <router-link :to="{name: 'OLineTemp', params: {station: stop.stationName,  oakGrove: stop.oakGrove, forestHills: stop.forestHills}}"> {{stop.stationName }}</router-link> </li> </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "OrangeLine",
        data() {
            return {
                alerts: {},
                info: {},
                info2: {},
                stops: [
                    {
                    stationName: "Oak Grove", oakGrove: '', forestHills: 70036
                    },
                    {
                    stationName: "Malden", oakGrove: 70035, forestHills: 70034
                    },
                    {
                        stationName: "Wellington", oakGrove: 700333, forestHills: 70032
                    },
                    {
                        stationName: "Assembly", oakGrove: 70279, forestHills: 70278
                    },
                    {
                        stationName: "Sullivan", oakGrove: 70031, forestHills: 70030
                    },
                    {
                        stationName: "Community College", oakGrove: 70029, forestHills: 70028
                    },
                    {
                        stationName: "North Station", oakGrove: 70027, forestHills: 70026
                    },
                    {
                        stationName: "Haymarket", oakGrove: 70025, forestHills: 70024
                    },
                    {
                        stationName: "State", oakGrove: 70023, forestHills: 70022
                    },
                    {
                        stationName: "Downtown Crossing", oakGrove: 70021, forestHills: 70020
                    },
                    {
                        stationName: "Chinatown", oakGrove: 70019, forestHills: 70018
                    },
                    {
                        stationName: "Tufts", oakGrove: 70017, forestHills: 70016
                    },
                    {
                        stationName: "Back Bay", oakGrove: 70015, forestHills: 70014
                    },
                    {
                        stationName: "Mass Ave", oakGrove: 70013, forestHills: 70012
                    },
                    {
                        stationName: "Ruggles", oakGrove: 70011, forestHills: 70010
                    },
                    {
                        stationName: "Roxbury Crossing", oakGrove: 70009, forestHills: 70008
                    },
                    {
                        stationName: "Jackson Square", oakGrove: 70007, forestHills: 70006
                    },
                    {
                        stationName: "Stonybrook", oakGrove: 70005, forestHills: 70004
                    },
                    {
                        stationName: "Green St", oakGrove: 70003, forestHills: 70002
                    },
                    {
                        stationName: "Forest Hills", oakGrove: 70001, forestHills: ''
                    },

                ]
            }
        },
        created() {
            this.fetchAlerts(),
                this.findAlertData(data)
        },

        methods: {
            fetchAlerts() {
                axios.get('https://api-v3.mbta.com/alerts?filter[route]=Orange')
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
                            this.info2 = data['data'][0]['attributes']['header'] +  '. ' + data['data'][0]['attributes']['description']

                }
            }
        }
    }
</script>

<style scoped>
  #orange {
    size: portrait;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #cc8400;
    text-align: center;
    color: #ffffff;
    margin-top: 60px;
  }

</style>
