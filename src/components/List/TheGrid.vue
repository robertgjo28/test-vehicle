<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-center" scope="col">#</th>
              <th scope="col">Vehilce Name</th>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Model</th>
              <th scope="col">Plates</th>
              <th class="text-center" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vehicle, index) in vehicles" :key="vehicle.plateNumber">
              <th class="text-center" scope="row">{{ index + 1 }}</th>
              <td class="text-capitalize">{{ vehicle.vehicleName }}</td>
              <td>{{ vehicle.vehicleType }}</td>
              <td>{{ vehicle.plateNumber }}</td>
              <td>{{ vehicle.model }}</td>
              <td class="text-center">
                <i
                  class="far fa-edit me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                ></i>
                <i class="far fa-trash-alt" @click.prevent="deleteItem"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <teleport to="body">
    <edit-modal></edit-modal>
  </teleport>
</template>

<script>
import vehiclesData from "@/includes/vehicles.json";
import EditModal from "../List/EditModal.vue";
export default {
  components: { EditModal },
  data() {
    return {
      vehicles: vehiclesData,
    };
  },

  methods: {
    deleteItem(index) {
      Object.entries(this.vehicles).splice(index, 1);
    },
  },
};
</script>

<style scoped>
.fa-edit {
  font-size: 1.2rem;
}

tr {
  border-color: #d1d1d1;
}

td {
  padding: 0.375rem;
}

.fa-edit:hover,
.fa-trash-alt:hover {
  font-weight: bold;
}

.fa-trash-alt {
  font-size: 1.2rem;
  color: rgba(251, 191, 36, 1);
}
</style>
