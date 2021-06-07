<template>
    <div class="measure">

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                지금 나의 옷장 속 온습도는 ?
              </v-list-item-title>
              <v-list-item-subtitle><h3>{{ timestamp }}</h3></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col
              class="display-3"
              cols="6"
            >
              온도측정&deg;C
            </v-col>
            <v-col
              class="display-3"
              cols="6"
            >
              습도측정%
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-thermometer</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>23 &deg;C</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-water-percent</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>48 %</v-list-item-subtitle>
        </v-list-item>

        <v-divider />

        <v-list class="transparent">
          <v-list-item
            v-for="item in forecast"
            :key="item.time"
          >
            <v-list-item-title>{{ item.time }}</v-list-item-title>

            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-subtitle class="text-right">
              {{ item.temp }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

    </div>
</template>

<script>

export default {
    name: 'Measure',
    data () {
      return {
        timestamp: '',
        forecast: [
          { time: '3 Hours ago', icon: 'mdi-white-balance-sunny', temp: '온도\xB0/습도\xB0' },
          { time: '6 Hours ago', icon: 'mdi-white-balance-sunny', temp: '온도\xB0/습도\xB0' },
          { time: '9 Hours ago', icon: 'mdi-cloud', temp: '온도\xB0/습도\xB0' },
        ],
      }
    },
    created() {
        this.getNow();
    },
    methods: {
                getNow: function() {
                    const today = new Date();
                    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    const dateTime = date +' '+ time;
                    this.timestamp = dateTime;
                }
            }
}
</script>