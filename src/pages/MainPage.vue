<script setup lang="ts">
import { ref } from "vue";
import AsideNavBar from "@/components/AsideNavBar.vue";
import Header from "@/components/Header.vue";

import { translate } from "@/request/translate";

let input = ref(""); // 定义一个响应式引用
let out = ref(""); // 定义一个响应式引用

async function asubmit() {
  translate({content:input.value},null)
  .then(res => {
    console.log(res.data)
    out.value = res.data.data
  }).catch(err => {
    console.log("error:")
    console.error(err)
  })
}

import axios from 'axios';
import { AxiosHeaders } from "node_modules/axios/index.cjs";
async function bsubmit() {
  console.log(localStorage.getItem('token'));
  

  axios.post('http://localhost:8080/trans/submitPassage', {
    content: input.value
  },
    {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then(res => {
      console.log(res.data)
      out.value = res.data.data
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
  <el-container>
    <el-header>
      <Header> </Header>
    </el-header>
    <el-container>
      <el-aside width="120px">
        <AsideNavBar></AsideNavBar>
      </el-aside>
      <el-main>
        <el-link type="primary" :underline="false" href="/signin">登录</el-link>

        <el-link type="primary" :underline="false" href="/register">&nbsp;&nbsp;&nbsp;注册</el-link><br />
        <div class="input-container">
          <el-input v-model="input" placeholder="请输入内容" :autosize="{ minRows: 10, maxRows: 50 }" type="textarea"
            clearable></el-input>
          <el-input v-model="out" placeholder="响应内容"></el-input>
        </div>
        <el-button @click="asubmit()">提交</el-button>
        <el-button @click="bsubmit()">提交2</el-button>
        <!-- <el-button @click="showToken()">showToken</el-button> -->

      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.input-container {
  display: flex;
  gap: 2%;
  justify-content: center;
  align-items: flex-start; /* Modify this line */
  margin-top: 10px;
}
</style>
