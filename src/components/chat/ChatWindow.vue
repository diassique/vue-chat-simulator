<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="pa-2" height="500px" style="overflow-y: auto">
          <MessageList
            :messages="currentConversationMessages"
            :currentUser="currentUser"
            :currentChatUser="currentChatUser"
          />
        </v-card>
        <v-text-field
          class="mt-2"
          v-model="newMessage"
          append-icon="mdi-send"
          label="Напишите сообщение..."
          @click:append="send"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import MessageList from './MessageList.vue';

export default {
  components: {
    MessageList,
  },
  data() {
    return {
      newMessage: '',
    };
  },
  computed: {
    ...mapState('user', ['currentUser']),
    ...mapState('chat', ['currentChatUser']),
    ...mapGetters('chat', ['currentConversationMessages']),
  },
  methods: {
    ...mapActions('chat', ['sendMessage', 'loadMessages']),
    async send() {
      if (!this.newMessage.trim()) return;
      await this.sendMessage({
        text: this.newMessage,
        receiverId: this.currentChatUser,
      });
      this.newMessage = '';
    },
    // Uncomment to allow real-time chat simultaion
    // async fetchMessages() {
    //   await this.loadMessages();
    //   setTimeout(this.fetchMessages, 1000);
    // },
  },
  // mounted() {
  //   this.fetchMessages();
  // },
};
</script>