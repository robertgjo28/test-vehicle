<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-gray">
    <div class="container py-3">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="px-4 text-decoration-none text-nav-color"
              :to="{ name: 'Form' }"
              >Entry Form</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="text-decoration-none text-nav-color"
              :to="{ name: 'Vehicles' }"
              >Grid of Vehicles</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.bg-gray {
  background-color: #42505c;
}

.text-nav-color {
  color: #fff;
  font-size: 1.1rem;
}

.text-nav-color:hover {
  color: rgba(251, 191, 36, 1);
}

@media only screen and (max-width: 810px) {
  .text-nav-color {
    padding: 0 !important;
  }
  .nav-item {
    padding-top: 25px;
    padding-left: 15px;
  }
  .nav-item:nth-child(2) {
    padding-bottom: 20px;
  }
}
</style>
