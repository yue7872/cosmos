<script setup lang="ts">
const props = defineProps({
  post: {
    type: Object,
    default: {},
  },
});

const post: PostDetail = props.post;
const { title, articleInfo } = post;
</script>
<template>
  <div border-solid mb-10px>
    <NuxtLink :to="`articles/${title}.vue`">
      <div hover-color-red>{{ articleInfo.title }}</div>
      <div>日期</div>
      <div>分类</div>
      <div color-coolGray>{{ articleInfo }}</div>
      <div v-if="articleInfo.outline">摘要：{{ articleInfo.outline }}</div>
    </NuxtLink>
  </div>
</template>
