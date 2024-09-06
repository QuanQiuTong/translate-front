<template>
    <div class="container top-0 position-sticky z-index-sticky">
        <div class="row">
            <MyNavBar is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
                btn-background="bg-gradient-success" :dark-mode="true" />
        </div>
    </div>
    <div style="margin-bottom: 5rem;" />
    <div class="row" style="margin-left: 2rem; margin-right: 2rem;">
        <div class="col-3">
            <input v-model="input" style="font-size: 1.2rem;" class="form-control" placeholder="输入单词" />
        </div>
        <div class="col-2">
            <SoftButton variant="gradient" color="success" @click="search">查询</SoftButton>
        </div>
        <div class="col-7">
            <el-pagination :current-page="currentPage" @update:current-page="handleChange" :total="count"
                :pager-count="11" :default-page-size="1" :style="{ marginTop: '0.5rem' }" />
        </div>
    </div>

    <DictEntry :data="data[currentPage - 1]" style="margin-left: 2rem; margin-right: 2rem;"/>

</template>

<script setup>
import MyNavBar from '../components/MyNavBar.vue';
import SoftButton from '../components/SoftButton.vue';
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex'
import DictEntry from '../components/DictEntry.vue';

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


const count = ref(1), currentPage = ref(1);
const handleChange = (val) => {
    currentPage.value = val;
}

const input = ref('');

const search = async () => {
    data.value = await queryDicts(input.value, "en");
    count.value = data.value.length;
    currentPage.value = 1;
    console.log(count.value);
}

const data = ref([{
  "word": "example",
  "phonetic": "/əɡˈzæmpl̩/",
  "phonetics": [
    {
      "text": "/əɡˈzæmpl̩/",
      "audio": ""
    },
    {
      "text": "/ɘɡˈzɐːmpɯ/",
      "audio": ""
    },
    {
      "text": "/ɪɡˈzɑːmpl̩/",
      "audio": ""
    },
    {
      "text": "/əɡˈzæmpl̩/",
      "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/example-us.mp3",
      "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=267013"
    }
  ],
  "meanings": [
    {
      "partOfSpeech": "noun",
      "definitions": [
        {
          "definition": "Something that is representative of all such things in a group.",
          "synonyms": [],
          "antonyms": []
        },
        {
          "definition": "Something that serves to illustrate or explain a rule.",
          "synonyms": [],
          "antonyms": []
        },
        {
          "definition": "Something that serves as a pattern of behaviour to be imitated (a good example) or not to be imitated (a bad example).",
          "synonyms": [],
          "antonyms": []
        },
        {
          "definition": "A person punished as a warning to others.",
          "synonyms": [],
          "antonyms": []
        },
        {
          "definition": "A parallel or closely similar case, especially when serving as a precedent or model.",
          "synonyms": [],
          "antonyms": []
        },
        {
          "definition": "An instance (as a problem to be solved) serving to illustrate the rule or precept or to act as an exercise in the application of the rule.",
          "synonyms": [],
          "antonyms": []
        }
      ],
      "synonyms": [],
      "antonyms": []
    },
    {
      "partOfSpeech": "verb",
      "definitions": [
        {
          "definition": "To be illustrated or exemplified (by).",
          "synonyms": [],
          "antonyms": []
        }
      ],
      "synonyms": [],
      "antonyms": []
    }
  ],
  "license": {
    "name": "CC BY-SA 3.0",
    "url": "https://creativecommons.org/licenses/by-sa/3.0"
  },
  "sourceUrls": [
    "https://en.wiktionary.org/wiki/example"
  ]
},]);

</script>

<style scoped>
.el-pagination {
    background-color: transparent;
}
</style>