
<script setup lang="ts">
defineProps<{
  id?: string
  label?: string
  modelValue?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  options?: { label: string; value: string }[]
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-white"
    >
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      class="block w-full px-3 py-2 rounded-md border shadow-sm sm:text-sm transition-colors"
      :class="[
        error ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      ]"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option
        disabled
        value=""
        v-if="placeholder"
      >
        {{ placeholder }}
      </option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
