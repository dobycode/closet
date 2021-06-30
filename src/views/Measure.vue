<template>
    <div class="measure">

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                지금 나의 옷장 속 온습도는 ?
              </v-list-item-title>

              <!-- 실시간 시계--------------------------------------------------------------------- -->
              <div class="callout calendar-day">
                <div class="grid-x align-middle align-middle">
                    <div class="shrink cell">
                        <h1>{{ this.momentInstance.format('YYYY년 MM월 D일, h:mm:ss a') }}</h1>
                    </div>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>

            <!-- 온도측정 그래프----------------------------------------------------------------------- -->
            <div class="pageWrap">
              <div class="tempGraph">
                 <v-col>
                  온도측정&deg;C
                </v-col>

                <el-progress type="circle" :percentage="25"></el-progress>
              </div>
              <div class="humidGraph">
                 <v-col>
                  습도측정%
                </v-col>

                <el-progress type="circle" :percentage="30"></el-progress>
              </div>
            </div>

        <!-- 온도 측정 아이콘 ------------------------------------------------------------------->
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
        <br>
        <v-divider />
        <br>
      <!-- 시간별 온습도 측정 값 ------------------------------------------------------------------------------------- --> 
        <div class="clearfix">
          <h3>시간</h3> 
          <h3>상태</h3> 
          <h3>측정값</h3>
        </div>
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
              <h2>{{ item.temp }}</h2>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <!------------------------------------------------------------------------------------- -->
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

<style>
.pageWrap {
	width:100%;
}
.tempGraph{
width: 50%;
    float: left;
}
.humidGraph{
width: 50%;
    float: left;
}
.col {
text-align: center;
font-size: 2rem;
}

.el-progress--circle, .el-progress--dashboard {
    display: block !important;
}
.el-progress-circle{
margin: 0 
auto;
}
h3 {
  float: left;
  text-align: center;
  
}
.clearfix::after, .clearfix::before {
  content: '';
  display: block;
  clear: both;
}
</style>