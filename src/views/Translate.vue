<script setup>
import MyNavBar from "@/components/MyNavBar.vue";
import SoftButton from "@/components/SoftButton.vue";
import SourceLanguage from "@/components/SourceLanguage.vue";
import SelectStyle from "@/components/SelectStyle.vue";
import TargetLanguage from "@/components/TargetLanguage.vue";
import ReplaceList from "../components/ReplaceList.vue";
import HistoryList from "../components/HistoryList.vue";
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const body = document.getElementsByTagName("body")[0];

onBeforeMount(() => { // 取消侧边栏和上下
  store.commit('toggleEveryDisplay')
  store.commit('toggleHideConfig')
  body.classList.remove("bg-gray-100");
})

onBeforeUnmount(() => {
  store.commit('toggleEveryDisplay')
  store.commit('toggleHideConfig')
  body.classList.add("bg-gray-100");
})

import { initPreferences, postPrompt } from "../request/pref";
import { initializeSession } from "../request/session";
import { queryDict, translate, modify } from "../request/translate.ts";


const input = ref(""), out1 = ref(""), out2 = ref("");
const ori1 = ref(""), ori2 = ref(""), prompt = ref("");

const CHUNK_SIZE = 500;
const longSubmit = async (tool = 0, ori, out) => {
  ori.value = out.value = ""
  for (
    let cur = 0, pretext = "";
    cur < input.value.length;
    cur += CHUNK_SIZE
  ) {
    const chunk = input.value.slice(cur, cur + CHUNK_SIZE);
    const res = await translate(chunk, tool, pretext);
    out.value += res.content;
    pretext = res.preText;
  }
  ori.value = out.value;
}
const submit = () => {
  console.log("submit:\n", input.value)
  longSubmit(0, ori1, out1)

  //longSubmit(1, ori2, out2)
  translate(input.value, 1, "")
    .then(res => ori2.value = out2.value = res)
}

const submit1 = async () => prompt.value = await modify(input.value, ori1.value, out1.value)

const showReplace = ref(false), showHistory = ref(false);
const dictPosition = ref({ top: 10, left: 10 }), dictVisible = ref(false);
const dict = ref(""), dictEntry = ref({}), syn = ref({});

import { selText, calcPos, brief, synonym } from "../request/util.ts";

const selectText = async (e, lang = "en") => {
  const text = selText(e.target);
  if (text.length === 0 || text.length > 20) return;
  dictEntry.value = await queryDict(text, lang);
  if (!dictEntry.value) return;
  dict.value = brief(dictEntry.value);
  dictPosition.value = calcPos(e.target);
  dictVisible.value = true;
  syn.value = synonym(dictEntry.value);
  console.log("syn:\n", syn.value);
};

const handleClickOutside = (e) => {
  const dictElement = document.querySelector('.dict');
  if (dictElement && !dictElement.contains(e.target))
    dictVisible.value = false;
};
document.addEventListener('click', handleClickOutside);
onUnmounted(() => document.removeEventListener('click', handleClickOutside));

onMounted(() => {
  initPreferences();
  initializeSession().then(outline => {
    if (outline.sourcePassage) {
      input.value = outline.sourcePassage;
      translate(input.value, 1, "")
        .then(res => ori2.value = out2.value = res)
    }
    if (outline.targetPassage) out1.value = outline.targetPassage;
  })
});

</script>

<template>
  <div v-show="dictVisible" class="dict" :style="{ top: `${dictPosition.top}px`, left: `${dictPosition.left}px` }">
    {{ dict }}
    <router-link to="/dictionary">
      <i class="fa fa-book opacity-6 me-1 text-dark" aria-hidden="true" />
    </router-link>
  </div>

  <div class="container top-0 z-index-sticky">
    <div class="row">
      <MyNavBar is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow" btn-background="bg-gradient-success"
        :dark-mode="true" />
    </div>
  </div>
  <div style="margin-bottom: 5rem;" />
  <el-drawer v-model="showReplace" title="替换词" size="36%" direction="ltr">
    <ReplaceList />
  </el-drawer>
  <!-- TODO: 仿照ChatGPT等的api，加一个sidenav -->
  <el-drawer v-model="showHistory" title="历史记录" size="36%" direction="rtl" :with-header="false">
    <HistoryList />
  </el-drawer>

  <div class="container-fluid">

    <div class="row">
      <div class="col-12 col-lg-6">
        <SourceLanguage />
        <textarea ref="textarea" v-model="input" class="form-control long" placeholder="输入待翻译的文本"
          @mouseup="selectText($event)" />
        <div class="mb-2" />

        <SoftButton variant="gradient" color="success" @click="submit">提交</SoftButton>
        <span class="mx-2" />
        <SoftButton variant="gradient" color="success" @click="submit1">修改</SoftButton>
        <span class="mx-2" />
        <SoftButton variant="gradient" color="info" @click="showReplace = true">替换词</SoftButton>
        <span class="mx-2" />
        <SoftButton variant="gradient" color="info" @click="showHistory = true">历史记录</SoftButton>
        <div class="mb-2" />

        <div class="row">
          <div class="col-8">
            <input v-model="prompt" class="form-control" placeholder="学到的风格 或输入偏好" />
          </div>
          <div class="col-4">
            <SoftButton variant="gradient" color="success" @click="postPrompt(prompt)">自定义偏好</SoftButton>
          </div>
        </div>
        <div class="mb-2" />
        <!-- <el-card :style="{ width: textareaWidth + 'px' }">
          <DictEntry :data="dictEntry" />
        </el-card> -->
        <li v-for="(synonyms, partOfSpeech) in syn" :key="partOfSpeech">
          <h4>{{ partOfSpeech }}</h4>
          <div style="display: flex; flex-wrap: wrap;">
            <p v-for="synonym in synonyms" :key="synonym" style="margin-right: 10px;">{{ synonym }}</p>
          </div>
        </li>
      </div>

      <div class="col-12 col-lg-6">
        <div class="row">
          <div class="col-3 col-lg-2">
            <SelectStyle />
          </div>
          <div class="col-9 col-lg-10">
            <TargetLanguage />
          </div>
        </div>
        <textarea v-model="out1" class="form-control long" placeholder="翻译结果" autosize
          @mouseup="selectText($event, 'zh')" />
        <textarea v-model="out2" class="form-control long" placeholder="翻译结果" autosize
          @mouseup="selectText($event, 'zh')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dict {
  position: absolute;
  z-index: 1000;
  background-color: white;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.menu-bar {
  height: 36px;
  background-color: transparent;
  margin-left: 5px;
  margin-right: 5px;
}

.long {
  width: 100%;
  box-sizing: border-box;
  height: auto;
  min-height: 40vh;
  overflow-y: auto;
  max-height: 78vh;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  /* 增加阴影范围 */
  margin-bottom: 0.5rem;
}

.el-card {
  margin-top: 0rem;
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
  max-height: 78vh;
  overflow-y: auto;
  border-radius: 10px;
}

.dictionary-entry {
  overflow-x: auto;
  /* 如果内容宽度超过卡片宽度，则显示滚动条 */
}
</style>
