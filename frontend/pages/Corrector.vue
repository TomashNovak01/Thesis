<template>
  <div>
    <header>
      <div class="tabs logo" />
      <div class="tabs" style="align-items: center">
       <user-card />
      </div>
    </header>

    <body>
      <tasks-panel :is-correct="true" @selectTask="(task) => selectTask(task)" />
      <field-act-table v-if="data" :data="data" />
    </body>
    <field-act-footer v-if="data" :data="data" :is-correct="true" class="fieldAct__footer" @enterStatus="data = null" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserCard from '../src/components/UserCard.vue';
import TasksPanel from "@/components/TasksPanel.vue";
import FieldActTable from '../src/components/fieldAct/FieldActTable.vue';
import FieldActFooter from '../src/components/fieldAct/FieldActFooter.vue';

export default {
  components: { UserCard, TasksPanel, FieldActTable, FieldActFooter },
  setup() {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    const router = useRouter();
    if (!user) {
      router.push("/");
      return;
    } else if (user.role !== "Координатор") {
      router.push("/fieldact");
      return;
    }

    const data = ref(null);

    const deleteLocalStorage = () => localStorage.removeItem("currentUser");

    const selectTask = (task) => data.value = task;

    return { user, deleteLocalStorage, selectTask, data }
  }
}
</script>

<style scoped>
header {
  display: flex;
  height: 85px;
  margin-top: 5px;
}

.tabs {
  display: flex;
  justify-content: center;
  width: 50%;
}

.logo {
  background-image: url(../src/assets/logo.jpg);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 250px auto;
}

body {
  display: flex;
  height: calc(100vh - 130px);
  border-top: 1px solid orange;
  margin-top: 10px;
}

.fieldAct__footer {
  position: fixed;
  right: 0;
  bottom: 0;
  width: calc(100% - 311px);
  border-left: 1px solid orange;
}
</style>