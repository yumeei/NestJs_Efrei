<template>
  <nav>
    <ul class="navbar">
      <li>
        <router-link to="/" class="navbar-item">Home</router-link>
      </li>
      <li>
        <router-link to="/movies" class="navbar-item">Movies</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  list-style-type: none;
  background-color: rgb(0, 0, 57);
  display: flex;
  height: 50px;
  align-items: center;
}

.navbar-item {
  padding: 15px;
  text-decoration: none;
  color: white;
}

.navbar-item:hover {
  background-color: #575757;
}
</style>
