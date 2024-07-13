<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>My Vue App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer app>
      <span>&copy; 2024 My Vue App</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  setup() {

  }
};
</script>

<style>
/* Adaugă stiluri globale aici, dacă este necesar */
</style>