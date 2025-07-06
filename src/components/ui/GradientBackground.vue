<template>
  <div class="relative min-h-screen flex bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-auto">
    <div class="absolute inset-0 bg-black/20 pointer-events-none" />
    <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 to-transparent pointer-events-none" />

    <div class="relative z-10 w-full">
      <slot />
    </div>
  </div>
</template>