<template>
  <div class="container">
    <router-view />
    <footer class="text-center mt-3">
    <p>&copy; {{ year }} Pequla - Minecraft Discord Link</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>