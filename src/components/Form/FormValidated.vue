<template>
  <form @submit.prevent="submitForm" ref="modelWrap" @click="checkClick">
    <div class="mt-5 mb-5">
      <div class="row">
        <!-- NAME -->
        <div class="col-md-6 margin-bottom-enough">
          <label for="vehicleName" class="form-label">Vehicle name</label>
          <input
            type="text"
            class="form-control"
            id="vehicleName"
            v-model.trim="state.vehicleName"
            @blur="v$.vehicleName.$touch"
            placeholder="eg. Company car 22"
            :class="{
              borderRed: v$.vehicleName.$error,
              borderGreen: !v$.vehicleName.$error && state.vehicleName != '',
            }"
            required
          />
          <i
            class="fas fa-check"
            v-if="!v$.vehicleName.$error && state.vehicleName != ''"
          ></i>
          <i
            class="fas fa-times"
            v-if="v$.vehicleName.$error && state.vehicleName === ''"
          ></i>

          <span class="text-danger" v-if="v$.vehicleName.$error">
            {{ v$.vehicleName.$errors[0].$message }}
          </span>
        </div>
        <!-- TYPE -->
        <div class="col-md-6">
          <label for="vehicleType" class="form-label">Vehicle type</label>
          <select
            class="form-select"
            v-model="state.vehicleType"
            @blur="v$.vehicleType.$touch"
            aria-label="Select your vehicle type"
            :class="{
              borderRed: v$.vehicleType.$error,
              borderGreen: !v$.vehicleType.$error && state.vehicleType != '',
            }"
            required
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
          <span class="text-danger" v-if="v$.vehicleType.$error">
            {{ v$.vehicleType.$errors[0].$message }}
          </span>
        </div>
      </div>
      <!-- MODEL -->
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
              :class="{
                borderGreen: model != '',
              }"
            />
            <i class="fas fa-check" v-if="model != ''"></i>
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
      <!-- PLATES -->
      <div class="col-12">
        <div class="row">
          <div class="col-md-6 mt-4 margin-bottom-enough">
            <label for="plateNumberMasked" class="form-label"
              >License Plate</label
            >
            <input
              id="plateNumberMasked"
              type="text"
              class="form-control text-uppercase"
              v-maska="'SS-XXXX-SS'"
              placeholder="XX-NNNN-XX"
              @blur="v$.licensePlate.$touch"
              v-model="state.licensePlate"
              :class="{
                borderRed: v$.licensePlate.$error,
                borderGreen:
                  !v$.licensePlate.$error && state.licensePlate != '',
              }"
            />

            <i
              class="fas fa-times"
              v-if="v$.licensePlate.$error && state.licensePlate === ''"
            ></i>
            <i
              class="fas fa-check"
              v-if="!v$.licensePlate.$error && state.licensePlate != ''"
            ></i>

            <span class="text-danger" v-if="v$.licensePlate.$error">
              {{ v$.licensePlate.$errors[0].$message }}
            </span>
          </div>
        </div>
      </div>
      <!-- DATES -->
      <hr style="border: 1px dashed #d1d1d1" />
      <!-- Registration -->
      <div class="row mt-5 mb-5">
        <div class="col-md-6 pe-3 margin-bottom-enough">
          <label for="lastReg" class="form-label">Last registration date</label>
          <input
            type="date"
            :max="dateToYYYYMMDD(myDate)"
            @input="state.registrationDate = $event.target.valueAsDate"
            class="form-control"
            @blur="v$.registrationDate.$touch"
            id="lastReg"
            :class="{
              borderRed: v$.registrationDate.$error,
              borderGreen:
                !v$.registrationDate.$error && state.registrationDate != '',
            }"
            required
          />
          <i
            class="fas fa-check check-calendar"
            v-if="!v$.registrationDate.$error && state.registrationDate != ''"
          ></i>
          <i
            class="fas fa-times check-calendar"
            v-if="v$.registrationDate.$error && state.registrationDate === ''"
          ></i>
          <span class="text-danger" v-if="v$.registrationDate.$error">
            {{ v$.registrationDate.$errors[0].$message }}
          </span>
        </div>
        <div class="col-md-6 pe-3">
          <label for="dateSub" class="form-label"
            >Date of registration submission</label
          >
          <input
            type="date"
            :value="dateToYYYYMMDD(myDate)"
            @blur="v$.registrationSubmission.$touch"
            @input="state.registrationSubmission = $event.target.valueAsDate"
            :min="dateToYYYYMMDD(myDate)"
            class="form-control"
            id="dateSub"
            :class="{
              borderRed: v$.registrationSubmission.$error,
              borderGreen:
                !v$.registrationSubmission.$error &&
                state.registrationSubmission != '',
            }"
            required
          />
          <i
            class="fas fa-check check-calendar"
            v-if="
              !v$.registrationSubmission.$error &&
              state.registrationSubmission != ''
            "
          ></i>
          <i
            class="fas fa-times check-calendar"
            v-if="
              v$.registrationSubmission.$error &&
              state.registrationSubmission === ''
            "
          ></i>
          <span class="text-danger" v-if="v$.registrationSubmission.$error">
            {{ v$.registrationSubmission.$errors[0].$message }}
          </span>
        </div>
      </div>
      <hr style="border: 1px dashed #d1d1d1" />
      <!-- Submit button -->
      <div class="text-end mt-4">
        <button
          :disabled="!isFormValid"
          type="submit"
          class="btn btn-submit"
          data-bs-toggle="modal"
          data-bs-target="#dataModal"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
  <teleport to="body">
    <Modal :results="result" />
  </teleport>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, helpers, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Modal from "./Modal.vue";
