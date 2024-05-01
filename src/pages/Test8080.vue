<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { pa } from 'element-plus/es/locales.mjs';

function post8080() {
  let res = axios.post('http://localhost:8080/user/login', {
    username: 'wange',
    password: '123456'
  })
  console.log(res)
}
const request = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

})
function post0() {
  request.post('/user/login', {
    username: 'wange', password: '123456'
  }).then(res => {
    console.log(res)
  })
}
function post1() {
  let r = request.post('/user/login', {
    username: 'wange', password: '123456'
  })
  console.log(r)
}

function register() {
  request.post('/user/register', {
    username: 'wange',
    password: 'wangecool',
  }).then(res => {
    console.log(res)
  })
}

</script>

<template>
  <div>
    <h1>Test</h1>
    <button @click="post8080">post8080</button><br>
    <button @click="post0">post0</button><br>
    <button @click="post1">post1</button>

    <p>注册</p>
    <el-button @click="register">注册</el-button>
  </div>
</template>