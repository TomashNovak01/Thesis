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
            <v-card v-for="(remark, index) of remarks" :key="'remark_' + index"
              :title="`${remark.surname} ${remark.name} ${remark.patronymic}`"
              :subtitle="dayjs(remark.date).format('DD.MM.YYYY')" :elevation="2" class="message">
              <v-card-text>
                {{ remark.remarks }}
                <!-- <p>{{ remark.file_bin }}</p> -->
                <p v-if="remark.file_bin" class="message_link">
                  <a :href="'data:application/text;charset=utf-8,' + remark.file_bin.data" :download="remark.file_name">
                    {{ remark.file_name }}
                  </a>
                </p>
              </v-card-text>
            </v-card>
          </div>
          <template v-if="selectedFile">
            <div class="file">
              <h5 class="file_title">Файл:</h5>
              <div class="file_data">
                <p class="file_data_name">{{ selectedFile[0].name }}</p>
                <icon width="20" icon="material-symbols:delete-outline" color="gray" class="file_data_delete"
                  @click="selectedFile = null" />
              </div>
            </div>
          </template>
        </v-card-text>
        <v-card-actions style="display: flex; justify-content: space-between;">
          <v-btn icon @click="fileInput.click()" style="vertical-align: top;">
            <icon width="35" icon="mdi:paperclip" color="orange" />
          </v-btn>
          <input v-show="false" ref="fileInput" type="file" accept="text/*" multiple @change="filesPush" />
          <div style="width: 100%;">
            <v-text-field v-model="text" placeholder="Сообщение" variant="outlined" clearable style="margin: 0 10px;"
              @keyup.enter="sendMessage" />
            <small class="error">{{ error }}</small>
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
import dayjs from "dayjs"

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
    const selectedFile = ref(null);
    const error = ref("");

    const fileInput = ref(null);

    const store = useStore();
    const remarks = computed(() => store.getters.getResearchRemarks.filter((r) => r.research_id === props.data.research_id));

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const filesPush = (event) => {
      if (event.target.files[0].type.startsWith('text/'))
        selectedFile.value = [event.target.files[0]];
    }

    const sendMessage = () => {
      if (!text.value && !selectedFile.value) {
        error.value = "Невозможно создать сообщение без текста или файла";
        return;
      }

      const formData = new FormData();

      formData.append("id_user", JSON.parse(localStorage.getItem("currentUser")).id_code);
      formData.append("remarks", text.value);
      formData.append("date", dd + "-" + mm + "-" + yyyy);
      formData.append("research_id", props.data.research_id);
      formData.append("file_name", selectedFile.value ? selectedFile.value[0].name : null);
      formData.append("file", selectedFile.value ?  selectedFile.value[0] : null);

      store.dispatch("addRemark", formData);
      store.dispatch("fillRemarks");

      text.value = "";
      selectedFile.value = null;
    }

    return {
      dayjs,
      chatDialog,
      fileInput,
      text,
      selectedFile,
      error,
      remarks,
      filesPush,
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
  margin: 5px;
}

.file {
  padding: 0 5px;

  ol {
    margin: 0 10px 10px;
    font-size: 12px;
    min-height: 70px;
    overflow-y: scroll;

    li {
      display: flex;
      justify-content: space-between;
      vertical-align: middle;
    }
  }

  &_data {
    display: flex;
    justify-content: space-between;
    vertical-align: middle;

    &_name {
      margin: 0 10px 10px;
      font-size: 12px;
    }

    &_delete {
      cursor: pointer;
    }
  }
}
</style>