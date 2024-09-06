<template>
  <div class="dictionary-entry">
    <h2>{{ data.word }}</h2>
    <div class="phonetics">
      <h3>Phonetics</h3>
      <ul>
        <li v-for="(phonetic, index) in data.phonetics" :key="index">
          <p>
            {{ phonetic.text }}
            <span class="mx-1" />
            <audio v-show="phonetic.audio" :src="phonetic.audio" controls></audio>
            <span class="mx-1" />
            <a v-show="phonetic.sourceUrl" :href="phonetic.sourceUrl" target="_blank">Source</a>
          </p>
          <!-- <span v-if="phonetic.license">
            License: <a :href="phonetic.license.url" target="_blank">{{ phonetic.license.name }}</a>
          </span> -->
        </li>
      </ul>
    </div>
    <div class="meanings">
      <h3>Meanings</h3>
      <div v-for="(meaning, index) in data.meanings" :key="index">
        <h4>{{ meaning.partOfSpeech }}</h4>
        <ul>
          <li v-for="(definition, defIndex) in meaning.definitions" :key="defIndex">
            <p>{{ definition.definition }}</p>
          </li>
          <h5 v-if="meaning.synonyms.length">Synonyms: <p>{{ meaning.synonyms.join(', ') }}</p>
          </h5>
          <h5 v-if="meaning.antonyms.length">Antonyms: <p>{{ meaning.antonyms.join(', ') }}</p>
          </h5>
        </ul>
      </div>
    </div>
    <!-- <div v-if="data.license" class="license">
      <h3>License</h3>
      <a :href="data.license.url" target="_blank">{{ data.license.name }}</a>
    </div> -->
    <div class="source-urls">
      <h5>Source URLs</h5>
      <ul>
        <li v-for="(url, index) in data.sourceUrls" :key="index">
          <a :href="url" target="_blank">{{ url }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DictionaryEntry',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.dictionary-entry {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.phonetics,
.meanings,
.license,
.source-urls {
  margin-bottom: 20px;
}

h2,
h3,
h4,
h5 {
  color: #333;
}

audio {
  height: 20px;
}
</style>