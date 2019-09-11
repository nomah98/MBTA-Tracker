<template>

  <div  id="green">
    <p style="font-size:200%;">Service Alerts:</p>
    <p style="font-size:125%;">A Line: {{aInfo}}</p>
    <p style="font-size:125%;">B Line: {{bInfo}}</p>
    <p style="font-size:125%;">C Line: {{cInfo}}</p>
    <p style="font-size:125%;">D Line: {{dInfo}}</p>
    <p style="font-size:125%;">E Line: {{eInfo}}</p>
    <h1> Stations: </h1>

    <ul style="list-style-type:none;">
      <li  v-for="stop in stops">
        <router-link :to="{name: 'GreenLineTemp', params: {station: stop.stationName,  lechID: stop.lechID, westID: stop.westID}}"> {{stop.stationName }}</router-link> </li> </ul>
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
                aInfo: {},
                bInfo: {},
                cInfo: {},
                dInfo: {},
                eInfo: {},
                stops: [
                    {
                        stationName: "Lechmere", lechID: '', westID: 700210
                    },
                    {
                        stationName: "Science Park", lechID: 70207, westID: 70208
                    },
                    {
                        stationName: "North Station", lechID: 70205, westID: 70206
                    },
                    {
                        stationName: "Haymarket", lechID: 70203, westID: 70204
                    },
                    {
                        stationName: "Govt Center", lechID: 70201, westID: 70202
                    },
                    {
                        stationName: "Park Street", lechID: '', westID: ''
                    },
                    {
                        stationName: "Boylston", lechID: 70158, westID: 70159
                    },
                    {
                        stationName: "Arlington", lechID: 70156, westID: 70157
                    },
                    {
                        stationName: "Copley", lechID: 70154, westID: 70155
                    },
                    {
                        stationName: "Prudential", lechID: 70240, westID: 70239
                    },
                    {
                        stationName: "Symphony", lechID: 70242, westID: 70241
                    },
                    {
                        stationName: "Northeastern", lechID: 70244, westID: 70243
                    },
                    {
                        stationName: "MFA", lechID: 70246, westID: 70245
                    },
                    {
                        stationName: "Longwood", lechID: 70248, westID: 70247
                    },
                    {
                        stationName: "Bringham Circle", lechID: 70250, westID: 70249
                    },
                    {
                        stationName: "Fenwood Road", lechID: 70252, westID: 70251
                    },
                    {
                        stationName: "Mission Park", lechID: 70254, westID: 70253
                    },
                    {
                        stationName: "Riverway", lechID: 70256, westID: 70255
                    },
                    {
                        stationName: "Back of the Hill", lechID: 70258, westID: 70257
                    },
                    {
                        stationName: "Heath Street", lechID: 70260, westID: ''
                    },

                ],
            }
        },
        created() {
            this.fetchAlerts(),
                this.findAlertData(data)
        },

        methods: {
            async fetchAlerts() {
                await axios.all([axios.get('https://api-v3.mbta.com/alerts?filter[route]=Green-A'),
                    axios.get('https://api-v3.mbta.com/alerts?filter[route]=Green-B'),
                    axios.get('https://api-v3.mbta.com/alerts?filter[route]=Green-C'),
                    axios.get('https://api-v3.mbta.com/alerts?filter[route]=Green-D'),
                    axios.get('https://api-v3.mbta.com/alerts?filter[route]=Green-E')])

                    .then(axios.spread((aResp,bResp,cResp,dResp,eResp) => {
                        /*this.alerts = resp.data['data'][1];*/
                        this.findAlertData(aResp.data,bResp.data,cResp.data,dResp.data,eResp.data)

                    }))
                    .catch((err) => {
                    })
            },
            findAlertData(aData,bData,cData,dData,eData) {
                if(!aData['data'][0]) {
                    this.aInfo = 'No alerts'
                } else {
                    this.aInfo = aData['data'][0]['attributes']['header'] + ' ' + aData['data'][0]['attributes']['description'] + '. ';
                }
                if(!bData['data'][0]) {
                    this.bInfo = 'No alerts'
                } else {
                    this.bInfo = bData['data'][0]['attributes']['header'] + ' ' + bData['data'][0]['attributes']['description'] + '. ';
                }
                if(!cData['data'][0]) {
                    this.cInfo = 'No alerts'
                } else {
                    this.cInfo = cData['data'][0]['attributes']['header'] + ' ' + cData['data'][0]['attributes']['description'] + '. ';
                }
                if(!dData['data'][0]) {
                    this.dInfo = 'No alerts'
                } else {
                    this.dInfo = dData['data'][0]['attributes']['header'] + ' ' + dData['data'][0]['attributes']['description'] + '. ';
                }
                if(!eData['data'][0]) {
                    this.eInfo = 'No alerts'
                } else {
                    this.eInfo = eData['data'][0]['attributes']['header'] + ' ' + eData['data'][0]['attributes']['description'] + '. ';
                }
            }
        }
    }
</script>

<style scoped>
  #green {
    size: portrait;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #008000;
    text-align: center;
    color: #ffffff;
    margin-top: 60px;

  }

  a {
    color: white;
  }

</style>

