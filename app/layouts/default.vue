<template>
    <div>
        <UContainer>
            <!-- <BaseNavMenu /> -->
            <UHeader title="Fakture" />
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