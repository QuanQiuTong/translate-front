<script setup lang="ts">
import { ref } from "vue";
import AsideNavBar from "@/components/AsideNavBar.vue";
import Header from "@/components/Header.vue";

import { translate } from "@/request/translate";

let input = ref(""); // 定义一个响应式引用
let out = ref(""); // 定义一个响应式引用

import { request } from "@/request/translate";
async function asubmit() {
  translate(input.value)
    .then(res => { out.value = res.data.data })
    .catch(err => { console.error(err) })
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
        <div class="input-container">
          <el-input v-model="input" placeholder="请输入内容" :autosize="{ minRows: 10, maxRows: 50 }" type="textarea"
            clearable></el-input>
          <el-input v-model="out" placeholder="响应内容" autosize type="textarea"></el-input>
        </div>
        <el-button @click="asubmit()">提交</el-button>
        <el-button @click="showToken()">showToken</el-button>
        <br><br><br><br>

      </el-main>
      <br>
    </el-container>
    <el-container>
      <el-aside width="150px"></el-aside>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <el-input style="width: 40%"></el-input>
        <el-text>换为</el-text>
        <el-input style="width: 40%"></el-input>
        <el-button>替换</el-button>
      </div>
    </el-container>
  </el-container>
</template>

<style scoped>
.input-container {
  display: flex;
  gap: 2%;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
}
</style>
