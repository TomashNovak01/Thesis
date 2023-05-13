/* eslint-disable */
import { ref, reactive, watch } from "vue";

export function useEnterFiled(field) {
  const valid = ref(false);
  const value = ref(field.value);
  const errors = reactive({});
  const touched = ref(false);

  const reassign = (val) => {
    valid.value = true;
    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name](val);
      errors[name] = !isValid;
      if (isValid) valid.value = true;
    });
  };

  watch(value, reassign);
  reactive(field.value);

  return { valid, value, errors, touched, blur: () => (touched.value = true) };
}
