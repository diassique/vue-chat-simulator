import localforage from 'localforage';

const state = {
  users: []
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  }
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const users = await localforage.getItem('users');
      if (users) {
        commit('SET_USERS', users);
      } else {
        // Здесь можно добавить логику для инициализации пользователей,
        // если в localForage они не найдены. Например:
        const initialUsers = [
          { id: 1, name: "Пользователь 1", avatar: '1.jpg' },
          { id: 2, name: "Пользователь 2", avatar: '2.jpg' },
          { id: 3, name: "Пользователь 3", avatar: '3.jpg' },
          { id: 4, name: "Пользователь 4", avatar: '4.jpg' },
          { id: 5, name: "Пользователь 5", avatar: '5.jpg' },
          { id: 6, name: "Пользователь 6", avatar: '6.jpg' },
          { id: 7, name: "Пользователь 7", avatar: '7.jpg' },
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};