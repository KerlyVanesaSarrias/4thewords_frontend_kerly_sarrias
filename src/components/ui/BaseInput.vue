<script setup lang="ts">
import { computed } from "vue";

type Props = {
  id?: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "date" | "file";
  modelValue?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
};

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

defineEmits<{
  "update:modelValue": [value: string | number];
  blur: [];
  focus: [];
}>();

const inputClasses = computed(() => {
  const baseClasses =
    "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm transition-colors";
  const errorClasses = props.error
    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";
  const disabledClasses = props.disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white";

  return `${baseClasses} ${errorClasses} ${disabledClasses}`;
});
</script>
<template>
  <div class="space-y-1">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="inputClasses"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>


