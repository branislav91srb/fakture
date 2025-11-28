<template>
  <div>
    <!-- <BaseNavMenu /> -->
    <UHeader title="Fakture" />
    <slot />

  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Fakture',
  meta: [
    { name: 'description', content: 'Moje fakture' },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ]
})
</script>