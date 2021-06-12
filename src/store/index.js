import Vue from "vue";
import Vuex from "vuex";
import uuidv4 from "uuid/v4";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: JSON.parse(localStorage.getItem("contacts")) || [],
    conversations: JSON.parse(localStorage.getItem("conversations")) || [],
    currentConversation: {},
    id: uuidv4(),
    socket: null,
  },
  mutations: {
    ADD_CONTACT(state, contact) {
      state.contacts.push(contact);
    },
    ADD_CONVERSATION(state, conversation) {
      state.conversations.push(conversation);
    },
    SET_CURRENT_CONVERSATION(state, conversation) {
      state.currentConversation = { ...conversation };
    },

    ADD_MESSAGE_TO_CONVERSATION(state, { newMessage, idx }) {
      const current = state.conversations[idx];
      current.messages.push(newMessage);

      state.currentConversation = { ...current };
    },
    SET_SOCKET(state, socket) {
      state.socket = socket;
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
    GET_SOCKET(state) {
      return state.socket;
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

    newConversation({ commit, state }, {conversation,messages}) {
      let recipients = conversation.map((rec) => {
        return rec.id;
      });

      const modifiedConversation = { conversation, recipients, messages };

      localStorage.setItem(
        "conversations",
        JSON.stringify([...state.conversations, modifiedConversation])
      );

      commit("ADD_CONVERSATION", modifiedConversation);
    },
    currentConversation({ commit }, conversation) {
      commit("SET_CURRENT_CONVERSATION", conversation);
    },

    addMessageToConversation({ commit, state,dispatch }, { recipients, text ,sender}) {
    
      const newMessage = { id:sender, text };

      state.conversations.map((conversation, idx) => {
        if (areArraysEqual(conversation.recipients, recipients)) {
          commit("ADD_MESSAGE_TO_CONVERSATION", { newMessage, idx });
        }else{

          const newConversation=[];

          recipients.map((recipient) => {
              let conversation ={id:recipient,name:""};
              newConversation.push(conversation);
          })
              console.log(newConversation);
          dispatch.newConversation({conversation:newConversation,messages:[newMessage]})
        }
      });
    },
  },
});

function areArraysEqual(arr1, arr2) {
  console.log("here")
  if (arr1.length !== arr2.length) return false;

  return arr1.every((item1) => {
    return arr2.map((item2) => {
      return item1 === item2;
    });
  });
}
