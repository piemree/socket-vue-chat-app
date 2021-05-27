<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("Initializer");
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  max-height: 100vh;
}
</style>
