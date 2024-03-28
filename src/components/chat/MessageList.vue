<template>
  <v-list dense>
    <message-item
      v-for="message in messages"
      :key="message.id"
      :message="message"
      :currentUser="currentUser"
      :currentChatUser="currentChatUser"
    />
  </v-list>
</template>

<script>
import MessageItem from './MessageItem.vue';
import { mapState } from 'vuex';

export default {
  components: {
    MessageItem,
  },
  props: {
    messages: Array,
  },
  computed: {
    ...mapState('user', ['currentUser']),
    ...mapState('chat', ['currentChatUser']),
  },
};
</script>