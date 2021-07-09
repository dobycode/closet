<template>
  <v-app>
    <div>
    <v-app-bar
      color="#18A0FB"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-btn 
        text 
        @click="$router.push({path: '/'})"
        text-color="white"
      >
        CLOSET KEEPER
      </v-btn>
        
      <v-spacer />
      <v-spacer />

<!-- 관리 -->
    <v-btn icon>
        <v-icon @click="$router.push({path: '/manage'})">mdi-clipboard-minus</v-icon>
      </v-btn>

<!-- 측정 -->
     <v-btn icon>
        <v-icon @click="$router.push({path: '/measure'})">mdi-gauge-empty</v-icon>
      </v-btn>
<!-- 등록 -->
    <v-btn icon>
        <v-icon @click="$router.push({path: '/register'})">mdi-hanger</v-icon>
      </v-btn>

<!-- 회원가입 / 로그인 -->
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <v-icon class="mr-1">mdi-account-circle</v-icon>
      </v-btn>
    </template>

    <v-list v-if="this.$store.state.token == null">
      <v-list-item @click="(type = 'login'), (dialog = true)">
          <v-icon color="blue" class="mr-1">mdi-login-variant</v-icon>
          로그인
      </v-list-item>

      <v-list-item @click="(type = 'register'), (dialog = true)">
          <v-icon color="green" class="mr-1">mdi-login-variant</v-icon>
          회원가입
      </v-list-item>
    </v-list>

    <v-list v-if="this.$store.state.token != null">

      <v-list-item @click="logout()">
          <v-icon color="green" class="mr-1">mdi-login-variant</v-icon>
          로그아웃
      </v-list-item>
    </v-list> 
  </v-menu>

  <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">
          login
        </v-card-title>

        <v-card-text  v-if="type === 'login'">
          <v-form id="loginForm">
            <v-text-field v-model="id" type="text" label="아이디" name="email" required></v-text-field>
            <v-text-field v-model="pw" type="password" label="비밀번호" name="password" required></v-text-field>
          </v-form>
        </v-card-text>

         <v-card-text v-if="type === 'register'">
          <v-form id="registForm">
            <v-text-field v-model="name" type="text" label="이름" name="name" required></v-text-field>
            <v-text-field v-model="id" type="text" label="아이디" name="email" required></v-text-field>
            <v-text-field v-model="pw" type="password" label="비밀번호" name="password" required></v-text-field>
          </v-form> 
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            color="#18A0FB"
            dark
            @click="save(type)"
          >
            {{ type }}
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>


    </v-app-bar>


<!-- nav bar -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
        
          <router-link to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title> 홈</v-list-item-title>
            </v-list-item>
          </router-link>

            <router-link to="/register">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-hanger</v-icon>
              </v-list-item-icon>
              <v-list-item-title>옷 등록하기</v-list-item-title>
            </v-list-item>
          </router-link>
          
          <router-link to="/measure">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-gauge-empty</v-icon>
              </v-list-item-icon>
              <v-list-item-title>온습도 측정</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/manage">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-clipboard-minus</v-icon>
              </v-list-item-icon>
              <v-list-item-title>옷 관리하기</v-list-item-title>
            </v-list-item>
          </router-link>
       

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


  <v-main>
    <router-view />
  </v-main>

</div>
  </v-app>
</template>

<script>

import axios from "axios";
export default {

  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
    dialog: false,
  }),
  methods: {
    save(kind) {
      console.log("save..");
      if(kind === "login") {
        this.dialog = false;
        this.login();
      }
      else if (kind === "register") {
        this.dialog = false;
        this.register();
      }
    },
    login() {
      console.log("login()..");
      const postData = new FormData(document.getElementById("loginForm"));

      axios
      .post(`http://ec2-3-139-102-177.us-east-2.compute.amazonaws.com:3000/api/users/login/`, postData)
      .then((res) => {
        console.log(res.data.token);
        this.$store.state.token = res.data.token;
        console.log(this.$store.state.token);
      })
    },
    register() {
      console.log("register()..");
      const postData = new FormData(document.getElementById("registForm"));

      axios
      .post(`http://ec2-3-139-102-177.us-east-2.compute.amazonaws.com:3000/api/users/signup/`, postData)
      .then((res) => {
        console.log(res.data.token);
        this.$store.state.token = res.data.token;
        console.log(this.$store.state.token);
      })
    },
    logout() {
      console.log("logout()..");
      this.$store.state.token = null;
      
    }
  },
};
</script>


<style>
  * {
    text-decoration: none;
  }
</style>