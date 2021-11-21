<template>
  <div class="container mt-5">
    <!-- Filters -->
    <div class="row mb-4">
      <div class="col-6">
        <p class="lead">
          Type any keyword to Research data in the table below:
        </p>
        <input
          class="form-control"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
        />
      </div>
    </div>
    <!-- Table -->
    <div class="row">
      <div class="col-12">
        <table
          class="table table-bordered table-responsive"
          v-if="vehicles.length"
        >
          <thead>
            <tr>
              <th class="text-center" scope="col">#</th>
              <th scope="col">Vehilce Name</th>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Plates</th>
              <th class="display-hidden" scope="col">Model</th>
              <th class="text-center" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(vehicle, index) in resultQuery"
              :key="vehicle.plateNumber"
              :vehicle-edit="vehicle"
            >
              <th class="text-center" scope="row">{{ index + 1 }}</th>
              <td class="text-capitalize">{{ vehicle.vehicleName }}</td>
              <td>{{ vehicle.vehicleType }}</td>
              <td>{{ vehicle.plateNumber }}</td>
              <td class="display-hidden">{{ vehicle.model }}</td>
              <td class="text-center">
                <i
                  class="far fa-edit me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  @click.prevent="onEdit(index)"
                ></i>
                <i
                  class="far fa-trash-alt"
                  @click.prevent="deleteItem(index)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="display-show">Models are hidden, they are not required.</div>
  </div>

  <teleport to="body">
    <edit-modal :vehicle="currentItem"></edit-modal>
  </teleport>
</template>

<script>
import vehiclesData from "@/includes/vehicles.json";
import EditModal from "../List/EditModal.vue";
export default {
  components: { EditModal },
  emits: ["vehicle-edit"],
  data() {
    return {
      vehicles: vehiclesData,
      currentItem: {},
      searchQuery: null,
    };
  },

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.vehicles.filter((vehicle) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                vehicle.vehicleName.toLowerCase().includes(v) ||
                vehicle.vehicleType.toLowerCase().includes(v) ||
                vehicle.plateNumber.toLowerCase().includes(v) ||
                vehicle.model.toLowerCase().includes(v)
            );
        });
      } else {
        return this.vehicles;
      }
    },
  },

  methods: {
    deleteItem(index) {
      if (!Array.isArray(this.vehicles) || 0 === this.vehicles.length) {
        return;
      }
      this.vehicles.splice(index, 1);
    },

    onEdit(index) {
      if (this.vehicles.length < index) {
        return;
      }

      this.currentItem = this.vehicles[index];
    },
  },
};
</script>

<style scoped>
.fa-edit {
  font-size: 1.2rem;
}

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

tr {
  border-color: #d1d1d1;
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
.display-show {
  display: none;
}

@media only screen and (max-width: 420px) {
  .display-hidden {
    display: none;
  }

  .display-show {
    display: block;
    color: #d1d1d1;
    font-style: italic;
  }
}
</style>
