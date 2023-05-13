<template>
  <div class="back">
    <form class="card" @submit.prevent="submit">
      <div class="container">
        <h1>Авторизация пользователя</h1>
        <div class="form-control">
          <label for="email">Логин или почта:</label>
          <input type="text" id="email" v-model="form.email.value" @blur="form.email.blur" />
          <small v-if="form.email.touched && form.email.errors.required">Введите свою почту</small>
        </div>
        <div class="form-control">
          <label for="password">Пароль:</label>
          <div style="display: flex">
            <input :type="type" id="password" v-model="form.password.value" style="margin-right: 15px"
              @blur="form.password.blur" />
            <v-btn icon @click="showPassword">
              <icon :icon="icon" width="30" color="orange" />
            </v-btn>
          </div>
          <small v-if="form.password.touched && form.password.errors.required">Введите свой пароль</small>
          <small v-if="form.password.touched && form.password.errors.minLength">
            Длина пароля меньше 8-и символов. Сейчас он состоит из {{ form.password.value.length }}
          </small>
        </div>
        <button class="btn primary" type="submit" :disabled="!form.valid">Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onErrorCaptured, computed, onMounted } from "vue";
import { useForm } from "../src/use/form";
import { Icon } from "@iconify/vue"
import { toast } from "vue3-toastify"

const required = (val) => !!val;
const minLength = (num) => (val) => val.length >= num;

export default {
  name: "PageAuthorization",
  components: { Icon },
  setup() {
    onMounted(() => store.dispatch("fillUsers"));

    const submitted = ref(false);
    const error = ref();
    const form = useForm({
      email: {
        value: "",
        validators: { required }
      },
      password: {
        value: "",
        validators: { required, minLength: minLength(8) }
      }
    });

    const type = ref("password");
    const icon = ref("mdi:eye-off-outline");

    const store = useStore();
    const users = computed(() => store.getters.getUsers);

    const router = useRouter();

    const showPassword = () => {
      if (type.value === "password") {
        type.value = "text";
        icon.value = "mdi:eye-outline"
      } else {
        type.value = "password";
        icon.value = "mdi:eye-off-outline"
      }
    }

    const submit = () => {
      submitted.value = true;

      for (let i = 0; i < users.value.length; i++) {
        const currentUser = users.value[i];

        if ((currentUser.email === form.email.value || currentUser.login === form.email.value) && currentUser.password === form.password.value) {
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          toast.success(`Добро пожаловать ${currentUser.surname} ${currentUser.name} ${currentUser.patronymic} \nВы зашли как ${currentUser.role}`);
          router.push("/fieldact");
          return;
        }
      }

      toast.warning("Пользователь не найден \nПроверти почту и пароль")
    };

    onErrorCaptured(e => { error.value = e.message });

    return { form, type, icon, showPassword, submit, submitted, error, users }
  }
}
</script>

<style scoped>
.back {
  width: 100%;
  height: 100%;
  background: #ffa6009a;
}

.card {
  margin: 300px auto;
  width: 1200px;
  vertical-align: middle;
}
</style>