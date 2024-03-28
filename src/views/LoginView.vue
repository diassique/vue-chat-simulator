<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Вход в систему</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-select
              :items="users"
              item-text="name"
              item-value="id"
              label="Выберите пользователя"
              return-object
              prepend-icon="mdi-account-circle mdi-36px"
              v-model="selectedUser"
              :menu-props="{ maxHeight: '400' }"
            >
            <template v-slot:item="{ item, on }">
              <v-list-item :value="item" @click="on.click">
                <v-list-item-avatar class="mr-3">
                  <img :src="getAvatarPath(item.avatar)" class="avatar-image">
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            </v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="login">Войти</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      selectedUser: null,
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    getAvatarPath(avatar) {
      const imageName = avatar.replace('@/assets/images/', '');
      return `/assets/images/${imageName}`;
    },
    async fetchUsers() {
      await this.$store.dispatch('user/fetchUsers');
      this.users = this.$store.state.user.users;
    },
    async login() {
      if (this.selectedUser && this.selectedUser.id) {
        await this.$store.dispatch('user/setCurrentUser', this.selectedUser);
        await this.$store.dispatch('chat/loadMessages');
        this.$router.push({ name: 'chat' }).catch(err => console.error(err));
      }
    },
  },
};
</script>

<style scoped>
.avatar-image {
  border-radius: 50%;
  object-fit: cover;
  width: 40px;
  height: 40px;
}
</style>