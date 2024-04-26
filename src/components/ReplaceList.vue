<template>
    <div class="row" :style="{ paddingRight: '1rem' }">
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
    <div class="mb-2" />
    <el-table :data="gridData">
        <el-table-column label="原词" prop="origin"></el-table-column>
        <el-table-column label="替换词" prop="replace"></el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import axios from "axios";
import SoftButton from "../components/SoftButton.vue";
import { ref } from 'vue'

const getReplace = async (url: string = 'http://localhost:8080/session/getReplace') =>
    axios.post(url,
        { session_id: parseInt(localStorage.sessionID) },
        { headers: { Authorization: localStorage.token } })

const postReplace = (origin: string, replace: string, url: string = 'http://localhost:8080/session/setReplace') => {
    axios.post(url, {
        session_id: parseInt(localStorage.sessionID),
        replace_from: origin,
        replace_to: replace
    }, {
        headers: { Authorization: localStorage.token }
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.error(err)
    })
}

const origin = ref('')
const replace = ref('')
const add = () => {
    if (origin.value === '' || replace.value === '')
        return
    gridData.value.push({ "origin": origin.value, "replace": replace.value })
    postReplace(origin.value, replace.value)
    origin.value = ''
    replace.value = ''
}

getReplace().then(res => {
    console.log(res.data)
    gridData.value = res.data.data.map(
        item => ({ "origin": item.sourceWord, "replace": item.targetWord })
    );
}).catch(err => {
    console.error(err)
})

const gridData = ref([
    {
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
    },
])
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