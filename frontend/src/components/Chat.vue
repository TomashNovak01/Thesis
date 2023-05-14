<template>
  <div>
    <icon width="25" icon="mdi:message-bookmark" color="orange" @click="chatDialog = true" />
    <v-dialog v-model="chatDialog" width="1000"  class="dialog">
      <v-card style="padding: 20px">
        <v-card-title>
          Чат полевого акта №{{ data.research_id }}
        </v-card-title>
        <v-card-text>
          <div class="messages">
            <table>
              <colgroup>
                <col style="width: 15%; background: red;"/>
                <col />
                <col style="width: 15%; background: green;"/>
              </colgroup>
              <tbody>
                <tr>
                  <td/>
                  <td/>
                  <td/>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card-text>
        <v-card-actions style="display: flex; justify-content: space-between;">
          <v-btn icon @click="attachFile" style="vertical-align: top;">
            <icon width="35" icon="mdi:paperclip" color="orange" />
          </v-btn>
          <v-text-field placeholder="Сообщение" variant="outlined" clearable style="margin: 0 10px;" />
          <v-btn icon @click="sendMessage" style="vertical-align: top;">
            <icon width="35" icon="mdi:send-circle" color="orange" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

export default {
  components: { Icon },
  props: {
    data: {
      type: Object,
      require: true
    }
  },
  setup() {
    const chatDialog = ref(false);

    return {
      chatDialog
    }
  }
}
</script>

<style>
.dialog {
  min-height: 600px;
}

.messages {
  height: calc(100vh - 350px);
  min-height: 400px;
  overflow: auto;
  border: 1px solid gainsboro;
  border-radius: 10px;
}
</style>