import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(IconsPlugin);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

const newSocket = io("http://localhost:5000", {
  query: { id: store.state.id },
});
store.commit("SET_SOCKET", newSocket);
store.state.socket.on("receive-message", ({ recipients, sender, text }) => {
  store.dispatch("addMessageToConversation", { recipients, text, sender });
  
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
