<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img contain :src="require(`@/assets/LogoImage.png`)" transition="scale-transition" width="350" />
        </router-link>

        <div class="menu-container" style="transform: none;">
          <v-menu v-for="button in buttons" :key="button.id" :open-on-hover="true" offset-y>
            <template v-slot:activator="{ on }">
              <router-link :to="button.link">
                <v-btn v-on="on">
                  <v-icon class="font" style="font-style: normal;">{{ button.text }}</v-icon>
                </v-btn>
              </router-link>
            </template>

            <v-card class="menu-card">
              <router-link v-for="(image, index) in button.images" :key="image.id" :to="image.link">
                <transition-group>
                  <v-img :src="require(`@/assets/${image.src}`)" :key="image.id" contain class="menu-image" :style="{
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: '2s'
                  }" />
                </transition-group>
              </router-link>
            </v-card>
          </v-menu>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-btn to="/account-regist-page" text>
        SIGNUP
        <v-icon>person_add_alt</v-icon>
      </v-btn>
      <v-btn to="/login-page" text>
        LOGIN
        <v-icon>login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<script>

export default {
  name: "App",
  data: () => ({
    buttons: [
      {
        id: 1,
        text: "NOTICE",
        link: "/",
        images: [
          { id: 1, src: "exampleImage.jpg", link: "/notice-page", },
          { id: 2, src: "exampleImage.jpg", link: "/imsi", },
          { id: 3, src: "exampleImage.jpg", link: "/way-to-come-page", },
        ],
      },
      {
        id: 2,
        text: "SHOP",
        link: "/",
        images: [
          { id: 4, src: "exampleImage.jpg", link: "/", },
          { id: 5, src: "exampleImage.jpg", link: "/", },
          { id: 6, src: "exampleImage.jpg", link: "/", },
        ],
      },
      {
        id: 3,
        text: "COMMUNITY",
        link: "/community-page"
      },
      {
        id: 4,
        text: "MYPAGE",
        link: "/check-password",
      },
    ],
  }),
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');

.font {
  /* font-family: 'Russo One', sans-serif; */
  font-family: 'Black Han Sans', sans-serif;
}

.menu-container {
  display: flex;
}

.menu-container>*:not(:last-child) {
  margin-right: 10px;
  margin-left: 20px;
}

.menu-image {
  margin: 8px;
  animation: fade-slide 5s;
  width: 80px;
  height: 50px;
}

.menu-card {
  background-color: black;
}

@keyframes fade-slide {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>