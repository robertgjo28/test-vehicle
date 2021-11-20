<template>
  <div class="pb-5 mb-5">
    <div class="row mb-5 ps-3">
      <div class="col-6">
        <h1 class="headingForm">Input vehicle information</h1>
      </div>
    </div>
    <hr style="border: 1px dashed #d1d1d1" />
    <!-- FORM -->
    <form @submit.prevent="submitForm" ref="modelWrap" @click="checkClick">
      <div class="row mt-5 mb-5">
        <!-- Name -->
        <div class="col-md-6">
          <label for="vehicleName" class="form-label">Vehicle name</label>
          <input
            type="text"
            class="form-control"
            id="vehicleName"
            v-model.trim="vehicleName"
            placeholder="eg. Company car 22"
          />
        </div>
        <!-- Type -->
        <div class="col-md-6">
          <label for="vehicleType" class="form-label">Vehicle type</label>
          <select
            class="form-select"
            v-model="vehicleType"
            aria-label="Select your vehicle type"
          >
            <option value="" hidden disabled selected>
              Select your vehicle type
            </option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
            <option value="Container">Container</option>
            <option value="Trailer">Trailer</option>
            <option value="Dumper">Dumper</option>
          </select>
        </div>
        <!-- Model -->
        <div class="col-12">
          <div class="row">
            <div class="col-md-6 mt-4">
              <label for="vehicleModel" class="form-label"
                >Model <span>(optional)</span></label
              >
              <input
                type="text"
                autocomplete="off"
                class="form-control"
                v-model.trim="model"
                @focus="modal = true"
                placeholder="eg. Audi, BMW"
              />
              <div class="auto-div" v-if="filteredModels && modal">
                <ul>
                  <li
                    v-for="filteredModel in filteredModels"
                    @click="setModel(filteredModel)"
                    :key="filteredModel"
                    class="auto-complete border-bottom"
                    style="cursor: pointer"
                  >
                    {{ filteredModel }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Plates -->
        <div class="col-12">
          <div class="row">
            <div class="col-md-6 mt-4">
              <label for="plateNumber" class="form-label"
                >License plate
                <span>(X - alphabet character, N - number)</span></label
              >
              <div class="input-group">
                <input
                  type="text"
                  id="plateNumber"
                  class="form-control text-center text-uppercase"
                  v-model.trim="firstLicence"
                  placeholder="XX"
                  max="2"
                />
                <input
                  type="text"
                  v-model.number="numberLicence"
                  class="form-control text-center text-uppercase"
                  placeholder="NNNN"
                />
                <input
                  type="text"
                  v-model.trim="lastLicence"
                  class="form-control text-center text-uppercase"
                  placeholder="XX"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style="border: 1px dashed #d1d1d1" />
      <!-- Registration -->
      <div class="row mt-5 mb-5">
        <div class="col-md-6 pe-3">
          <label for="lastReg" class="form-label">Last registration date</label>
          <input
            type="date"
            :max="dateToYYYYMMDD(myDate)"
            @input="registrationDate = $event.target.valueAsDate"
            class="form-control"
            id="lastReg"
          />
        </div>
        <div class="col-md-6 pe-3">
          <label for="dateSub" class="form-label"
            >Date of registration submission</label
          >
          <input
            type="date"
            :value="dateToYYYYMMDD(myDate)"
            @input="registrationSubmission = $event.target.valueAsDate"
            :min="dateToYYYYMMDD(myDate)"
            class="form-control"
            id="dateSub"
          />
        </div>
      </div>
      <hr style="border: 1px dashed #d1d1d1" />
      <!-- Submit button -->
      <div class="text-end mt-4">
        <button :disabled="formValid" type="submit" class="btn btn-submit">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

// data-bs-toggle="modal" data-bs-target="#dataModal" //

<script>
import { uid } from "uid";

export default {
  data() {
    return {
      docId: uid(6),
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      loading: null,
      result: {},
      vehicleName: "",
      vehicleType: "",
      firstLicence: "",
      numberLicence: null,
      lastLicence: "",
      licenceNumber: "",
      registrationDate: "",
      registrationSubmission: new Date(),
      myDate: new Date(),
      formSubmited: false,
      model: "",
      modal: false,
      models: [
        "Alfa Romeo",
        "Audi",
        "Bentley",
        "BMW",
        "Citroën",
        "Fiat",
        "Ford",
        "Honda",
        "Hyundai",
        "Jaguar",
        "Jeep",
        "Opel",
        "Tesla",
        "Toyota",
        "Volkswagen",
      ],
      filteredModels: [],
      formValid: false,
    };
  },
  methods: {
    dateToYYYYMMDD(d) {
      return (
        d &&
        new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
          .toISOString()
          .split("T")[0]
      );
    },
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
