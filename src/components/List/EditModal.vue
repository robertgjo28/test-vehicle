<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="heading" id="editModalLabel">Edit Vehilce</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-5">
          <form>
            <div class="row">
              <label for="name" class="form-label">Vehilce Name: </label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                @input="vehicleName = $event.target.value"
                :value="vehicle.vehicleName"
                required
              />
              <label for="type" class="form-label">Vehilce Type</label>
              <input
                id="type"
                type="text"
                class="form-control mb-3"
                @input="vehicleType = $event.target.value"
                :value="vehicle.vehicleType"
                required
              />
              <label for="plateNumberMasked" class="form-label"
                >License Plate</label
              >
              <input
                id="plateNumberMasked"
                type="text"
                v-maska="'SS-XXXX-SS'"
                class="form-control text-uppercase mb-3"
                @input="plateNumber = $event.target.value"
                :value="vehicle.plateNumber"
                required
              />
              <label for="model" class="form-label">Model</label>
              <input
                id="model"
                type="text"
                class="form-control mb-4"
                @input="model = $event.target.value"
                :value="vehicle.model"
                required
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-closed"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                @click.prevent="editVehilce"
                class="btn btn-submit"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditModal",

  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      vehEdit: null,
      vehicleName: "",
      vehicleType: "",
      plateNumber: "",
      model: "",
    };
  },
  methods: {
    editVehilce() {
      this.vehEdit = {
        vehicleName: this.vehicleName,
        vehicleType: this.vehicleType,
        plateNumber: this.plateNumber,
        model: this.model,
      };

      console.log(this.vehEdit);
    },
  },
};
</script>

<style scoped>
.btn-submit {
  background-color: #42505c;
  color: #fff;
  padding: 14px 30px;
  border-radius: 2px;
  font-weight: bold;
}

.btn-submit:hover {
  background-color: rgba(66, 80, 92, 0.7);
  color: #fff;
}

.btn-closed {
  background-color: rgba(251, 191, 36, 1);
  color: #fff;
  padding: 14px 30px;
  border-radius: 2px;
  font-weight: bold;
}

.btn-closed {
  background-color: rgba(251, 191, 36, 0.8);
  color: #fff;
}
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
  font-size: 37px;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  font-weight: bold;
}
</style>
