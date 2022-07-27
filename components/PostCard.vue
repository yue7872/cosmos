<template>
  <div
    mb-20px
    p-30px
    border-rd-20px
    min-h-200px
    box-border
    cursor-pointer
    flex
    justify-center
    flex-col
    class="posts-item-box"
  >
    <NuxtLink :to="`articles/${title}.vue`">
      <div hover-color-red font-medium text-28px>{{ articleInfo.title }}</div>
      <div>日期</div>
      <div>分类</div>
      <div color-coolGray>{{ articleInfo }}</div>
      <div v-if="articleInfo.outline">摘要：{{ articleInfo.outline }}</div>
    </NuxtLink>
  </div>
</template>
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
<style lang="less">
.posts-item-box {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
  &:hover {
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.15);
  }
}
</style>
