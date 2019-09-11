<<template>
  <div id = "green">
    <p>Station: {{station + ' - Green Line'}}</p>
    <h2 >{{'To Lechmere:'}}</h2>
    <p>First Lechmere: {{ train1}}</p>
    <p>Second Lechmere: {{ Otrain2}}</p>
    <p>Third Lechmere: {{ Otrain3}}</p>

    <h2>{{'Westbound Trains:'}}</h2>
    <p>First train: {{headsign1}}: {{ Itrain1}}</p>
    <p>Second train: {{headsign2}}: {{ Itrain2}}</p>
    <p>Third train: {{headsign3}}: {{ Itrain3}}</p>


  </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'Trains',
        props: ['station', 'lechID', 'westID', "id"],

        data() {
            return {
                Otrain1: {},
                Otrain2: {},
                Otrain3: {},

                Itrain1: {},
                Itrain2: {},
                Itrain3: {},
                train1: {},
                train2: {},
                train3: {},
                train4: {},
                train5: {},
                train6: {},
               /* lechID: {},
                westID: {},
                station: {},*/
                headsign1: {},
                headsign2: {},
                headsign3: {},
            }
        },

        created() {
            this.fetchOutboundData(),
                this.fetchInboundData(),
                this.findDest()
        },

        watch: {
            '$route': 'fetchInboundData',

        },

        methods: {
            async fetchOutboundData() {
                let {data} = await axios.get('https://api-v3.mbta.com/predictions?filter[stop]=' + this.lechID + '&api_key=5bae88c010f6476c989758e8dbb3e72d')
                    .then((resp) => {
                        if (this.lechID === '') {
                            this.Otrain1 = 'N/A';
                            this.Otrain2 = 'N/A';
                            this.Otrain3 = 'N/A'
                        }
                        data = resp;
                        this.train1 = resp.data['data'][0]['attributes'];
                        if (this.train1 === undefined) {
                            this.fetchOutboundData()
                        }
                        this.Otrain1 = Math.round((new Date(this.train1['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away';
                        this.train2 = resp.data['data'][1]['attributes'];
                        this.Otrain2 = Math.round((new Date(this.train2['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away';
                        this.train3 = resp.data['data'][2]['attributes'];
                        this.Otrain3 = Math.round((new Date(this.train3['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away';

                        console.log(resp)

                    })
                    .catch((err) => {
                        console.log(err)
                    })
                return data
            },

            async fetchInboundData() {
                 let {data} = await axios.get('https://api-v3.mbta.com/predictions?filter[stop]=' + this.westID + '&api_key=5bae88c010f6476c989758e8dbb3e72d')
                     .then((resp) => {
                        if (this.westID === '') {
                            this.Itrain1 = 'N/A';
                            this.Itrain2 = 'N/A';
                            this.Itrain3 = 'N/A'
                        }
                        this.train4 = resp.data['data'][0]['attributes'];
                        this.Itrain1 = Math.round((new Date(this.train4['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away'
                        this.train5 = resp.data['data'][1]['attributes'];
                        this.Itrain2 = Math.round((new Date(this.train5['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away'
                        this.train6 = resp.data['data'][2]['attributes'];
                        this.Itrain3 = Math.round((new Date(this.train6['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away'
                        this.findDest(resp.data['data'][0]['relationships']['trip']['data']['id'],
                            resp.data['data'][1]['relationships']['trip']['data']['id'],
                            resp.data['data'][2]['relationships']['trip']['data']['id']);
                        console.log(resp)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            async findDest(tripID1, tripID2, tripID3) {
                tripID1 = tripID1.substring(0, 8);
                tripID2 = tripID2.substring(0, 8);
                tripID3 = tripID3.substring(0, 8);
                await axios.all([axios.get('https://api-v3.mbta.com/trips?filter[route]=Green-A' + '&api_key=5bae88c010f6476c989758e8dbb3e72d'),
                    axios.get('https://api-v3.mbta.com/trips?filter[route]=Green-B' + '&api_key=5bae88c010f6476c989758e8dbb3e72d'),
                    axios.get('https://api-v3.mbta.com/trips?filter[route]=Green-C' + '&api_key=5bae88c010f6476c989758e8dbb3e72d'),
                    axios.get('https://api-v3.mbta.com/trips?filter[route]=Green-D' + '&api_key=5bae88c010f6476c989758e8dbb3e72d'),
                    axios.get('https://api-v3.mbta.com/trips?filter[route]=Green-E' + '&api_key=5bae88c010f6476c989758e8dbb3e72d')])
                    .then(axios.spread((aResp, bResp, cResp, dResp, eResp) => {
                            this.respList = [aResp.data, bResp.data, cResp.data, dResp.data, eResp.data];
                            for (let j = 0; j < 5; j++) {
                                if (this.respList[j]['data'].length > 1) {
                                    for (let i = 0; i < this.respList[j]['data'].length; i++) {
                                        if (this.respList[j]['data'][i]['id'].substring(0, 8) === tripID1) {
                                            this.headsign1 = this.respList[j]['data'][i]['attributes']['headsign'];
                                            break
                                        }
                                    }
                                }
                            }
                            for (let j = 0; j < 5; j++) {
                                if (this.respList[j]['data'].length > 1) {
                                    for (let i = 0; i < this.respList[j]['data'].length; i++) {
                                        if (this.respList[j]['data'][i]['id'].substring(0, 8) === tripID2) {
                                            this.headsign2 = this.respList[j]['data'][i]['attributes']['headsign'];
                                            break
                                        }

                                    }
                                }
                            }
                            for (let j = 0; j < 4; j++) {
                                if (this.respList[j]['data'].length > 1) {
                                    for (let i = 0; i < this.respList[j]['data'].length; i++) {
                                        if (this.respList[j]['data'][i]['id'].substring(0, 8) === tripID3) {
                                            this.headsign3 = this.respList[j]['data'][i]['attributes']['headsign'];
                                            break
                                        }
                                    }
                                }
                            }
                        })
                    ).catch((err) => {
                    console.log(err)
                })
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
</style>

