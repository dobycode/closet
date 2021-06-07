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
        CLOSET
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

    <v-list>
      <v-list-item @click="(type = 'Login'), (dialog = true)">
          <v-icon color="blue" class="mr-1">mdi-login-variant</v-icon>
          로그인
      </v-list-item>

      <v-list-item @click="(type = 'Join'), (dialog = true)">
          <v-icon color="green" class="mr-1">mdi-login-variant</v-icon>
          회원가입
      </v-list-item>
    </v-list>
  </v-menu>

  <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">
          {{ type }}
        </v-card-title>

        <v-card-text v-if="type === 'Login'">
          <v-text-field v-model="id" type="text" label="아이디" required></v-text-field>
          <v-text-field v-model="pw" type="password" label="비밀번호" required></v-text-field>
        </v-card-text>

        <v-card-text v-if="type === 'Join'">
          <v-text-field v-model="name" type="text" label="이름" required></v-text-field>
          <v-text-field v-model="id" type="text" label="아이디" required></v-text-field>
          <v-text-field v-model="pw" type="password" label="비밀번호" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            block
            color="#18A0FB"
            dark
            @click="submit(), (dialog = false)"
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

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
    dialog: false,
  }),
};
</script>


<style>
  * {
    text-decoration: none;
  }
</style>