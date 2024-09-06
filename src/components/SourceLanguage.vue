<template>
    <el-menu :default-active="activeIndex" class="menu-bar" mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">自动识别</el-menu-item>
        <el-menu-item index="1">英语</el-menu-item>
        <el-menu-item index="2">中文</el-menu-item>
        <el-sub-menu index="3">
            <template #title>其他</template>
            <el-menu-item index="3-0">德语</el-menu-item>
            <el-menu-item index="3-1">日语</el-menu-item>
            <el-menu-item index="3-2">印地语</el-menu-item>
            <!-- <el-sub-menu index="3-3">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu> -->
            <el-menu-item index="3-3">...</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { setLanguage } from "../request/pref";
import { getKeyByValue } from "../request/util";

const langMap = {
    0: 'auto',
    1: 'en',
    2: 'zh',
    "3-0": 'de',
    "3-1": "jp",
    "3-2": "hi",
}

const activeIndex = ref(getKeyByValue(langMap, localStorage.targetLanguage) ?? "0") // 好像不会被更新
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    if (typeof langMap[key] === 'string')
        localStorage.sourceLanguage = langMap[key]
    setLanguage(props.url)
}

const props = defineProps({
    url: {
        type: String,
        default: '/tempPrefer'
    }
})
</script>