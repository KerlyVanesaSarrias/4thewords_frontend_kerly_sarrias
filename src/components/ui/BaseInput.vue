<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import BaseButton from './BaseButton.vue';

defineEmits<{
  (e: 'update:modelValue', value: string  | File ): void
}>()

type Props = {
  id?: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number'   | 'file'
 modelValue?: string | File;
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  accept?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  id: '',
  label: '',
  modelValue: '',
  placeholder: '',
  error: '',
  accept: 'image/*',
})

const showPassword = ref(false)

const inputType = computed(() => {
  if(props.type !== 'password') return props.type;
  return showPassword.value
      ? 'text'
      : 'password'
})

const inputClasses = computed(() =>
  [
    'block w-full px-3 py-2 rounded-md border shadow-sm sm:text-sm transition-colors',
    props.error
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
  ].join(' ')
)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

</script>

<template>
  <div class="space-y-1 relative">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-white"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
        v-if="type !== 'file' "   
        :id="id"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <input
        v-else-if="type === 'file'"
        :id="id"
        type="file"
        :accept="accept"
        :required="required"
        :disabled="disabled"
        class="block w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4
         file:rounded-md file:border-0 file:text-sm file:font-semibold
         file:bg-purple-600 file:text-white hover:file:bg-purple-700
         transition duration-200"
      >
      <BaseButton
        v-if="type === 'password'"
        type="button"
        icon-only
        class="absolute inset-y-0 right-2 flex items-center text-gray-500"
        @click="togglePassword"
        tabindex="-1"
      >
        <Eye
          v-if="showPassword"
          class="w-4 h-4"
        />
        <EyeOff
          v-else
          class="w-4 h-4"
        />
      </BaseButton>
    </div>

    <p
      v-if="error"
      class="text-sm text-red-600 mt-1"
    >
      {{ error }}
    </p>
    <slot name="icon" />
  </div>
</template>
