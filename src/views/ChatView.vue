<template>
  <v-container fluid class="chat-container">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8" class="chat-card">
        <v-row class="chat-layout">
          <v-col cols="4" class="user-list">
            <div v-if="currentUser" class="greeting">
              <v-icon class="mr-2">mdi-account</v-icon>
              Привет, {{ currentUser.name }}!
            </div>
            <UserList :users="users" />
            <v-btn color="red" outlined block class="mt-3 logout-button" @click="logout">
              <v-icon left>mdi-logout</v-icon>
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
.chat-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.chat-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-layout {
  display: flex;
  height: 600px;
}

.user-list {
  background-color: #f9f9f9;
  padding: 15px;
  border-right: 1px solid #e0e0e0;
}

.chat-window {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.logout-button {
  border-width: 2px !important;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: rgba(255, 0, 0, 0.1) !important;
}

.greeting {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}
</style>