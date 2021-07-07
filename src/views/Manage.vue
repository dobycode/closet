<template>
    <div>
        <div class="manage" v-if="this.$store.state.token != null">
           <v-container class="pa-4 text-center">
             <v-row
               class="fill-height"
               align="center"
               justify="center"
             >
               <template v-for="(item, i) in items">
                 <v-col
                   :key="i"
                   cols="12"
                   md="4"
                 >
                   <v-hover v-slot="{ hover }">
                     <v-card
                       :elevation="hover ? 12 : 2"
                       :class="{ 'on-hover': hover }"
                     >
                      
                       <v-img
                         :src="item.img"
                         height="225px"
                       >
                         <v-card-title class="text-h6 white--text">
                           <v-row
                             class="fill-height flex-column"
                             justify="space-between"
                           >
                             <p class="mt-4 subheading hoverevent font-weight-bold"
                                :elevation="hover ? 12 : 2"
                                :class="{ 'on-hover': hover }">
                               {{item.name}}
                             </p>

                             <div>
                               <p class="ma-0 text-body-1 font-weight-bold hoverevent"
                                  :elevation="hover ? 12 : 2"
                                  :class="{ 'on-hover': hover }">
                                 종류: {{ item.kind }}
                               </p>
                               <p class="ma-0 text-body-1 font-weight-bold hoverevent"
                                 :elevation="hover ? 12 : 2"
                                 :class="{ 'on-hover': hover }">
                                 재질: {{ item.materials }}
                               </p>
                                <p class="ma-0 text-body-1 font-weight-bold hoverevent"
                                 :elevation="hover ? 12 : 2"
                                 :class="{ 'on-hover': hover }">
                                 사이즈: {{ item.size }}
                               </p>
                             </div>

                             
                           </v-row>
                         </v-card-title>
                       </v-img>
                       <v-btn @click="deletes(item)" width="100%">DELETE</v-btn>
                     </v-card>
                   </v-hover>
                 </v-col>
               </template>
             </v-row>
           </v-container>
        </div>

        <div v-if="this.$store.state.token == null">
          <div class="black-bg">
            <div class="white-bg" style="text-align:center">
              로그인을 완료해주시기 바랍니다
            </div>
          </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Manage',
    data () {
      return {
        transparent: 'rgba(255, 255, 255, 0)',
        items: [],
      }
    },
    created() {
      this.receive()
    },
    methods: {
      deletes(item) {
        console.log("deletes()...")
        var config = {
          method: 'delete',
          url: 'http://ec2-3-139-102-177.us-east-2.compute.amazonaws.com:3000/api/upload/delete/' + item.id,
          headers: { 
            'Authorization': this.$store.state.token, 
          },
        };

        axios(config).then(res => {
          console.log(res.data);
        })
        this.receive();
      },

      receive(){
        if(this.$store.state.token != null){
        var config = {
          method: 'get',
          url: 'http://ec2-3-139-102-177.us-east-2.compute.amazonaws.com:3000/api/download/receiveData',
          headers: { 
            'Authorization': this.$store.state.token, 
          },
        };

        axios(config).then(res => {
          this.items = res.data
          for(var i = 0; i < this.items.length; i++){
            this.items[i].img = `http://ec2-3-139-102-177.us-east-2.compute.amazonaws.com:3000/` + this.items[i].img
          }
          console.log(this.items);
          
        });
        }
      }
    }
}
</script>

<style scoped>
.black-bg {
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed; padding: 20px;
}

.white-bg{
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
}

.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 1;
 }

 .v-card {
   opacity: 0.6;
 }

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.hoverevent {
  transition: opacity .4s ease-in-out;
  color: rgb(0, 0, 0);
}
.hoverevent:not(.on-hover) {
  opacity: 0;
 }
 .hoverevent {
  opacity: 1;
 }

</style>