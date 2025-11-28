<script lang="ts" setup>
import { ref } from 'vue'

const companyData = ref<CompanyDbEntity | null>(null)
const clientData = ref<CompanyDbEntity | null>(null)
const invoiceNumber = ref<string>()
const saving = ref<boolean>()
const invoiceItemsState = useState<InvoiceItem[]>('invoice-items')

onMounted(async () => {
  const invoiceCurrentNumber: number = await $fetch<number>('/api/invoices/number');
  const newNumber: number = +invoiceCurrentNumber + 1;

  invoiceNumber.value = `${newNumber}/${(new Date()).getFullYear()}`
})

const handleCompanyData = (data: CompanyDbEntity) => {
  companyData.value = data

  console.log("handleCompanyData", data)
};

const handleClientData = (data: CompanyDbEntity) => {
  clientData.value = data

  console.log("handleCompanyData", data)
};

const saveInvoice = async () => {
  saving.value = true;

  console.log(invoiceItemsState.value)

  const invoiceItems: InvoiceItemDbEntity[] = invoiceItemsState.value.map(item => {
    return {
      id: item.id,
      description: item.description,
      quantity: item.amount,
      price: item.value,
      tax: item.tax,
      order: item.id || 0,
      invoiceId: null,
      unit: "kom"
    }
  })

  const invoice: InvoiceDbEntity = {
    id: null,
    invoiceNumber: invoiceNumber.value || '',
    companyId: companyData.value?.id || '',
    clientId: clientData.value?.id || '',
    turnoverDate: new Date(),
    paymentDeadline: new Date(),
    value: invoiceItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  };

  const invoiceWithItems: InvoiceWithItems = {
    invoice: invoice,
    items: invoiceItems
  }

  const { data } = await useFetch('/api/invoices', {
    method: 'POST',
    body: invoiceWithItems
  });

  console.log(data)
  saving.value = false;
}
</script>

<template>
  <UContainer>
    <InvoiceCompanyDropdown @company-selected="handleCompanyData" />
    <InvoiceClientDropdown @client-selected="handleClientData" class="absolute right-0" />

    <USeparator class="h-6" />

    <div class="flex">

      <UCard variant="subtle" class="md:w-1/2 text-right mb-3 pr-2 mr-2">
        <template #header>
          <h3>Company</h3>
        </template>

        <template #default>
          <div>
            <label>{{ companyData?.fullName || '-' }}</label><br />
            <label>{{ companyData?.address || '-' }}</label><br />
            <label>{{ companyData?.companyId ? `MB: ${companyData?.companyId}` : '-' }}</label><br />
            <label>{{ companyData?.taxId ? `MB: ${companyData?.taxId}` : '-' }}</label><br />
          </div>
        </template>
      </UCard>

      <UCard variant="subtle" class="md:w-1/2 text-right mb-3 pr-2 mr-2">
        <template #header>
          <h3>Client</h3>
        </template>
        <template #default>
          <div>
            <label>{{ clientData?.fullName || '-' }}</label><br />
            <label>{{ clientData?.address || '-' }}</label><br />
            <label>{{ clientData?.companyId ? `MB: ${clientData?.companyId}` : '-' }}</label><br />
            <label>{{ clientData?.taxId ? `MB: ${clientData?.taxId}` : '-' }}</label><br />
          </div>
        </template>
      </UCard>
    </div>

    <USeparator class="h-6" />

    <InvoiceItems>
      <template #invoice-number>
        <InvoiceEditableValue v-model="invoiceNumber" :type="'text'" />
      </template>
    </InvoiceItems>

    <div class="text-right">
      <UButton @click="saveInvoice" :icon="saving ? '' : 'i-lucide-save'" :loading="saving" size="xl" color="primary"
        variant="solid" class="w-40 mt-3 right-0 cursor-pointer">
        Save
      </UButton>
    </div>
  </UContainer>

</template>
