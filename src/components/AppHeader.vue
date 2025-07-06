<script setup lang="ts">
import BaseButton from './ui/BaseButton.vue';

</script>

<template>
  <header class="bg-secondary shadow-sm">
    <div class="max-w-7xl py-4 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link
            to="/legends"
            class="flex items-center space-x-2"
          >
            <img
              src="/logo.png"
              class="w-40 h-30"
            >
          </router-link>
        </div>
        <div class="flex gap-3">
          <nav class="hidden md:flex space-x-8 text-white text-lg ">
            <router-link
              to="/legends"
              class=" px-3 py-2 rounded-md  font-normal transition-colors"
              active-class="text-primary"
            >
              Legends
            </router-link>
            <router-link
              to="/legends/create"
              class=" px-3 py-2 rounded-md  font-normal transition-colors"
              active-class="text-primary"
            >
              Create Legend
            </router-link>
          </nav>

          <div class="flex items-center space-x-4">
            <BaseButton variant="primary">
              Log out
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


