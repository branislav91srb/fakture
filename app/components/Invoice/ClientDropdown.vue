<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits(['client-selected'])

const clients = ref<CompanyNames[]>([])
const clientsForSelect = computed<SelectMenuItem[]>(() =>
    clients.value.map((client: CompanyNames) => ({
        id: client.id,
        label: client.shortName || client.fullName,
    })),
)
const selectedClient = ref<SelectMenuItem>('')


onMounted(async () => {
    clients.value = await $fetch<CompanyNames[]>('/api/clients/names')
    console.log(clientsForSelect.value)
})

const getClientData = async () => {
    const client: CompanyDbEntity = await $fetch<CompanyDbEntity>(`/api/companies/${selectedClient.value.id}`)
    emit('client-selected', client)
}

</script>

<template>
    <USelectMenu placeholder="Select client" v-model="selectedClient" :items="clientsForSelect" size="xl"
        class="w-64 mr-3" @change="getClientData" />
</template>