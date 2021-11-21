<template>
  <the-header></the-header>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
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

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}

.text-yellow {
  color: rgba(251, 191, 36, 1) !important;
}

.text-decoration-none {
  text-decoration: none;
}
</style>
