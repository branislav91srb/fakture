<template>
    <div>
        <UContainer>
            <!-- <BaseNavMenu /> -->
            <slot />
        </UContainer>
    </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Fakture',
  meta: [
    { name: 'description', content: 'Moje fakture' }
  ]
})
</script>