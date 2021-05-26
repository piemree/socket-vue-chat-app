import Vue from "vue";
import Vuex from "vuex";
import { uuid } from "uuidv4";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: JSON.parse(localStorage.getItem("contacts")) || [],
    conversations: JSON.parse(localStorage.getItem("conversations")) || [],
    currentConversation: {},
    id: uuid(),
  },
  mutations: {
    ADD_CONTACT(state, contact) {
      state.contacts.push(contact);
    },
    ADD_CONVERSATION(state, conversation) {
      state.conversations.push(conversation);
    },
    SET_CURRENT_CONVERSATION(state, conversation) {
      //  Object.assign(state.currentConversation, conversation);
      state.currentConversation = { ...conversation };
    },

    ADD_MESSAGE_TO_CONVERSATION(state, { newMessage, idx }) {
      const current = state.conversations[idx];
      current.messages.push(newMessage);

      state.currentConversation = { ...current };
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
    GET_ID(state) {
      return state.id;
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

    addMessageToConversation({ commit, state }, { recipients, text }) {
      const newMessage = { id: state.id, text };

      state.conversations.map((conversation, idx) => {
        if (areArraysEqual(conversation.recipients, recipients)) {
          commit("ADD_MESSAGE_TO_CONVERSATION", { newMessage, idx });
        }
      });
    },
  },
});

function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((item1) => {
    return arr2.map((item2) => {
      return item1 === item2;
    });
  });
}
