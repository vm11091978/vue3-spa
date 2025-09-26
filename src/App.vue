<script setup>
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <nav>
      <router-link to="/incomes">Incomes</router-link>
      <router-link to="/orders">Orders</router-link>
      <router-link to="/sales">Sales</router-link>
      <router-link to="/stocks">Stocks</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  margin-bottom: 1rem;
}

nav a {
  margin-right: 2rem;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>

