<template>
  <v-list dense>
    <v-list-item v-for="user in users" :key="user.id" @click="selectUser(user)" class="user-item">
      <v-list-item-avatar>
        <img :src="user.avatar">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="user.name"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    selectUser(user) {
      this.$emit('userSelected', user);
    },
  },
};
</script>

<style>
.user-item {
  cursor: pointer;
}
</style>
