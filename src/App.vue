<template>
  <the-header></the-header>
  <router-view />
</template>

<script>
import TheHeader from "./components/Global/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

.text-yellow {
  color: rgba(251, 191, 36, 1) !important;
}

.text-decoration-none {
  text-decoration: none;
}
</style>
