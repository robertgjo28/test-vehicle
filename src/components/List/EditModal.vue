<template>
  <main>
    <div class="behind"></div>
    <div class="my-modal">
      <h3 class="heading mb-4">Edit informations</h3>
      <hr style="border: 1px dashed #d1d1d1" />
      <form class="mt-4">
        <div class="row">
          <label for="name" class="form-label">Vehilce Name: </label>
          <input
            id="name"
            type="text"
            class="form-control mb-3"
            v-model="editedVehicle.vehicleName"
            required
          />
          <label for="type" class="form-label">Vehilce Type</label>
          <input
            id="type"
            type="text"
            class="form-control mb-3"
            v-model="editedVehicle.vehicleType"
            required
          />
          <hr class="my-4" style="border: 1px dashed #d1d1d1" />
          <label for="plateNumberMasked" class="form-label"
            >License Plate</label
          >
          <input
            id="plateNumberMasked"
            type="text"
            v-maska="'SS-XXXX-SS'"
            class="form-control text-uppercase mb-3"
            v-model="editedVehicle.plateNumber"
            required
          />
          <label for="model" class="form-label">Model</label>
          <input
            id="model"
            type="text"
            class="form-control mb-4"
            v-model="editedVehicle.model"
            required
          />
        </div>
        <hr style="border: 1px dashed #d1d1d1" />
        <div class="modal-footer">
          <button type="button" class="btn btn-closed" @click.prevent="onClose">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </main>
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
  created() {
    this.editedVehicle = this.vehicle;
  },
  data() {
    return {
      editedVehicle: {
        vehicleName: "",
        vehicleType: "",
        plateNumber: "",
        model: "",
      },
    };
  },
  methods: {
    onClose() {
      this.$emit("modal-closed");
    },
    onSave() {
      this.$emit("vehicle-updated", {
        index: this.index,
        vehicle: this.editedVehicle,
      });
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

.my-modal {
  position: absolute;
  width: 70%;
  z-index: 99999;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 75px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease-in;
}

.behind {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}

.modal-footer {
  border-top: 0;
}

@media only screen and (max-width: 430px) {
  .my-modal {
    width: 100%;
    margin-top: 100px;
  }
  .behind {
    height: 1000px;
  }
}
</style>
