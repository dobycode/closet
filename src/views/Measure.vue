<template>
<div>
    <div class="measure" v-if="this.$store.state.token != null">

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
                  온도측정: {{this.datas.temp}}&deg;C
                </v-col>

                <el-progress type="circle" :percentage="this.datas.temp"></el-progress>
              </div>
              <div class="humidGraph">
                 <v-col>
                  습도측정: {{this.datas.Hum}}%
                </v-col>

                <el-progress type="circle" :percentage="this.datas.Hum"></el-progress>
              </div>
            </div>

        <!-- 온도 측정 아이콘 ------------------------------------------------------------------->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-thermometer</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{this.datas.temp}} &deg;C</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-water-percent</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{this.datas.Hum}} %</v-list-item-subtitle>
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

    <div v-if="this.$store.state.token == null">
      토큰 없음 
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
    name: 'Measure',
    data () {
      return {
        forecast: [
          { time: '3 Hours ago', icon: 'mdi-white-balance-sunny', temp: '온도\xB0/습도\xB0' },
          { time: '6 Hours ago', icon: 'mdi-white-balance-sunny', temp: '온도\xB0/습도\xB0' },
          { time: '9 Hours ago', icon: 'mdi-cloud', temp: '온도\xB0/습도\xB0' },
        ],
         momentInstance: moment(),
         datas: null
      }
    },
    mounted() {
        setInterval(() => {
            this.momentInstance = moment()
        }, 1000)
    },
    created() {
        if(this.$store.state.token != null){
        var config = {
          method: 'get',
          url: 'http://ec2-3-139-102-177.us-east-2.compute.amazonaws.com:3000/api/download/receiveStatus',
          headers: { 
            'Authorization': this.$store.state.token, 
          },
        };

        axios(config).then(res => {
          this.datas = res.data
          console.log(this.datas.id);
          
        });
        }
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