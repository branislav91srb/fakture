<script setup lang="ts">
const props = defineProps({
    type: {
        default: 'text'
    }
})
const editing = ref(false)
const model = defineModel();

const editInputRef = useTemplateRef('edit-input')

let oldValue: any = null

watch(editing, (newVal) => {
    if (newVal) {
        nextTick(() => {
            editInputRef.value?.inputRef?.focus();
            editInputRef.value?.inputRef?.select();
        });
        oldValue = model.value;
    } else {
        oldValue = null;
    }
});

const classObject = computed(() => ({
    'text-right': props.type == 'number',
    'text-left': props.type != 'number',
    'editable-text': model.value !== ''
}))

const submitInputChange = () => {
    editing.value = false
}

const revertInputChange = () => {

    if (oldValue === null) return;

    model.value = oldValue
    editing.value = false
}

</script>

<template>
    <UInput v-if="editing" v-model="model" :type="props.type" ref="edit-input" variant="outline" v-bind:min="props.type === 'number' ? 0 : null"
        @keydown.enter="submitInputChange" @keydown.esc="revertInputChange" @blur="submitInputChange">

        <UTooltip text="Submit" :content="{ side: 'right' }">
            <UButton :color="'success'" variant="link" size="sm" :icon="'i-lucide-check'" aria-label="Submit"
                class="cursor-pointer" @click="submitInputChange" />
        </UTooltip>

    </UInput>
    <span v-else @click="editing = true" :class="classObject" class="cursor-pointer">{{ model }}</span>
</template>

<style scoped>
.editable-text {
    position: relative;
    padding-right: 1rem;
}

.editable-text::after {
    content: "\270E";
    position: absolute;
    right: 0;
    top: 20%;
    transform: translateY(-50%);
    font-size: 0.7rem;
    color: rgb(var(--color-primary-500));
    opacity: 0.6;
    transition: opacity 0.15s ease;
}

.editable-text:hover::after {
    opacity: 1;
}
</style>