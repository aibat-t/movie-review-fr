import { computed, reactive } from "vue";
import { useField } from "./field";

export function useForm(init = {}) {
  const form = reactive({});

  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value);
  }

  form.valid = computed(() => {
    return Object.keys(form)
      .filter((k) => k !== "valid")
      .reduce((acc, k) => {
        acc = form[k].valid;
        return acc;
      }, true);
  });

  return form;
}
