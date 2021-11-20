<template>
  <nav class="navbar navbar-expand-lg navbar-light py-4 bg-gray">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
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
</style>
