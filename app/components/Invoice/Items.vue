<script setup lang="ts">

const items = useState<InvoiceItem[]>('invoice-items', () => [])

const invoiceValue = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.amount * item.value), 0)
})

const addItem = () => {
    const newItem: InvoiceItem = {
        description: 'N/A',
        amount: 1,
        value: 0,
        tax: 0
    };
    items.value.push(newItem)
}

const removeRow = (index: number) => {
    items.value.splice(index, 1);
}
</script>

<template>
    <div class="flex">
        <div class="flex-2">
            <UButton icon="i-lucide:circle-plus" size="md" color="neutral" variant="outline"
                class="mb-2.5 cursor-pointer" @click="addItem">
                Add item</UButton>
        </div>

        <div class="flex-2 text-right">
            <slot name="invoice-number"></slot>
        </div>
    </div>

    <table
        class="table-fixed w-full border-collapse border border-gray-400 bg-white text-sm dark:border-gray-500 dark:bg-gray-800">
        <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
                <th class="custom-th">#</th>
                <th class="custom-th">Description</th>
                <th class="custom-th">Amount</th>
                <th class="custom-th">Value</th>
                <th class="custom-th">Tax</th>
                <th class="custom-th">Sum</th>
                <th class="custom-th">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(v, i) in items" :key="i">
                <td class="custom-td">{{ i + 1 }}</td>
                <td class="custom-td">
                    <InvoiceEditableValue v-model="v.description" :type="'text'" />
                </td>
                <td class="custom-td text-right">
                    <InvoiceEditableValue v-model="v.amount" :type="'number'" />
                </td>
                <td class="custom-td text-right">
                    <InvoiceEditableValue v-model="v.value" :type="'number'" />
                </td>
                <td class="custom-td text-right">
                    <InvoiceEditableValue v-model="v.tax" :type="'number'" />
                </td>
                <td class="custom-td text-right">{{ (v.amount * v.value) }}</td>
                <td class="custom-td text-right">
                    <UButton @click="removeRow(i)" size="xs" color="error" class="cursor-pointer">
                        <UIcon name="i-lucide-trash-2" class="size-5" />
                    </UButton>
                </td>
            </tr>
            <tr class="border-t-2">
                <td colspan="5" class="custom-td text-right">
                    Total
                </td>
                <td colspan="2" class="custom-td text-right">
                    {{ invoiceValue }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
@reference "tailwindcss";

.custom-th {
    @apply w-1/2 border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-200;
}

.custom-td {
    @apply border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400;
}
</style>
