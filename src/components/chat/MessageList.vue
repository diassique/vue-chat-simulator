<template>
  <v-list dense>
    <message-item v-for="message in messages" :key="message.id" :message="message" />
  </v-list>
</template>

<script>
import MessageItem from './MessageItem.vue';

export default {
  name: 'MessageList',
  components: {
    MessageItem,
  },
  props: {
    messages: Array,
  },
};
</script>