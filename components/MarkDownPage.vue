<script setup>
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
  const { articleContent } = useParseMd(props.content);
  return articleContent;
});
</script>
<template>
  <div class="cos-md-page">
    <div>{{ info }}</div>
    <div v-html="mdContent"></div>
  </div>
</template>
