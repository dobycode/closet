<template>
    <div class="measure">

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                지금 나의 옷장 속 온습도는 ?
              </v-list-item-title>
              <!-- --------------------------------------------------------------------- -->
              <div class="callout calendar-day">
                <div class="grid-x align-middle align-middle">
                    <div class="shrink cell">
                        <h1>{{ this.momentInstance.format('YYYY MM D, h:mm:ss a') }}</h1>
                    </div>
                </div>
            </div>
            </v-list-item-content>
          </v-list-item>
            <!-- ----------------------------------------------------------------------- -->
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
import moment from 'moment';

export default {
    name: 'Measure',
    data () {
      return {
        forecast: [
          { time: '3 Hours ago', icon: 'mdi-white-balance-sunny', temp: '온도\xB0/습도\xB0' },
          { time: '6 Hours ago', icon: 'mdi-white-balance-sunny', temp: '온도\xB0/습도\xB0' },
          { time: '9 Hours ago', icon: 'mdi-cloud', temp: '온도\xB0/습도\xB0' },
        ],
         momentInstance: moment()
      }
    },
    mounted() {
        setInterval(() => {
            this.momentInstance = moment()
        }, 1000)
    },
    created() {
        this.getNow();
    },
}
</script>