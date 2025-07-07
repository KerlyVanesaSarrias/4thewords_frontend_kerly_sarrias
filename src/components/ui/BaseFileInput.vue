<script setup lang="ts">

type Props = {
  id?: string
  label?: string
  modelValue?: File | null;
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  accept?: string
}

withDefaults(defineProps<Props>(), {
  id: '',
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  error: '',
  accept: 'image/*',
})

const emit = defineEmits<{   
  (e: 'update:modelValue', value: File | null ): void
}>()

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    emit('update:modelValue', file);
  } else {
    emit('update:modelValue', null);
  }
}

</script>

<template>
  <input
    @change="handleFileChange"
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
</template>