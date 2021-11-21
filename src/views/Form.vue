<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 offset-md-1 pt-5 mt-5 ps-5 media-left">
          <div class="container">
            <entry-form></entry-form>
          </div>
        </div>
        <div class="col-md-4 offset-md-1 background-env"></div>
      </div>
    </div>
  </main>
</template>

<script>
import EntryForm from "../components/Form/EntryForm.vue";
export default {
  components: { EntryForm },
};
</script>

<style scoped>
.background-env {
  position: fixed;
  height: 100vh;
  right: 0;
  background-image: url("../assets/right-pic.jpg");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
}

@media only screen and (max-width: 1025px) {
  .background-env {
    display: none;
  }
  .media-left {
    margin: 0;
    padding: 0 !important;
    padding-top: 2rem !important;
    width: 80%;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 420px) {
  .media-left {
    width: 95%;
  }
}
</style>
