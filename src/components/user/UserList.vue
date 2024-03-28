<template>
  <v-list dense subheader class="overflow-y-auto" style="max-height: 500px;">
    <v-subheader>Пользователи</v-subheader>
    <!-- Loop through filtered users instead of all users -->
    <template v-for="user in filteredUsers">
      <v-list-item :key="user.id" @click="selectUser(user)" :class="{'active-user': user.id === currentChatUser}">
        <v-list-item-avatar color="grey lighten-1">
          <img :src="getAvatarPath(user.avatar)" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title :class="{'white--text': user.id === currentChatUser}" v-text="user.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider :key="`divider-${user.id}`"></v-divider>
    </template>
  </v-list>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'UserList',
  props: {
    users: Array,
  },
  computed: {
    ...mapState('user', ['currentUser']),
    ...mapState('chat', ['currentChatUser']),
    filteredUsers() {
      return this.users.filter(user => user.id !== this.currentUser?.id);
    },
  },
  methods: {
    selectUser(user) {
      this.$store.dispatch('chat/setCurrentChatUser', user.id);
    },
    getAvatarPath(avatar) {
      const imageName = avatar.replace('@/assets/images/', '');
      return `/assets/images/${imageName}`;
    },
  },
};
</script>

<style scoped>
.active-user {
  background-color: #1976D2;
  color: white;
}
.active-user .v-list-item__title {
  color: white;
}
</style>