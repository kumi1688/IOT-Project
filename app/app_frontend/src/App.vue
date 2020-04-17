<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link @click="go('/hue')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>전구</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="go('/weather')">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>날씨</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>기기제어</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <!-- <light-container /> -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import LightContainer from "./components/LightContainer";

export default {
  name: "App",
  components: {
    // "light-container": LightContainer,
  },
  methods: {
    go(destination) {
      this.$router.push(destination);
    }
  },
  created() {},
  data: () => ({
    drawer: null
  })
};
</script>
