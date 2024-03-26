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
              <template v-slot:item="data">
                <v-list-item-content>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar">
                  </v-list-item-avatar>
                  <v-list-item-title v-text="data.item.name"></v-list-item-title>
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
  data() {
    return {
      selectedUser: null,
      users: [
        { id: 1, name: "Пользователь 1", avatar: require('@/assets/images/1.jpg') },
        { id: 2, name: "Пользователь 2", avatar: require('@/assets/images/2.jpg') },
        { id: 3, name: "Пользователь 3", avatar: require('@/assets/images/3.jpg') },
        { id: 4, name: "Пользователь 4", avatar: require('@/assets/images/4.jpg') },
        { id: 5, name: "Пользователь 5", avatar: require('@/assets/images/5.jpg') },
        { id: 6, name: "Пользователь 6", avatar: require('@/assets/images/6.jpg') },
        { id: 7, name: "Пользователь 7", avatar: require('@/assets/images/7.jpg') },
      ],
    };
  },
  methods: {
    login(user) {
      this.selectedUser = user;
      console.log("Вход выполнен пользователем:", this.selectedUser.name);
      // Здесь добавьте логику для перехода на другой экран или сохранения данных пользователя
    },
  },
};
</script>

<style>
/* Добавьте необходимые стили, если нужно */
</style>
