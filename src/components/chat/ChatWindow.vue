<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-2">
          <v-list dense>
            <!-- Сообщения -->
            <v-list-item v-for="message in messages" :key="message.id">
              <v-list-item-content>
                <v-list-item-title v-text="message.text"></v-list-item-title>
                <v-list-item-subtitle v-text="message.time"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <!-- Форма отправки -->
        <v-text-field
          v-model="newMessage"
          append-icon="mdi-send"
          label="Напишите сообщение..."
          @click:append="sendMessage"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ChatWindow',
  props: {
    messages: Array,
  },
  data() {
    return {
      newMessage: '',
    };
  },
  methods: {
    sendMessage() {
      this.$emit('sendMessage', this.newMessage);
      this.newMessage = '';
    },
  },
};
</script>