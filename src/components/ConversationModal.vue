<template>
  <form @submit.prevent="createConversation">
    <div
      class="d-flex align-items-center "
      v-for="contact in contacts"
      :key="contact.id"
    >
      <input
        v-model="contact.select"
        class="mr-2"
        type="checkbox"
        :id="contact.id"
      />
      <p class="m-0 p-1" style="font-size:20px;">{{ contact.name }}</p>
    </div>
    <b-button type="submit" variant="success" class="mt-3"
      >Create Conversation</b-button
    >
  </form>
</template>

<script>
export default {

  methods: {
    createConversation() {
      const selected = this.contacts.filter((item) => {
        return item.select === true;
      });

      this.$store.dispatch("newConversation",selected)
    },
  },
  computed: {
    contacts() {
      return this.$store.getters.GET_ALL_CONTACTS;
    },
  },
  mounted() {
    this.contacts.map((item) => {
      item.select = false;
    });
  },
};
</script>
