<template>
  <div style="height: 100vh;" class="home d-flex">
    <section id="side-bar" style="min-width:18rem" class="w-25 h-100">
      <SideBar />
    </section>
    <section id="chat" class="flex-grow-1 d-flex ">
      <Conversation />
    </section>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import Conversation from "../components/Conversation";
export default {
  name: "Home",
  components: {
    SideBar,
    Conversation,
  },
};
</script>
