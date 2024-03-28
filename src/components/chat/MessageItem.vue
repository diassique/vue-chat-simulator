<template>
  <div :class="`message ${isSentByMe ? 'message-me' : 'message-them'}`">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="message-text">{{ message.text }}</v-list-item-title>
        <v-list-item-subtitle>{{ formattedTime }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'MessageItem',
  props: {
    message: Object,
    currentUser: Object,
    currentChatUser: Number,
  },
  computed: {
    formattedTime() {
      const date = new Date(this.message.timestamp);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    isSentByMe() {
      return this.message.senderId === this.currentUser.id;
    },
  },
};
</script>

<style scoped>
.message {
  display: table;
  max-width: 70%;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 16px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}

.message-text {
  word-break: break-word;
  white-space: pre-wrap;
}

.message-me {
  background-color: #3585e8;
  color: white;
  margin-left: auto;
  border-bottom-right-radius: 4px;
}

.message-them {
  background-color: #a0a0a0;
  color: white;
  margin-right: auto;
  border-bottom-left-radius: 4px;
}
</style>