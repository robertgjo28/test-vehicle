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
          <h5 class="modal-title" id="editModalLabel">Edit Vehilce</h5>
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
                v-model="vehilceEdit.name"
                required
              />
              <label for="type" class="form-label">Vehilce Type</label>
              <input
                id="type"
                type="text"
                class="form-control mb-3"
                v-model="vehilceEdit.type"
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
                v-model="vehilceEdit.licensePlate"
                required
              />
              <label for="model" class="form-label">Model</label>
              <input
                id="model"
                type="text"
                class="form-control mb-4"
                v-model="vehilceEdit.model"
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
                :data-bs-dismiss="toggleModal"
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
  data() {
    return {
      vehilceEdit: {
        name: "",
        type: "",
        licensePlate: "",
        model: "",
      },
      toggleModal: false,
    };
  },

  methods: {
    editVehilce() {
      console.log(this.vehilceEdit);
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
  font-size: 54px;
  font-weight: bold;
}
</style>
