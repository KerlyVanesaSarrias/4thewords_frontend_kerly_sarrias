<script setup lang="ts">
import { Calendar, MapPin } from 'lucide-vue-next';
import BaseButton from './ui/BaseButton.vue';

defineProps<{
  id: string
  name: string
  description?: string
  date?: string
  imageUrl: string
  category: string
  location: string
}>()

defineEmits<{
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
    <div class="aspect-w-16 aspect-h-9">
      <img
        :src="imageUrl"
        :alt="name"
        class="w-full h-48 object-cover"
      >
    </div>
    <div class="p-6 space-y-3">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 ">
          {{ name }}
        </h3>
        <span class="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1">
          {{ category }}
        </span>
      </div>

      <p class="text-gray-600 text-sm line-clamp-3">
        {{ description }}
      </p>

      <div class="space-y-1 text-xs text-gray-500">
        <div class="flex items-center space-x-1">
          <MapPin class="w-4 h-4" />
          <span>{{ location }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <Calendar class="w-4 h-4" />
          <span>{{ date }}</span>
        </div>
      </div>
    </div>
    <div class="px-6 py-4 bg-gray-50 flex justify-between space-x-2">
      <BaseButton
        @click="$emit('edit', id)"
        class="w-full"
      >
        Edit
      </BaseButton>
      <BaseButton
        variant="danger"
        @click="$emit('delete', id)"
        class="w-full"
      >
        Delete
      </BaseButton>
    </div>
  </div>
</template>
