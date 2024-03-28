<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-row class="chat-layout">
          <v-col cols="4" class="user-list">
            <div v-if="currentUser" class="greeting">
              Привет, {{ currentUser.name }}!
            </div>
            <UserList :users="users" />
            <v-btn color="red" outlined block class="mt-3 logout-button" @click="logout">
              Выход
            </v-btn>
          </v-col>
          <v-col cols="8" class="chat-window">
            <ChatWindow />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserList from '@/components/user/UserList.vue';
import ChatWindow from '@/components/chat/ChatWindow.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ChatView',
  components: {
    UserList,
    ChatWindow,
  },
  computed: {
    ...mapState('user', ['users', 'currentUser']),
  },
  methods: {
    ...mapActions('user', ['fetchUsers', 'logout']),
    ...mapActions('chat', ['loadMessages']),
    async initData() {
      await this.fetchUsers();
      await this.loadMessages();
    },
    logout() {
      this.$store.dispatch('user/logout');
      this.$router.push({ name: 'login' });
    },
  },
  async created() {
    await this.$store.dispatch('user/loadCurrentUser');
    if (!this.currentUser) {
      this.$router.push({ name: 'login' });
    } else {
      await this.initData();
    }
  },
};
</script>

<style scoped>
.chat-layout {
  display: flex;
  height: 500px;
}
.user-list {
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
}
.chat-window {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.logout-button {
  border-width: 2px !important;
}
.logout-button:hover {
  background-color: rgba(255, 0, 0, 0.1) !important;
}
</style>