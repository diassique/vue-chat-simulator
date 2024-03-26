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
              @change="login"
              prepend-icon="mdi-account-circle"
              v-model="selectedUser"
              :menu-props="{ maxHeight: '400' }"
            >
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-avatar>
                    <img :src="getAvatarPath(item.avatar)">
                  </v-list-item-avatar>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
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
      return `/images/${avatar}`;
    },
    async fetchUsers() {
      await this.$store.dispatch('user/fetchUsers');
      this.users = this.$store.state.user.users;
    },
    login() {
      if (this.selectedUser) {
        // Здесь может быть логика для установки выбранного пользователя
        // в качестве активного пользователя в вашем Vuex хранилище
        console.log("Вход выполнен пользователем:", this.selectedUser.name);
        // Переход на страницу чата
        this.$router.push({ name: 'chat' });
      }
    },
  },
};
</script>

<style>
</style>