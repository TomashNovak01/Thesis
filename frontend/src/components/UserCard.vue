<template>
  <v-card class="mr-15">
    <v-card-text class="df">
      <icon icon="mdi:account-circle" width="45" color="orange" />
      <div style="margin: 0 15px;">
        <p>ФИО: {{ user.surname }} {{ user.name }} {{ user.patronymic }}</p>
        <p>Роль: {{ user.role }}</p>
      </div>
      <v-card-actions>
        <router-link class="exit" to="/" @click="deleteLocalStorage">Выйти</router-link>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  components: { Icon },
  setup() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    const deleteLocalStorage = () => localStorage.removeItem('currentUser');
    return { user, deleteLocalStorage };
  }
}
</script>

<style lang="scss" scoped>
.mr-15 {
  margin-right: 15px;
}

.df {
  display: flex;
}

.exit {
  border: 1px solid #3eaf7c;
  border-radius: 5px;
  padding: 5px;
}

.exit:hover {
  background: #3eaf7c;
  border: 1px solid #fff;
}
</style>