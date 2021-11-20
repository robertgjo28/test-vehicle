<template>
  <div class="text-center mt-5">
    <h1 class="heading">Vehicle List</h1>
  </div>
  <the-grid></the-grid>
</template>

<script>
import TheGrid from "@/components/List/TheGrid.vue";
export default {
  name: "Vehicle",

  components: {
    TheGrid,
  },
};
</script>

<style scoped>
input {
  border: 1px solid #d1d1d1;
  height: 54px;
  border-radius: 2px;
  position: relative;
}

input:focus {
  border: 1px solid rgba(251, 191, 36, 1);
  box-shadow: none;
}
.heading {
  color: #42505c;
  font-size: 54px;
  font-weight: bold;
}
</style>
