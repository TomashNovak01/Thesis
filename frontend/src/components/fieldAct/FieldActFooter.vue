<template>
  <footer>
    <div v-if="!isTake && !isCorrect && isEmployee">Исследователь не назначен</div>
    <v-btn v-else-if="!isTake && !isCorrect" class="icon take" title="Принять задачу" icon @click="take">
      <icon width="25" icon="material-symbols:check-circle-outline" color="blue" />
    </v-btn>
    <div v-else class="footer">
      <chat v-if="isCurrentUser || isCorrect" class="icon footer__item l" :data="data" />
      <div class="footer__item c">
        Исследователь: {{ researcher.surname }} {{ researcher.name }} {{ researcher.patronymic }}
      </div>
      <v-btn v-if="isCurrentUser && data.id_status === 1 && !data.is_new" icon title="Отправить на согласование"
        @click="submitForApproval(2)">
        <icon width="25" icon="mdi:send" color="green" />
      </v-btn>
      <div v-if="isCorrect" class="footer__item c">
        <v-btn class="icon" icon title="Отклонить" @click="submitForApproval(1)">
          <icon width="25" icon="radix-icons:cross-1" color="red" />
        </v-btn>
        <v-btn class="icon" icon title="Принять" @click="submitForApproval(3)">
          <icon width="25" icon="teenyicons:tick-solid" color="green" />
        </v-btn>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import Chat from "../Chat.vue";

export default {
  components: { Chat },
  props: {
    data: {
      type: Object,
      require: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    isCurrentUser: {
      type: Boolean,
      default: false
    },
    isEmployee: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const isTake = ref(props.data.id_user !== null);

    const store = useStore();
    const users = computed(() => store.getters.getUsers);

    const researcher = ref(isTake.value ? users.value.find((u) => u.id_code === props.data.id_user) : null);

    watch(() => props.data, () => {
      isTake.value = props.data.id_user !== null;
      researcher.value = isTake.value ? users.value.find((u) => u.id_code === props.data.id_user) : null;
    })

    const take = () => {
      researcher.value = JSON.parse(localStorage.getItem("currentUser"));
      props.data.id_user = researcher.value.id_code;
      store.dispatch("changeResearch", props.data);

      emit("takeTask");

      isTake.value = true;
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
      researcher
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  background: white;
  display: flex;
  border-top: 1px solid gainsboro;
  border-left: 1px solid orange;
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