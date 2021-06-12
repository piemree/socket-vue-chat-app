<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  /* created() {
    this.$store.commit("SET_SOCKET", this.connect());
  },
  methods: {
    connect() {
      const newSocket = io("http://localhost:5000", { query: { id: this.id } });
      return newSocket;
    },
  },
  computed: {
    id() {
      return this.$store.getters.GET_ID;
    },
  },
  watch: {
    id() {
      this.$store.state.socket.close();
      this.$store.commit("SET_SOCKET", this.connect());
    },
  }, */
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
