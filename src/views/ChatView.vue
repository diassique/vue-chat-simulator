<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <UserSelect :users="users" @userSelected="onUserSelected" />
        <UserList :users="users" @userSelected="onUserSelected" />
      </v-col>
      <v-col cols="9">
        <ChatWindow :messages="messages" @sendMessage="onSendMessage" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserList from '@/components/user/UserList.vue';
import UserSelect from '@/components/user/UserSelect.vue';
import ChatWindow from '@/components/chat/ChatWindow.vue';

export default {
  components: {
    UserList,
    UserSelect,
    ChatWindow
  },
  data() {
    return {
      users: [
        // Здесь будут данные пользователей
      ],
      messages: [
        // Здесь будут данные сообщений
      ],
    };
  },
  methods: {
    onUserSelected(user) {
      // Обработка выбора пользователя
    },
    onSendMessage(message) {
      // Обработка отправки сообщения
    },
  },
};
</script>

<style>
/* Стилизация */
</style>
