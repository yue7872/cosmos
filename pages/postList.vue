<script setup lang="ts">
const route = useRoute();
definePageMeta({
  layout: "default",
  title: "文章列表",
});

useHead({
  title: `${route.meta.title} - Cosmos`,
});

// TODO：文章列表上传数据库而非本地查询
// @ts-ignore-disable-next-line
const articleList = import.meta.glob("../articles/*.md", {
  as: "raw",
});

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
