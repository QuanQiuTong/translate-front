<template>
    <div class="container d-flex flex-column justify-content-between" style="height: 100%;">
        <el-table :data="gridData" stripe>
            <el-table-column prop="prompt" label="自定义提示词" width="300%" sortable>
            </el-table-column>
            <el-table-column label="">
                <template #default="{ row }">
                    <el-button class="gradient-button-red" type="danger" :icon="Delete" size="small"
                        @click="remove(row)" circle />
                </template>
            </el-table-column>
        </el-table>

        <div>
            <div class="row">
                <div class="col-12 col-lg-6">
                    <input v-model="prompt" class="form-control" placeholder="自定义提示词" />
                </div>
                <div class="col-12 col-lg-6">
                    <SoftButton variant="gradient" @click="add">add</SoftButton>
                </div>
            </div>

            <div class="row">
                <el-pagination :current-page="currentPage" @update:current-page="handleCurrentChange" :total="count"
                    :pager-count="11" :default-page-size="10" :style="{ marginTop: '0.5rem' }" />
            </div>
        </div>
    </div>
</template>

<script setup>
import SoftButton from "../components/SoftButton.vue";
import { Delete } from "@element-plus/icons-vue";
import { ref, computed } from 'vue';
import { getPrompt, postPrompt, deletePrompt } from '../request/pref';

getPrompt().then(res => {
    console.log(res.data)
    promptList.value = res.data.data.map(item => ({ "prompt": item.promptContent }));
})

const promptList = ref([{ prompt: '让剧情更幽默' }]);
const gridData = computed(() => {
    const start = (currentPage.value - 1) * 10;
    const end = currentPage.value * 10;
    return promptList.value.slice(start, end);
});
const count = computed(() => promptList.value.length);

const prompt = ref('');
const add = () => {
    if (prompt.value === '') return;
    promptList.value.push({ "prompt": prompt.value });
    postPrompt(prompt.value);
    prompt.value = '';
}

const remove = (row) => {
    deletePrompt(row.prompt);
    const index = promptList.value.indexOf(row);
    promptList.value.splice(index, 1);
}

const currentPage = ref(1);
const handleCurrentChange = (val) =>
    currentPage.value = val;

</script>

<style lang="scss" scoped>
$button-gradient-colors: (
    "red": (#ff0000, #ff7f7f),
    "blue": (#0000ff, #7f7fff),
    // Add more colors here
);

@each $prop, $value in $button-gradient-colors {
    .gradient-button-#{$prop} {
        background: linear-gradient(310deg, nth($value, 1) 0%, nth($value, -1) 100%);
        border: none;
    }
}
</style>