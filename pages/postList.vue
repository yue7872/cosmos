<script setup lang="ts">
const route = useRoute();
definePageMeta({
  layout: "default",
  title: "文章列表",
});

useHead({
  title: `${route.meta.title} - Cosmos`,
});

// @ts-ignore-disable-next-line
const articleList = import.meta.glob("../articles/*.md", {
  as: "raw",
});

const pathList = Object.keys(articleList);

const posts = [];

pathList.map((items) => {
  const postContent: any = articleList[items];
  const { articleInfo } = useMd(postContent);
  const postName = items.replace("../articles/", "").replace(".md", "");
  posts.push({ title: postName, articleInfo });
});
</script>
<template>
  <div>
    <div v-for="(post, index) in posts" :key="index">
      <NuxtLink :to="`articles/${post.title}.vue`">{{
        post.articleInfo.title
      }}</NuxtLink>
    </div>
  </div>
</template>
