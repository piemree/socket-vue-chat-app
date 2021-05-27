<template>
  <main
    v-if="conversation.recipients !== undefined"
    class="d-flex flex-column justify-content-end flex-grow-1 "
  >
    <section class="p-3    d-flex flex-column overflow-auto ">
      <div
        v-for="(item, idx) in conversation.messages"
        :key="idx"
        :id="item.id"
        :class="
          `justify-content-center align-self-${
            item.id == myid ? 'end' : 'start'
          } my-2 d-flex flex-column align-items-${
            item.id == myid ? 'end' : 'start'
          } `
        "
      >
        <p class="text-secondary m-0" style="font-size:12px">
          {{ item.id == myid ? "you" : item.name ? item.name : item.id }}
        </p>
        <p
          :class="
            `bg-${
              item.id == myid ? 'success' : 'secondary'
            } text-white rounded-3 m-0 p-0 py-1 px-2  `
          "
        >
          {{ item.text }}
        </p>
      </div>
      <span ref="scroll" id="star-here"></span>
    </section>
    <section class="bg-warning d-flex mt-3" style="min-height:3rem">
      <input v-model="text" class="m-0 flex-grow-1 rounded-0" type="text" />
      <button @click="sendMessage" class="btn btn-primary m-0">send</button>
    </section>
  </main>

  <div
    v-else
    class="h-100 w-100 d-flex justify-content-center align-items-center"
  >
    <h1>WELCOME TO LİTTLE CHAT APP</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.text === "") return;

      this.$store.dispatch("addMessageToConversation", {
        recipients: this.conversation.recipients,
        text: this.text,
      });

      this.text = "";
    },
    scrollToElement() {
    
      
      
        this.$refs.scroll.scrollIntoView({ behavior: "smooth" });
     
    },
  },
  computed: {
    conversation() {
      return this.$store.getters.GET_CURRENT_CONVERSATION;
    },
    myid() {
      return this.$store.getters.GET_ID;
    },
  },
  watch: {
    conversation() {
      setTimeout(() => {
        this.scrollToElement();
      }, 50);
    },
  },
};
</script>
