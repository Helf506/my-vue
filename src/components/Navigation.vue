<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <span class="title">Image Segmentation Tool</span>
    </div>
    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/upload">Upload Image</router-link></li>
      <li><router-link to="/results">View Results</router-link></li>
      <li><router-link to="/settings">Settings</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #333, #555);
  color: white;
  padding: 0 30px;
  height: 70px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.title {
  font-size: 24px;
  font-weight: 600;
}

.nav-links {
  list-style: none;
  display: flex;
}

.nav-links li {
  margin: 0 15px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #42b983;
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}
</style>