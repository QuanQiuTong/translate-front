<script setup lang="ts">
import { ref } from "vue";
import AsideNavBar from "@/components/AsideNavBar.vue";
import Header from "@/components/Header.vue";

import { translate } from "@/request/translate";

let input = ref(""); // 定义一个响应式引用
let res = ref(""); // 定义一个响应式引用

async function asubmit() {
  let r = await translate({
    content: input.value
  });
  res.value = r.data.data;
  console.log(res.value);
}
function submit() {
  let r = translate({
    content: input.value
  });
  console.log(r);
}

import { myUserStore } from "@/store/user";
function showAuthKey(){
  console.log(myUserStore().authKey)
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
          <el-input v-model="res" placeholder="响应内容"></el-input>
        </div>
        <el-button @click="submit()">提交</el-button>
        <el-button @click="showAuthKey()">showAuthKey</el-button>

      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.input-container {
  display: flex;
  gap: 2%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
