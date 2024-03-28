import localforage from 'localforage';

const state = {
  users: [],
  currentUser: null,
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const users = await localforage.getItem('users');
      if (users) {
        commit('SET_USERS', users);
      } else {
        const initialUsers = [
          { id: 1, name: "Aibar Muratov", avatar: '1.jpg' },
          { id: 2, name: "Nurlan Kazybekov", avatar: '2.jpg' },
          { id: 3, name: "Alexander Orlov", avatar: '3.jpg' },
          { id: 4, name: "Katerine Pavlova", avatar: '4.jpg' },
          { id: 5, name: "Aizhan Zhunusova", avatar: '5.jpg' },
          { id: 6, name: "Bauyrzhan Bekmukhanbetov", avatar: '6.jpg' },
          { id: 7, name: "Gulnaz Sadykova", avatar: '7.jpg' },
        ];
        await localforage.setItem('users', initialUsers);
        commit('SET_USERS', initialUsers);
      }
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  },
  async addUser({ commit, state }, user) {
    const updatedUsers = [...state.users, user];
    await localforage.setItem('users', updatedUsers);
    commit('SET_USERS', updatedUsers);
  },
  // upd
  loadCurrentUser({ commit }) {
    return new Promise((resolve) => {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if (currentUser) {
        commit('SET_CURRENT_USER', currentUser);
      }
      resolve();
    });
  },
  // upd
  setCurrentUser({ commit }, user) {
    commit('SET_CURRENT_USER', user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  },
  logout({ commit }) {
    commit('SET_CURRENT_USER', null);
    sessionStorage.removeItem('currentUser');
  },
};

const getters = {
  currentUser: state => state.currentUser,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};