<script setup>
import SoftButton from "@/components/SoftButton.vue";
import SourceLanguage from "@/components/SourceLanguage.vue";
import TargetLanguage from "@/components/TargetLanguage.vue";
import ReplaceList from "@/components/ReplaceList.vue";

import { onMounted, ref } from "vue";
import { initPreferences } from "../request/pref";
import { initializeSession } from "../request/session";
import { translate } from "@/request/translate.ts";
import { ElMessage } from "element-plus";


onMounted(() => {
  initPreferences();
  initializeSession();
});

let input = ref("");
let out = ref("");
const submit = () => {
  console.log('submit:\n' + input.value);
  translate(input.value)
    .then((res) => {
      console.log(res.data);
      out.value = res.data.data;
    })
    .catch((err) => {
      console.error(err);
      ElMessage.error(res.data.message);
    });
};

const drawer = ref(false);
const viewReplace = () => {
  drawer.value = true;
};

</script>

<template>
  <el-drawer v-model="drawer" title="替换词">
    <ReplaceList />
  </el-drawer>

  <div class="container-fluid py-1">

    <div class="row">
      <div class="col-12 col-lg-6">
        <SourceLanguage />
        <textarea v-model="input" class="form-control" placeholder="输入待翻译的文本"
          :autosize="{ minRows: 40, maxRows: 50 }" />
        <div class="mb-2" />
        <SoftButton variant="gradient" color="success" @click="submit">
          提交
        </SoftButton>
      </div>

      <div class="col-12 col-lg-6">
        <TargetLanguage />
        <textarea v-model="out" class="form-control" placeholder="翻译结果" autosize />
        <div class="mb-2" />
        <SoftButton variant="gradient" @click="viewReplace">替换词</SoftButton>
      </div>
    </div>
  </div>
</template>
