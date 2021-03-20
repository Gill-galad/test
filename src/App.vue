<template>
  <v-app>
    <v-app-bar
      app
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-4"
    >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-footer dark padless>
      <v-row>
      <v-col cols=12>
      <v-card flat tile class="indigo lighten-1 white--text text-center w-100">
        <v-card-text class="white--text w-100">
          A.Pydorenko - <a href="https://github.com/Gill-galad" class="white--text">GitHub</a>
        </v-card-text>
      </v-card>
      </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
