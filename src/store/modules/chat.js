import localforage from 'localforage';

const state = {
  messages: {},
  currentChatUser: null,
  newMessage: null,
};

const mutations = {
  SET_CURRENT_CHAT_USER(state, userId) {
    state.currentChatUser = userId;
  },
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  },
  SET_NEW_MESSAGE(state, message) {
    state.newMessage = message;
  },
  CLEAR_NEW_MESSAGE(state) {
    state.newMessage = null;
  },
  ADD_MESSAGES(state, { conversationKey, messages }) {
    state.messages[conversationKey].push(...messages);
  },
};

const actions = {
  setCurrentChatUser({ commit }, userId) {
    commit('SET_CURRENT_CHAT_USER', userId);
  },
  async sendMessage({ commit, dispatch, rootState }, { text, receiverId }) {
    const senderId = rootState.user.currentUser.id;
    const timestamp = new Date().toISOString();
    const message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      senderId,
      receiverId,
      text,
      timestamp,
    };
    commit('SET_NEW_MESSAGE', message);
    dispatch('saveMessage', { message, senderId, receiverId });
    commit('CLEAR_NEW_MESSAGE');
  },
  saveMessage({ state }, { message, senderId, receiverId }) {
    const conversationKey1 = `${senderId}-${receiverId}`;
    const conversationKey2 = `${receiverId}-${senderId}`;
    if (!state.messages[conversationKey1]) {
      state.messages[conversationKey1] = [];
    }
    if (!state.messages[conversationKey2]) {
      state.messages[conversationKey2] = [];
    }
    state.messages[conversationKey1].push(message);
    state.messages[conversationKey2].push(message);
    localforage.setItem('messages', state.messages);
  },
  async loadMessages({ commit }) {
    try {
      const messages = await localforage.getItem('messages') || {};
      commit('SET_MESSAGES', messages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  },
};

const getters = {
  currentConversationMessages: (state, getters, rootState) => {
    const currentUser = rootState.user.currentUser;
    const currentChatUser = state.currentChatUser;
    if (!currentUser || !currentChatUser) {
        return [];
    }
    const conversationKey1 = `${currentUser.id}-${currentChatUser}`;
    const conversationKey2 = `${currentChatUser}-${currentUser.id}`;
    let messages = [...(state.messages[conversationKey1] || []), ...(state.messages[conversationKey2] || [])];

    messages = messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const seen = new Map();
    messages = messages.filter(message => {
        return !seen.has(message.id) && seen.set(message.id, true);
    });

    if (state.newMessage && state.newMessage.senderId === currentUser.id && state.newMessage.receiverId === currentChatUser) {
        if (!seen.has(state.newMessage.id)) {
            messages.push(state.newMessage);
        }
    }
    return messages;
},
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
