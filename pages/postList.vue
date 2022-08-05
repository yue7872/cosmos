<script setup lang="ts">
const route = useRoute();
definePageMeta({
  layout: "default",
  title: "文章列表",
});

useHead({
  title: `${route.meta.title} - Cosmos`,
});

const { posts } = useAllPost();
</script>
<template>
  <div>
    <div v-for="(post, index) in posts" :key="index">
      <PostCard :post="post" />
    </div>
  </div>
</template>
