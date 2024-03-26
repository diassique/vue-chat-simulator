<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ message.text }}</v-list-item-title>
      <v-list-item-subtitle>{{ message.time }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'MessageItem',
  props: {
    message: Object,
  },
};
</script>
