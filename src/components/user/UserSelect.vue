<template>
  <v-autocomplete
    v-model="selectedUser"
    :items="users"
    item-text="name"
    item-value="id"
    label="Выберите пользователя"
    single-line
    clearable
    @change="selectUser"
  ></v-autocomplete>
</template>

<script>
export default {
  name: 'UserSelect',
  props: {
    users: Array,
  },
  data() {
    return {
      selectedUser: null,
    };
  },
  methods: {
    selectUser() {
      this.$emit('userSelected', this.selectedUser);
    },
  },
};
</script>
