<script setup lang="ts">
    import { ref } from 'vue';

    const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <footer class="bg-gray-800 text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <p class="text-gray-300">
          © {{ currentYear }} Leyendas de Costa Rica. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>