<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { useStore } from "vuex";

const store = useStore()
const body = document.getElementsByTagName("body")[0];

onBeforeMount(() => {
  store.commit('toggleEveryDisplay')
  store.commit('toggleHideConfig')
  body.classList.remove("bg-gray-100");
})

onBeforeUnmount(() => {
  store.commit('toggleEveryDisplay')
  store.commit('toggleHideConfig')
  body.classList.add("bg-gray-100");
})


import MyNavBar from "../components/MyNavBar.vue";
import ReplaceList from "../components/ReplaceList.vue";
import PromptList from "../components/PromptList.vue";
import HistoryList from "../components/HistoryList.vue";
</script>

<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <MyNavBar is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow" btn-background="bg-gradient-success"
        :dark-mode="true" />
    </div>
  </div>
  <div style="margin-top: 5rem;" />

  <div style="margin-left: 1rem; margin-right: 1rem;">
    <div class="row" style="height: calc(99vh - 5rem);">
      <div class="col-md-4">
        <ReplaceList />
      </div>
      <div class="col-md-4">
        <PromptList />
      </div>
      <div class="col-md-4">
        <HistoryList />
      </div>
    </div>
  </div>


</template>