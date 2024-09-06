<template>
    <el-menu :default-active="activeIndex" class="menu-bar" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">中文</el-menu-item>
        <el-menu-item index="2">英语</el-menu-item>
        <el-menu-item index="3">德语</el-menu-item>
        <el-menu-item index="4">日语</el-menu-item>
        <el-menu-item index="5">印地语</el-menu-item>
        <el-menu-item index="0">...</el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { setLanguage } from "../request/pref";
import { getKeyByValue } from "../request/util";

const langMap = {
    1: 'zh',
    2: 'en',
    3: 'de',
    4: 'jp',
    5: "hi",
    0: "default",
}

const activeIndex = ref(getKeyByValue(langMap, localStorage.targetLanguage) ?? "0") // 好像不会被更新
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    if (typeof langMap[key] === 'string')
        localStorage.targetLanguage = langMap[key]
    setLanguage(props.url)
}

const props = defineProps({
    url: {
        type: String,
        default: '/tempPrefer'
    }
})
</script>
