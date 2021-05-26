<template>
  <div>
    <b-card
      no-body
      class="w-100  justify-content-between"
      style=" height:100vh"
    >
      <b-tabs v-model="tabIndex" card>
        <b-tab title="Conversations" active>
          <b-list-group class="border-0">
            <b-list-group-item
              v-for="(conversation, idx) in conversations"
              :key="idx"
              button
              :class="activeIndex == idx ? 'active' : ''"
              @click="active(idx, conversation)"
            >
              {{ displayNames(conversation) }}</b-list-group-item
            >
          </b-list-group>
        </b-tab>
        <b-tab class="px-0" title="Contacts">
          <b-list-group class="border-0">
            <b-list-group-item
              v-for="contact in contacts"
              :key="contact.id"
              button
              class="rounded-0"
            >
              {{ contact.name }}</b-list-group-item
            >
          </b-list-group>
        </b-tab>
      </b-tabs>
      <div>
        <div id="test" class="border p-2" style="min-height:3rem">
          <p><b>ID:</b> {{ id }}</p>
        </div>
        <b-button
          @click="showModel = true"
          variant="primary"
          class="btn btn-primary w-100 rounded-0"
        >
          New {{ tabIndex == 0 ? "Conversation" : "Contact" }}
        </b-button>
      </div>
    </b-card>

    <b-modal v-model="showModel" hide-footer>
      <template #modal-header="{close}">
        <h5>New {{ tabIndex == 0 ? "Conversation" : "Contact" }}</h5>
        <b-button size="sm" variant="outline-danger" @click="close()">
          Close
        </b-button>
      </template>
      <ConversationModal v-if="tabIndex == 0" />
      <ContactModal v-else />
    </b-modal>
  </div>
</template>

<script>
import ContactModal from "./ContactModal";
import ConversationModal from "./ConversationModal";
export default {
  components: {
    ContactModal,
    ConversationModal,
  },
  data() {
    return {

      tabIndex: 1,
      showModel: false,
      activeIndex: 0,
    };
  },
  computed: {
    contacts() {
      return this.$store.getters.GET_ALL_CONTACTS;
    },
    conversations() {
      return this.$store.getters.GET_ALL_CONVERSATIONS;
    },
    id(){
      return this.$store.getters.GET_ID
    }
  },
  methods: {
    displayNames(c) {
      return c.conversation
        .map((con) => {
          return con.name;
        })
        .join(", ");
    },
    active(e, conversation) {
      this.activeIndex = e;
      this.$store.dispatch("currentConversation", conversation);
    },
  },
};
</script>

<style>
#test {
  background-color: rgb(242, 242, 242);
  font-size: 13px;
}
</style>
