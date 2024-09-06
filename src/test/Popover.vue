<template>
    <div ref="dictRef" v-show="visible" class="dict" :style="{ top: `${position.top}px`, left: `${position.left}px` }">
        {{ content }}
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    position: {
        type: Object,
        default: () => ({ top: 0, left: 0 })
    },
    content: {
        type: String,
        default: ''
    }
});

const dictRef = ref(null);

const emit = defineEmits(['update:visible']);

const hideDictIfClickedOutside = (event) => {
    if (!props.visible || !dictRef.value?.contains(event.target)) {
        emit('update:visible', false);
    }
};

onMounted(() => {
    window.addEventListener('click', hideDictIfClickedOutside, true);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', hideDictIfClickedOutside, true);
});
</script>

<style scoped>
.dict {
    position: absolute;
    z-index: 1000;
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>