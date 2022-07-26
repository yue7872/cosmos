<script setup lang="ts">
import { marked, parse } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  info: {
    type: Object,
    default: "",
  },
});
const mdContent = computed(() => {
  return parse(props.content);
});
</script>
<template>
  <div class="cos-md-page">
    <div>{{ info }}</div>
    <div v-html="mdContent"></div>
  </div>
</template>