import { uid } from "uid";

export default {
  name: "Form",

  components: {
    Modal,
  },

  setup() {
    const state = reactive({
      vehicleName: "",
      vehicleType: "",
      licensePlate: "",
      registrationDate: "",
      registrationSubmission: new Date(),
    });

    const rules = computed(() => {
      return {
        vehicleName: {
          required: helpers.withMessage(
            "Check that your Vehicle name is filled out correctly.",
            required
          ),
          maxLength: helpers.withMessage(
            "Your Vehicle name should be less than 50 characters.",
            maxLength(50)
          ),
        },
        vehicleType: {
          required: helpers.withMessage(
            "Check that your Vehicle type is selected correctly.",
            required
          ),
        },
        licensePlate: {
          required: helpers.withMessage(
            "Check that your License plate is filled out correctly.",
            required
          ),
          maxLength: helpers.withMessage(
            "The license plate should be like this : XX-NNNN-XX",
            maxLength(10)
          ),
        },
        registrationDate: {
          required: helpers.withMessage(
            "Check that your Laste registration date is filled out correctly.",
            required
          ),
        },
        registrationSubmission: {
          required: helpers.withMessage(
            "Check that your Date of registration submission is filled out correctly.",
            required
          ),
        },
      };
    });
    let isFormValid = computed(() => {
      return (
        state.vehicleName &&
        state.vehicleType &&
        state.licensePlate &&
        state.registrationDate &&
        state.registrationSubmission
      );
    });

    const v$ = useValidate(rules, state);

    return { state, v$, isFormValid };
  },

  data() {
    return {
      docId: uid(6),
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      model: "",
      result: {},
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
      myDate: new Date(),
    };
  },

  methods: {
    getFullPlateNumber() {
      return `${this.firstLicence}-${this.numberLicence}-${this.lastLicence}`;
    },

    getRegDate() {
      return new Date(this.state.registrationDate).toLocaleDateString(
        "en-us",
        this.dateOptions
      );
    },

    getRegSub() {
      return new Date(this.state.registrationSubmission).toLocaleDateString(
        "en-us",
        this.dateOptions
      );
    },

    filterModels() {
      if (this.model.length == 0) {
        this.filteredModels = this.models;
      }
      this.filteredModels = this.models.filter((model) => {
        return model.toLowerCase().startsWith(this.model.toLowerCase());
      });
    },
    setModel(model) {
      this.model = model;
      this.modal = false;
    },

    submitForm() {
      this.result = {};

      this.result = {
        id: this.docId,
        vehicleName: this.state.vehicleName,
        vehicleType: this.state.vehicleType,
        vehicleModel: this.model,
        licensePlate: this.state.licensePlate,
        registrationDate: this.getRegDate(),
        registrationSubmission: this.getRegSub(),
      };
    },

    closeClick(e) {
      if (e.target === this.$refs.modelWrap) {
        this.modal = false;
      }
    },

    dateToYYYYMMDD(d) {
      return (
        d &&
        new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
          .toISOString()
          .split("T")[0]
      );
    },
  },

  watch: {
    model() {
      this.filterModels();
    },
  },
};
</script>

<style scoped>
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
  position: relative;
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
.fa-check {
  float: right;
  margin-top: -34px;
  position: relative;
  margin-right: 12px;
  color: green;
}
.fa-times {
  float: right;
  margin-top: -34px;
  position: relative;
  margin-right: 12px;
  color: red;
}

.check-calendar {
  margin-right: 40px !important;
}

.text-green {
  color: green;
}

.borderRed {
  border-color: red;
}

.borderGreen {
  border-color: green;
}

@media only screen and (max-width: 420px) {
  .margin-bottom-enough {
    margin-bottom: 1.5rem;
  }
  .auto-complete {
    width: 283.3px;
    background-color: #fff;
  }
}
@media only screen and (max-width: 375px) {
  .auto-complete {
    width: 308.4px;
    background-color: #fff;
  }
}
</style>
