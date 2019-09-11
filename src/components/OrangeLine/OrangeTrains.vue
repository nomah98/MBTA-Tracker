<<template>
  <div id ="orange">
    <p>Station: {{station + ' - Orange Line'}}</p>
    <h2 >{{'To Oak Grove:'}}</h2>
    <p>First Oak Grove: {{ Itrain1}}</p>
    <p>Second Oak Grove: {{ Itrain2}}</p>
    <p>Third Oak Grove: {{ Itrain3}}</p>

    <h2>{{'To Forest Hills:'}}</h2>
    <p>First Forest Hills: {{ Otrain1}}</p>
    <p>Second Forest Hills: {{ Otrain2}}</p>
    <p>Third Forest Hills: {{ Otrain3}}</p>

  </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'Trains',
        props: ['station','oakGrove', 'forestHills'],

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

                oakGrove: {},
                forestHills: {},
                station: {}
            }
        },

        created() {
            this.fetchOutboundData(),
                this.fetchInboundData()
        },

        watch: {
            '$route': 'fetchInboundData',
            '$route': 'fetchOutboundData'

        },

        methods: {
            async fetchOutboundData() {

                await axios.get('https://api-v3.mbta.com/predictions?filter[stop]=' + this.oakGrove)
                    .then((resp) => {
                        if (this.oakGrove === '') {
                            this.Otrain1 = 'N/A';
                            this.Otrain2 = 'N/A';
                            this.Otrain3 = 'N/A';
                        }
                        this.train1 = resp.data['data'][0]['attributes']
                        this.Otrain1 = Math.round((new Date(this.train1['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away'
                        this.train2 = resp.data['data'][1]['attributes']
                        this.Otrain2 = Math.round((new Date(this.train2['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away'
                        this.train3 = resp.data['data'][2]['attributes']
                        this.Otrain3 = Math.round((new Date(this.train3['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away'
                        console.log(resp)

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            fetchInboundData() {
                axios.get('https://api-v3.mbta.com/predictions?filter[stop]=' + this.forestHills)
                    .then((resp) => {
                        if (this.forestHills === '') {
                            this.Itrain1 = 'N/A'
                            this.Itrain2 = 'N/A'
                            this.Itrain3 = 'N/A'
                        }
                        this.train4 = resp.data['data'][0]['attributes']
                        this.Itrain1 = Math.round((new Date(this.train4['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away'
                        this.train5 = resp.data['data'][1]['attributes']
                        this.Itrain2 = Math.round((new Date(this.train5['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away'
                        this.train6 = resp.data['data'][2]['attributes']
                        this.Itrain3 = Math.round((new Date(this.train6['arrival_time']) - Date.now()) / 60000) + ' Minute(s) away'
                        console.log(resp)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
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

