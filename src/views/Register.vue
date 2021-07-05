<template>
<div>
    <div class="register" v-if="this.$store.state.token != null">
        <!-- 정보 업로드 -------------------------------------------------------------------------------------->
        <v-form v-model="valid" id="clothesRegist">
         <v-container>

<!-- 이름 --------------------------------------------------------------------->
           <v-row>
             <v-col
               cols="14"
               md="2"
             >
               <v-text-field
                 v-model="name"
                 label="Name"
                 required
                 name="name"
               ></v-text-field>
             </v-col>


<!-- 종류 --------------------------------------------------------------------->
             <v-col
               cols="12"
               md="2"
             >
               <v-text-field
                 v-model="kind"
                 label="Kind"
                 required
                 name="kind"
               ></v-text-field>
             </v-col>


<!-- 재질 --------------------------------------------------------------------->
             <v-col
               cols="12"
               md="2"
             >
               <v-text-field
                 v-model="materials"
                 label="Materials"
                 required
                 name="materials"
               ></v-text-field>
             </v-col>


<!-- 사이즈 --------------------------------------------------------------------->
              <v-col
               cols="12"
               md="2"
             >
               <v-text-field
                 v-model="size"
                 label="Size"
                 required
                 name="size"
               ></v-text-field>
             </v-col>


<!-- 파일 업로드 폼 ------------------------------------------------------------->
              <v-col
                cols="12"
                md="2"
              >
                 <v-file-input
                   show-size
                   counter
                   multiple
                   label="File input"
                   name="img"
                 ></v-file-input>
              </v-col>


<!-- 저장 버튼 -------------------------------------------------------------------->              
              <v-col
               cols="12"
               md="2"
               align="center"
               justify="space-around"
               style="padding-top: 20px;"
             >
              <v-btn @click="clothesRegist()">
                save
              </v-btn>
            </v-col>

           </v-row>
         </v-container>
        </v-form>

    </div>

    <div v-if="this.$store.state.token == null">
      토큰 없음 
    </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Register',
    data: () => ({
    }),
    methods: {
      clothesRegist() {
        console.log("clothesRegist()...");
        const postData = new FormData(document.getElementById("clothesRegist"));

        var config = {
          method: 'post',
          url: 'http://ec2-3-139-102-177.us-east-2.compute.amazonaws.com:3000/api/upload/sendData',
          headers: { 
            'Authorization': this.$store.state.token, 
            'Content-Type': 'multipart/formdata'
          },
          data : postData
        };
        axios(config).then(res => {
          console.log(res);
        })
      }
    }
}
</script>