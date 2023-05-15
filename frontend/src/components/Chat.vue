<template>
  <div>
    <v-btn icon title="Чат" @click="chatDialog = true">
      <icon width="25" icon="mdi:message-bookmark" color="orange" />
    </v-btn>
    <v-dialog v-model="chatDialog" width="1000" class="dialog">
      <v-card style="padding: 20px">
        <v-card-title>
          Чат полевого акта №{{ data.research_id }}
        </v-card-title>
        <v-card-text>
          <div class="messages">
            <table>
              <colgroup>
                <col style="width: 15%" />
                <col />
                <col style="width: 15%" />
              </colgroup>
              <tbody>
                <tr v-for="(remark, index) of remarks" :key="'remark_' + index" class="message">
                  <td class="message_item">{{ remark.surname }} {{ remark.name }} {{ remark.patronymic }}</td>
                  <td class="message_item">{{ remark.remarks }}</td>
                  <td class="message_item br-0">{{ remark.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card-text>
        <v-card-actions style="display: flex; justify-content: space-between;">
          <v-btn icon @click="attachFile" style="vertical-align: top;">
            <icon width="35" icon="mdi:paperclip" color="orange" />
          </v-btn>
          <div style="width: 100%;">
            <v-text-field v-model="v$.text.$model" placeholder="Сообщение" variant="outlined" clearable style="margin: 0 10px;" />
            <small v-for="error of v$.text.$errors" :key="error.$uid" class="error">
                {{ error.$message }}
              </small>
          </div>
          <v-btn icon @click="sendMessage" style="vertical-align: top;">
            <icon width="35" icon="mdi:send-circle" color="orange" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from "@vuelidate/validators";

export default {
  components: { Icon },
  props: {
    data: {
      type: Object,
      require: true
    }
  },
  setup(props) {
    const chatDialog = ref(false);
    const text = ref("");

    const store = useStore();
    const remarks = computed(() => store.getters.getResearchRemarks.filter((r) => r.research_id === props.data.research_id));

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const rules = computed(() => ({
      text: { required: helpers.withMessage('Введите сообщение', required) }
    }));

    const v$ = useVuelidate(rules, text);

    const sendMessage = () => {
      v$.value.$touch();
      if (v$.value.$error) return;

      store.dispatch("addRemark", {
        id_user: JSON.parse(localStorage.getItem("currentUser")).id_code,
        remarks: text.value,
        date: today = dd + "-" + mm + "-" + yyyy,
        research_id: props.data.research_id
      });

      // store.dispatch("fillRemarks");
      text.value = "";
    }

    return {
      chatDialog,
      v$,
      remarks,
      sendMessage
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  min-height: 600px;
}

.error {
  margin-left: 15px;
  color: red;
  font-size: initial;
  font-weight: initial;
}

.messages {
  height: calc(100vh - 350px);
  padding: 15px;
  min-height: 400px;
  overflow: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  border: 1px solid gainsboro;
  border-radius: 10px;
}

.message {

  &_item {
    margin-left: 5px;
  }

  br-0 {
    border-right: 0 !important;
  }
}
</style>