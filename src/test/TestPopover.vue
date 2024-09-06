<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { queryDict } from "../request/translate.ts";

const input = ref(""), out2 = ref("");

const dictVisible = ref(false);
const dictPosition = ref({ top: 10, left: 10 });

const calculateDictPosition = (textarea, start, text) => {
    const textBeforeSelection = textarea.value.substring(0, start);

    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.whiteSpace = 'pre-wrap';
    div.style.visibility = 'hidden';
    div.style.font = getComputedStyle(textarea).font;
    div.style.left = `${textarea.offsetLeft}px`;
    div.style.top = `${textarea.offsetTop}px`;
    div.style.width = `${textarea.offsetWidth}px`;
    div.style.height = `${textarea.offsetHeight}px`;
    div.textContent = textBeforeSelection;

    document.body.appendChild(div);

    const span = document.createElement('span');
    span.textContent = text;
    div.appendChild(span);

    const rect = span.getBoundingClientRect();
    document.body.removeChild(div);

    return { top: rect.top + window.scrollY + rect.height + 10/*与下面css一致*/, left: rect.left + window.scrollX };
};

const selectText = (e) => {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    const text = e.target.value.substring(start, end);
    console.log(text);

    if (text.length === 0) {
        dictVisible.value = false;
        return;
    }

    const position = calculateDictPosition(e.target, start, text);
    dictPosition.value = position;

    queryDict(text)
        .then(res => {
            if (res && res.length > 0) {
                const firstResult = res[0];
                const word = firstResult.word;
                const phonetic = firstResult.phonetic;
                const definition = firstResult.meanings[0].definitions[0].definition;
                out2.value = `${word} (${phonetic}): ${definition}`;
                dictVisible.value = true;
            }
        })
        .catch(err => console.error(err));
};

let handleClickOutside;

onMounted(() => {
    // 添加全局点击事件监听器
    handleClickOutside = (e) => {
        const dictElement = document.querySelector('.dict');
        if (dictElement && !dictElement.contains(e.target)) {
            dictVisible.value = false;
        }
    };
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    // 在组件卸载时移除事件监听器
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div v-show="dictVisible" class="dict" :style="{ top: `${dictPosition.top}px`, left: `${dictPosition.left}px` }">
        {{ out2 }}
    </div>

    <textarea v-model="input" class="form-control" placeholder="输入待翻译的文本" @mouseup="selectText" />
</template>

<style scoped>
.dict {
    position: absolute;
    z-index: 1000;
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}
</style>
