<script setup lang="ts">
import { Calendar, MapPin } from 'lucide-vue-next';

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
    <!-- Image -->
    <div class="aspect-w-16 aspect-h-9">
      <img
        :src="imageUrl"
        :alt="name"
        class="w-full h-48 object-cover"
      >
    </div>
    <div class="p-6 space-y-3">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
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
    <div class="px-6 py-4 bg-gray-50 border-t flex justify-between space-x-2">
      <button
        @click="$emit('edit', id)"
        class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
      >
        Edit
      </button>
      <button
        @click="$emit('delete', id)"
        class="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
</template>
