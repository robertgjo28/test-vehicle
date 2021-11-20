<template>
  <Loading v-if="loading" />
  <div class="pb-5 mb-5">
    <div class="row mb-5 ps-3">
      <div class="col-6">
        <h1 class="headingForm">Input vehicle information</h1>
      </div>
    </div>
    <hr style="border: 1px dashed #d1d1d1" />
    <!-- FORM -->
    <form-validated></form-validated>
  </div>
</template>

// data-bs-toggle="modal" data-bs-target="#dataModal" //

<script>
import FormValidated from "./FormValidated.vue";

export default {
  components: {
    FormValidated,
  },
};
</script>

<style scoped>
.headingForm {
  color: #42505c;
  font-size: 54px;
  font-weight: bold;
}

.btn-submit {
  background-color: #42505c;
  color: #fff;
  padding: 14px 28px;
  border-radius: 2px;
  font-weight: bold;
}

.btn-submit:hover {
  background-color: rgba(251, 191, 36, 1);
  color: #fff;
}

.auto-div {
  position: absolute;
  z-index: 99;
  background-color: white;
  width: 21.45%;
}

input,
select {
  border: 1px solid #d1d1d1;
  height: 54px;
  border-radius: 2px;
}

input:focus,
select:focus {
  border: 1px solid rgba(251, 191, 36, 1);
  box-shadow: none;
}

input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #d1d1d1;
}

select:disabled {
  color: #d1d1d1;
}

span {
  color: #d1d1d1;
}

ul {
  list-style: none;
  padding: 0 0;
}

.auto-complete {
  border: solid #d1d1d1;
  border-width: 1px 1px 0 1px;
  padding: 0.6rem 0.75rem;
}
</style>
