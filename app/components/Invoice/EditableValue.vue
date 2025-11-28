<script setup lang="ts">
const props = defineProps({
    type: {
        default: 'text'
    }
})
const editing = ref(false)
const model = defineModel();

const classObject = computed(() => ({
    'text-right': props.type == 'number',
    'text-left': props.type != 'number',
    'editable-text': model.value !== ''
}))

const submitInputChange = () => {
    editing.value = false
}
</script>

<template>
    <UInput v-if="editing" v-model="model" :type="props.type" ref="edit-input" variant="outline" @keydown.enter="submitInputChange">

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