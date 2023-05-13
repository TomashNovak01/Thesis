/* eslint-disable */
import { computed, reactive } from "vue";
import { useEnterFiled } from "./enterField";

export function useForm(init = {}) {
  const form = reactive({});
  const validKey = "valid";

  for (const [key, value] of Object.entries(init))
    form[key] = useEnterFiled(value);

  const withoutValid = (k) => k !== validKey;

  form[validKey] = computed(() =>
    Object.keys(form)
      .filter(withoutValid)
      .every((k) => form[k].valid)
  );

  return form;
}
