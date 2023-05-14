<template>
  <footer>
    <icon v-if="!isTake && !isCorrect" class="icon take" width="25" icon="mdi:checkbox-marked-circle-outline" color="blue"
      @click="take" />
    <div v-else class="footer">
      <chat v-if="isCurrentUser || isCorrect" class="icon footer__item l" :data="data" />
      <div class="footer__item c">Исследователь: {{ researcher.surname }} {{ researcher.name }} {{ researcher.patronymic
      }}
      </div>
      <icon v-if="isCurrentUser && data.id_status === 1" class="icon footer__item r" width="25" icon="mdi:send"
        color="green" @click="submitForApproval(2)" />
      <div v-if="isCorrect" class="footer__item c">
        <icon class="icon" width="25" icon="radix-icons:cross-1" color="red" @click="submitForApproval(1)" />
        <icon class="icon" width="25" icon="teenyicons:tick-solid" color="green" @click="submitForApproval(3)" />
      </div>
    </div>
  </footer>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import Chat from "../Chat.vue";

export default {
  components: { Icon, Chat },
  props: {
    data: {
      type: Object,
      require: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const isTake = ref(props.data.id_user !== null);

    const store = useStore();
    const users = computed(() => store.getters.getUsers);

    const researcher = ref(isTake.value ? users.value.find((u) => u.id_code === props.data.id_user) : null);
    console.log(researcher.value);
    const isCurrentUser = researcher.value ? JSON.parse(localStorage.getItem("currentUser")).id_code == researcher.value.id_code : false;

    const take = () => {
      isTake.value = true;
      props.data.id_user = JSON.parse(localStorage.getItem("currentUser")).id_code;
    };

    const submitForApproval = (status) => {
      props.data.id_status = status;
      store.dispatch("changeResearch", props.data);

      if (props.isCorrect) emit("enterStatus");
    };

    return {
      isTake,
      take,
      submitForApproval,
      researcher,
      isCurrentUser,
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  background: white;
  display: flex;
  border-top: 1px solid gainsboro;
  padding: 10px;
}

.icon {
  cursor: pointer;
  margin: 0 15px;
}

.take {
  margin-left: auto;
  margin-right: 10px;
}

.footer {
  width: 100%;
  display: flex;

  &__item {
    width: 33%;
  }

  .l {
    justify-content: flex-start;
  }

  .c {
    justify-content: center;
  }

  .r {
    justify-content: flex-end;
  }
}
</style>