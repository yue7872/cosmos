<script setup lang="ts">
const props = defineProps({
  post: {
    type: Object,
    default: {},
  },
});

const { post } = props;
</script>
<template>
  <div border-solid mb-10px>
    <NuxtLink :to="`articles/${post.title}.vue`">
      <div>{{ post.articleInfo.title }}</div>
      <div>日期</div>
      <div>分类</div>
    </NuxtLink>
  </div>
</template>
