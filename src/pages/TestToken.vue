<script setup lang="ts">

import axios from 'axios';
import { he } from 'element-plus/es/locales.mjs';

import { post } from '@/request/tokenRequest'

async function test() {
    var token = localStorage.getItem('token');
    console.log(token);
    post('/trans/submitPassage', {
        content: 'test'
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log("error:")
        console.error(err)
    })

}
function showToken() {
    console.log(localStorage.getItem('token'))
}
</script>

<template>
    <div>
        <el-button @click="test()">test</el-button>
        <el-button @click="showToken()">showToken</el-button>
    </div>
</template>
