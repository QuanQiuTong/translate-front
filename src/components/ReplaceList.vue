<template>
    <div class="d-flex flex-column justify-content-between" style="height: 100%;">

        <el-table :data="gridData" stripe>
            <el-table-column label="原词" prop="origin" sortable />
            <el-table-column label="替换" prop="replace" sortable />
            <el-table-column label="" width="66%">
                <template #default="{ row }">
                    <el-button class="gradient-button-red" type="danger" :icon="Delete" size="small"
                        @click="remove(row)" circle />
                </template>
            </el-table-column>
        </el-table>

        <div>
            <div class="row" :style="{ paddingRight: '2rem' }">
                <div class="col-12 col-lg-5">
                    <input type="text" v-model="origin" class="form-control" placeholder="原词" />
                </div>
                <div class="col-12 col-lg-5">
                    <input type="text" v-model="replace" class="form-control" placeholder="替换词" />
                </div>
                <div class="col-12 col-lg-2">
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

<script lang="ts" setup>
import SoftButton from "../components/SoftButton.vue";
import { Delete } from "@element-plus/icons-vue";
import { ref, computed, watch } from 'vue'
import { getReplace, postReplace, deleteReplace } from '../request/pref'

const props = defineProps({ isUser: { type: Boolean, default: false } })
const url = computed(() => props.isUser ? 'user' : 'session')
const get = async () => {
    const res = await getReplace(url.value);
    console.log(res.data);
    replaceList.value = res.data.data.map(
        item => ({ "origin": item.sourceWord, "replace": item.targetWord })
    );
}
get();
watch(() => props.isUser, get);
const replaceList = ref([{
    origin: 'です',
    replace: 'なのだ',
}, {
    origin: '猫',
    replace: '哈基米',
}, {
    origin: 'Spiderman',
    replace: 'Peter Parker',
}, {
    origin: 'Guten Tag',
    replace: 'Hallo',
},])
const gridData = computed(() => {
    const start = (currentPage.value - 1) * 10;
    const end = currentPage.value * 10;
    return replaceList.value.slice(start, end);
});
const count = computed(() => replaceList.value.length);

const origin = ref(''), replace = ref('')
const add = () => {
    if (origin.value === '' || replace.value === '') return
    replaceList.value.push({ "origin": origin.value, "replace": replace.value })
    postReplace(origin.value, replace.value, url.value)
    origin.value = '', replace.value = ''
}

const remove = (row) => {
    deleteReplace(row.origin, url.value)
    const index = replaceList.value.indexOf(row)
    replaceList.value.splice(index, 1)
}

const currentPage = ref(1);
const handleCurrentChange = (val) => {
    currentPage.value = val;
};
</script>

<style scoped>
.el-table {
    width: 100%;
}

/* .el-table__body-wrapper {
    overflow: auto;
} */
.el-input {
    height: 100%;
    width: 100%;
    border-color: aliceblue;
}

.el-input__inner {
    border-color: transparent;
}

.SoftButton {
    height: 40px;
}
</style>

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