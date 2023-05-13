<template>
  <div>
    <navigation-panel :enterDictionary="true" />
    <v-card flat tile outlined class="dictionary">
      <div class="dictionary_nav">
        <div v-for="(tab, index) in tabs" :key="'tab_' + index" :title="tab.title" class="dictionary_nav_item"
          :class="{ active: tab.title === current.title, nextAfterActive: index === currentId + 1 }"
          @click="setTab(tab, index)">
          {{ tab.title }}
        </div>
      </div>
      <div class="dictionary_body">
        <component :is="current.component || defaultComponent" :item="current" :can-edit="user.role === 'Исследователь'" />
      </div>
    </v-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import NavigationPanel from '../src/components/NavigationPanel.vue';
import FieldDictionaryVue from '../src/components/dictionary/fields/FieldDictionary.vue';
import TemplateDictionaryVue from '../src/components/dictionary/templates/TemplateDictionary.vue';
import ContractDictionaryVue from '../src/components/dictionary/contracts/ContractDictionary.vue';

export default {
  name: 'PageDictionary',
  components: { NavigationPanel, FieldDictionaryVue, TemplateDictionaryVue, ContractDictionaryVue },
  setup() {
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem("currentUser"))
    if (!user) {
      router.push("/");
      return;
    }

    const defaultComponent = "FieldDictionaryVue";
    const current = ref({
      title: 'Поля',
      role: 'RESEARCHER',
      component: "FieldDictionaryVue"
    });
    const currentId = ref(0);
    const tabs = ref([
      {
        title: 'Поля',
        role: 'RESEARCHER',
        component: "FieldDictionaryVue"
      },
      {
        title: 'Шаблоны',
        role: 'RESEARCHER',
        component: "TemplateDictionaryVue"
      },
      {
        title: 'Договоры',
        role: 'RESEARCHER',
        component: "ContractDictionaryVue"
      }
    ]);


    const setTab = (tab, index) => {
      current.value = tab;
      currentId.value = index
    }

    return { defaultComponent, current, currentId, tabs, user, setTab };
  }
}
</script>

<style scoped>
.dictionary {
  height: calc(100vh - 177px);
  min-height: calc(100% - 24px) !important;
  width: 100%;
  margin-top: 20px;
  display: flex;
  border-top: 1px solid orange;
}

.dictionary_nav {
  margin-right: 0;
  z-index: 2;
}

.dictionary_nav_item {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 10px;
  width: 200px;
  cursor: pointer;
  border-bottom: 1px solid orange;
}

.dictionary_nav_item:hover {
  color: #3eaf7c;
  background: #ffa6006b;
}

.dictionary_nav_item:last-of-type {
  border-bottom: 0;
}

.active {
  font-weight: 800;
  font-size: 16pt;
}

.nextAfterActive {
  border-top: 0;
}

.dictionary_body {
  padding: 15px;
  border-left: 1px solid orange;
  z-index: 1;
  flex: 0 1 100%;
}
</style>
