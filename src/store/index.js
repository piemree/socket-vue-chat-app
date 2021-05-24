import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: JSON.parse(localStorage.getItem("contacts")) || [],
    conversations: JSON.parse(localStorage.getItem("conversations")) || [],
    currentConversation: {},
  },
  mutations: {
    ADD_CONTACT(state, contact) {
      state.contacts.push(contact);
    },
    ADD_CONVERSATION(state, conversation) {
      state.conversations.push(conversation);
    },
    SET_CURRENT_CONVERSATION(state, conversation) {
      Object.assign(state.currentConversation, conversation);
    },
  },

  getters: {
    GET_ALL_CONTACTS: (state) => {
      return state.contacts;
    },
    GET_ALL_CONVERSATIONS: (state) => {
      return state.conversations;
    },
    GET_CURRENT_CONVERSATION: (state) => {
      return state.currentConversation;
    },
  },

  actions: {
    newContact({ commit, state }, newContact) {
      localStorage.setItem(
        "contacts",
        JSON.stringify([...state.contacts, newContact])
      );
      commit("ADD_CONTACT", newContact);
    },

    newConversation({ commit, state }, conversation) {
      let recipients = conversation.map((rec) => {
        return rec.id;
      });

      const modifiedConversation = { conversation, recipients, messages: [] };

      localStorage.setItem(
        "conversations",
        JSON.stringify([...state.conversations, modifiedConversation])
      );

      commit("ADD_CONVERSATION", modifiedConversation);
    },
    currentConversation({ commit }, conversation) {
      commit("SET_CURRENT_CONVERSATION", conversation);
    },
  },
});
