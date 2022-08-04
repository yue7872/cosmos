<script setup lang="ts">
const route = useRoute();
definePageMeta({
  layout: "default",
  title: "文章列表",
});

useHead({
  title: `${route.meta.title} - Cosmos`,
});

const articleList = useAllPost();

const posts: PostDetail[] = [];
const pathList = Object.keys(articleList);
pathList.map((items) => {
  const postContent: any = articleList[items];
  const { article, articleInfo } = useMd(postContent);
  const postName = items.replace("../articles/", "").replace(".md", "");
  posts.push({ title: postName, articleInfo, content: article });
});
</script>
<template>
  <div>
    <div v-for="(post, index) in posts" :key="index">
      <PostCard :post="post" />
    </div>
  </div>
</template>
