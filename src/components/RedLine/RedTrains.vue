<<template>
  <div id = "red">
    <p>Station: {{station + ' - Red Line'}}</p>
    <h2 >{{'To Alewife:'}}</h2>
    <p>First Alewife: {{ Otrain1}} Minute(s) away</p>
    <p>Second Alewife: {{ Otrain2}} Minute(s) away</p>
    <p>Third Alewife: {{ Otrain3}} Minute(s) away</p>

    <h2>{{'To Ashmont/Braintree:'}}</h2>
    <p>First train: {{headsign1}}: {{ Itrain1}} Minute(s) away</p>
    <p>Second train: {{headsign2}}: {{ Itrain2}} Minute(s) away</p>
    <p>Third train: {{headsign3}}: {{ Itrain3}} Minute(s) away</p>


  </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'Trains',
        props: ['station','alewifeID', 'brainAshID', "id"],

        data() {
            return {
                station: {},
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
                alewifeID: {},
                brainAshID: {},

                headsign1: {},
                headsign2: {},
                headsign3: {},
                dest: {},
                tripIdent: {},

            }
        },

        created() {
            this.fetchOutboundData(),
                this.fetchInboundData(),
                this.findBrainAshDest(),
                this.isEmpty()
        },

        watch: {
            '$route': 'fetchInboundData',

        },

        methods: {
            fetchOutboundData() {
                axios.get('https://api-v3.mbta.com/predictions?filter[stop]=' + this.alewifeID)
                    .then((resp) => {
                        if (this.alewifeID === '') {
                            this.Otrain1 = 'N/A'
                            this.Otrain2 = 'N/A'
                            this.Otrain3 = 'N/A'
                        }
                        this.train1 = resp.data['data'][0]['attributes']
                        this.Otrain1 = Math.round((new Date(this.train1['arrival_time']) - Date.now()) / 60000)
                        this.train2 = resp.data['data'][1]['attributes']
                        this.Otrain2 = Math.round((new Date(this.train2['arrival_time']) - Date.now()) / 60000)
                        this.train3 = resp.data['data'][2]['attributes']
                        this.Otrain3 = Math.round((new Date(this.train3['arrival_time']) - Date.now()) / 60000)
                        console.log(resp)

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            fetchInboundData() {
                axios.get('https://api-v3.mbta.com/predictions?filter[stop]=' + this.brainAshID)
                    .then((resp) => {
                        if (this.brainAshID === '') {
                            this.Itrain1 = 'N/A'
                            this.Itrain2 = 'N/A'
                            this.Itrain3 = 'N/A'
                        }
                        this.train1 = resp.data['data'][0]['attributes']
                        if(Math.round((new Date(this.train1['arrival_time']) - Date.now()) / 60000) < 0 || this.isEmpty(this.train1)) {
                            this.Itrain1 = 'No prediction available at this time'
                        } else {
                            this.Itrain1 = Math.round((new Date(this.train1['arrival_time']) - Date.now()) / 60000)
                        }
                       /* this.Itrain1 = Math.round((new Date(this.train1['arrival_time']) - Date.now()) / 60000)*/
                        this.train2 = resp.data['data'][1]['attributes']
                        if(Math.round((new Date(this.train2['arrival_time']) - Date.now()) / 60000) < 0 || this.isEmpty(this.train2)) {
                            this.Itrain2 = 'No prediction available at this time'
                        } else {
                            this.Itrain2 = Math.round((new Date(this.train2['arrival_time']) - Date.now()) / 60000)
                        }
                     /*   this.Itrain2 = Math.round((new Date(this.train2['arrival_time']) - Date.now()) / 60000)*/
                        this.train3 = resp.data['data'][2]['attributes']
                        if(Math.round((new Date(this.train3['arrival_time']) - Date.now()) / 60000) < 0 || this.isEmpty(this.train3)) {
                            this.Itrain3 = 'No prediction available at this time'
                        } else {
                            this.Itrain3 = Math.round((new Date(this.train3['arrival_time']) - Date.now()) / 60000)
                        }
                        /*this.Itrain3 = Math.round((new Date(this.train3['arrival_time']) - Date.now()) / 60000)*/
                        this.findBrainAshDest(resp.data['data'][0]['relationships']['trip']['data']['id'],
                            resp.data['data'][1]['relationships']['trip']['data']['id'],
                            resp.data['data'][2]['relationships']['trip']['data']['id']);
                        console.log(resp)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
              async findBrainAshDest(tripID1, tripID2, tripID3 ) {
                 axios.get('https://api-v3.mbta.com/trips?filter[route]=Red')
                    .then((resp) => {
                        for(let i = 0; i < 10000; i++ ) {
                            if(resp.data['data'][i]['id'] === tripID1) {
                                this.headsign1 = resp.data['data'][i]['attributes']['headsign'];
                                break
                            }
                        }
                        for(let i = 0; i < 10000; i++ ) {
                            if(resp.data['data'][i]['id'] === tripID2) {
                                this.headsign2 = resp.data['data'][i]['attributes']['headsign'];
                                break
                            }
                        }
                        for(let i = 0; i < 10000; i++ ) {
                            if(resp.data['data'][i]['id'] === tripID3) {
                                this.headsign3 = resp.data['data'][i]['attributes']['headsign'];
                                break
                            }
                        }

                }).catch((err) => {
                     console.log(err)
                 })
            },
            isEmpty(obj) {
                for(let prop in obj) {
                    if(obj.hasOwnProperty(prop))
                        return false;
                }
                return true;
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
</style>

