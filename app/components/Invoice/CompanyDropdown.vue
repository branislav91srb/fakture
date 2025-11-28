<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits(['company-selected'])

const companies = ref<CompanyNames[]>([])
const companiesForSelect = computed<SelectMenuItem[]>(() =>
    companies.value.map((company: CompanyNames) => ({
        id: company.id,
        label: company.shortName || company.fullName,
    })),
)
const selectedCompany = ref<SelectMenuItem>('')


onMounted(async () => {
    companies.value = await $fetch<CompanyNames[]>('/api/companies/names')
    console.log(companiesForSelect.value)
})

const getCompanyData = async () => {
    const company: CompanyDbEntity = await $fetch<CompanyDbEntity>(`/api/companies/${selectedCompany.value.id}`)
    emit('company-selected', company)
}

</script>

<template>
    <USelectMenu placeholder="Select company" v-model="selectedCompany" :items="companiesForSelect" size="xl"
        class="w-64" @change="getCompanyData" />
</template>