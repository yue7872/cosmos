<script setup>
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  info: {
    type: Object,
    default: () => {},
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
    <div mt-10>
      readingTime: {{ info.readingTime || '<1' }}min
    </div>
    <div v-html="mdContent" />
  </div>
</template>
