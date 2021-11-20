<template>
  <form @submit.prevent="submitForm" ref="modelWrap" @click="checkClick">
    <div class="mt-5 mb-5">
      <div class="row">
        <!-- NAME -->
        <div class="col-md-6">
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
                v-model.trim="state.firstLicense"
                @blur="v$.firstLicense.$touch"
                placeholder="XX"
                maxlength="2"
                :class="{
                  borderRed: v$.firstLicense.$error,
                  borderGreen:
                    !v$.firstLicense.$error && state.firstLicense != '',
                }"
                required
              />

              <input
                type="text"
                v-model.number="state.numberLicense"
                @blur="v$.numberLicense.$touch"
                class="form-control text-center text-uppercase"
                placeholder="NNNN"
                maxlength="4"
                :class="{
                  borderRed: v$.numberLicense.$error,
                  borderGreen:
                    !v$.numberLicense.$error && state.numberLicense != '',
                }"
                required
              />

              <input
                type="text"
                v-model.trim="state.lastLicense"
                @blur="v$.lastLicense.$touch"
                class="form-control text-center text-uppercase"
                placeholder="XX"
                maxlength="2"
                :class="{
                  borderRed: v$.lastLicense.$error,
                  borderGreen:
                    !v$.lastLicense.$error && state.lastLicense != '',
                }"
                required
              />
            </div>
            <i
              class="fas fa-check"
              v-if="!v$.firstLicense.$error && state.firstLicense != ''"
            ></i>
            <i
              class="fas fa-times"
              v-if="v$.firstLicense.$error && state.firstLicense === ''"
            ></i>
            <i
              class="fas fa-check"
              v-if="!v$.lastLicense.$error && state.lastLicense != ''"
            ></i>
            <i
              class="fas fa-times"
              v-if="v$.lastLicense.$error && state.lastLicense === ''"
            ></i>
            <i
              class="fas fa-check"
              v-if="!v$.numberLicense.$error && state.numberLicense != ''"
            ></i>
            <i
              class="fas fa-times"
              v-if="v$.numberLicense.$error && state.numberLicense === ''"
            ></i>
            <div class="first">
              <span class="text-danger" v-if="v$.firstLicense.$error">
                {{ v$.firstLicense.$errors[0].$message }}
              </span>
            </div>
            <div class="sec">
              <span class="text-danger" v-if="v$.numberLicense.$error">
                {{ v$.numberLicense.$errors[0].$message }}
              </span>
            </div>
            <div class="third">
              <span class="text-danger" v-if="v$.lastLicense.$error">
                {{ v$.lastLicense.$errors[0].$message }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- DATES -->
      <hr style="border: 1px dashed #d1d1d1" />
      <!-- Registration -->
      <div class="row mt-5 mb-5">
        <div class="col-md-6 pe-3">
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
          :disabled="!formIsValid"
          @click.prevent="submitForm"
          type="submit"
          class="btn btn-submit"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
  <Modal :results="result" />
</template>

// data-bs-toggle="modal" data-bs-target="#dataModal" //

<script>
import useValidate from "@vuelidate/core";
import {
  required,
  helpers,
  alpha,
  numeric,
  maxLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import Modal from "./Modal.vue";
import { uid } from "uid";

export default {
  name: "Form",

  setup() {
    const state = reactive({
      vehicleName: "",
      vehicleType: "",
      firstLicense: "",
      numberLicense: "",
      lastLicense: "",
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
        firstLicense: {
          required: helpers.withMessage(
            "Check that your License plate is filled out correctly.",
            required
          ),
          alpha: helpers.withMessage(
            "Check your input, first field must be only alphabethic characters.",
            alpha
          ),
          maxLength: maxLength(2),
        },
        numberLicense: {
          required: helpers.withMessage(
            "Check that your License plate is filled out correctly.",
            required
          ),
          numeric: helpers.withMessage(
            "Check your input, second field must be only numbers.",
            numeric
          ),
          maxLength: maxLength(4),
        },
        lastLicense: {
          required: helpers.withMessage(
            "Check that your License plate is filled out correctly.",
            required
          ),
          alpha: helpers.withMessage(
            "Check your input, third field must be only alphabethic characters.",
            alpha
          ),
          maxLength: maxLength(2),
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

    const v$ = useValidate(rules, state);

    return { state, v$ };
  },

  components: {
    Modal,
  },

  data() {
    return {
      docId: uid(6),
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      loading: null,
      result: {},
      formIsValid: null,
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
      myDate: new Date(),
    };
  },

  methods: {
    getFullPlateNumber() {
      return `${this.firstLicence}-${this.numberLicence}-${this.lastLicence}`;
    },

    getRegDate() {
      return new Date(this.registrationDate).toLocaleDateString(
        "en-us",
        this.dateOptions
      );
    },

    getRegSub() {
      return new Date(this.registrationSubmission).toLocaleDateString(
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
    checkClick(e) {
      if (e.target === this.$refs.modelWrap) {
        this.modal = false;
      }
    },

    submitForm() {
      this.clearForm();
    },

    dateToYYYYMMDD(d) {
      return (
        d &&
        new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
          .toISOString()
          .split("T")[0]
      );
    },

    clearForm() {
      this.state.vehicleName = "";
      this.state.vehicleType = "";
      this.state.firstLicence = "";
      this.state.numberLicence = null;
      this.state.lastLicence = "";
      this.state.licenceNumber = "";
      this.state.registrationDate = "";
      this.state.registrationSubmission = new Date();
    },
  },

  // watch: {
  //   formIsValid() {
  //     if (
  //       this.state.vehicleName === "" &&
  //       this.state.vehicleType === "" &&
  //       this.state.numberLicense === "" &&
  //       this.state.firstLicense === "" &&
  //       this.state.registrationDate === "" &&
  //       this.state.registrationSubmission === ""
  //     ) {
  //       this.formIsValid = false;
  //     } else {
  //       this.formIsValid = true;
  //     }
  //   },
  // },
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
  margin-top: -35px;
  position: relative;
  margin-right: 12px;
  color: green;
}
.fa-times {
  float: right;
  margin-top: -27px;
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
</style>
