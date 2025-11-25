<script lang="ts" setup>
const {info, query} = await useSurrealDB()

const x = await info()
const y = await query('SELECT * FROM test')
console.log(y.data)
</script>

<template>
  <UContainer>
    <h1>Hello World</h1>
  </UContainer>
</template>