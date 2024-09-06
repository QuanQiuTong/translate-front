<template>
    <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <span>历史记录</span>
        <el-button class="gradient-green" type="danger" @click="create">
            <span>新建会话</span>
            <span class="mx-2" />
            <i class="fas fa-arrow-right"></i>
        </el-button>
    </div>

    <el-table :data="gridData">
        <el-table-column label="ID" prop="id" width="50%" />
        <!-- <el-table-column label="源语言" prop="src" /> -->
        <!-- <el-table-column label="目标语言" prop="tgt" /> -->
        <el-table-column label="概要" prop="outline" width="240%"/>
        <el-table-column label="操作" width="120%">
            <template #default="{ row }">
                <el-button :class="row.starred ? 'gradient-yellow' : 'transparent'" type="danger" :icon="Star"
                    size="small" @click="star(row)" circle />
                <el-button class="gradient-blue" type="danger" :icon="Position" size="small" @click="sel(row)" circle />
                <el-button class="gradient-red" type="danger" :icon="Delete" size="small" @click="del(row)" circle />
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { Position, Delete, Star } from "@element-plus/icons-vue";
import { ref } from 'vue'
import { getSessionList, newSession, delSession, starSession, unstarSession } from "../request/session";

const gridData = ref([
    { id: "0", src: "en", tgt: "zh", starred: false, outline: "I love cat." },
])

getSessionList().then(res => {
    console.log(res.data.data)
    gridData.value = res.data.data.map(item => ({
        "id": item.sessionId,
        "src": item.sourceLanguage,
        "tgt": item.targetLanguage,
        "starred": item.star,
        "outline": item.title
    })
    );
})

const create = () =>
    newSession().then(res => {
        console.log(res.data)
        localStorage.sessionID = res.data.data
        location.href = '/translate'
    })

const sel = (row) => {
    localStorage.sessionID = row.id
    location.href = '/translate'
}

const del = async (row) => {
    if (gridData.value.length === 1) {
        alert("至少保留一个会话")
        return
    }
    await delSession(row.id)
    gridData.value.splice(gridData.value.indexOf(row), 1);
    if (row.id === localStorage.sessionID) {
        localStorage.sessionID = gridData.value[gridData.value.length - 1].id
        location.href = '/translate'
    }
}

const star = (row) => {
    console.log('star', row)
    if (row.starred) {
        unstarSession(row.id)
        row.starred = false
    } else {
        starSession(row.id)
        row.starred = true
    }
}

</script>

<style scoped>
/*non-empty to make IntelliSense happy */
.transparent {
    background: transparent;
    border: none;
    color: black;
}
</style>

<style lang="scss" scoped>
$button-gradient-colors: (
    "red": (#ff0000, #ff7f7f),
    "blue": (#0000ff, #7f7fff),
    "green": (#3bdc3b, #9ceb47),
    "yellow": (#e9c601, #fff281),
    // Add more colors here
);

@each $prop, $value in $button-gradient-colors {
    .gradient-#{$prop} {
        background: linear-gradient(310deg, nth($value, 1) 0%, nth($value, -1) 100%);
        border: none;
    }
}
</style>