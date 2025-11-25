<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'

const companies = ref<Company[]>([])
const companiesForSelect = computed(() =>
  companies.value.map((company: Company) => ({
    id: company.id,
    label: company.short_name || company.full_name,
  })),
)
const selectedCompany = ref('')


const clients = ref<CompanyClient[]>([])
const clientsForSelect = computed(() =>
  companies.value.map((client: CompanyClient) => ({
    id: client.id,
    label: client.short_name || client.full_name,
  })),
)
const selectedClient= ref('')


onMounted(async () => {
  companies.value = await $fetch<Company[]>('/api/companies')
  console.log(companiesForSelect.value)

  clients.value = await $fetch<CompanyClient[]>('/api/clients')
  console.log(clientsForSelect.value)
})
</script>

<template>
  <USelectMenu v-model="selectedCompany" :items="companiesForSelect" class="w-48" />

  <USelectMenu v-model="selectedClient" :items="clientsForSelect" class="w-48" />

  <!-- <UButton @click="fetchCompanies">Load companies</UButton> -->
</template>