<script setup lang="ts">
const route = useRoute();
const articleId = route.params.id as string;

const mdPath = `../articles/${articleId.replace('.vue', '.md')}`;
const { articleList } = useAllPost();

const mdContent: any = articleList[mdPath];
const { article, articleInfo } = useMd(mdContent);

useHead({
  title: `${articleInfo.articleTitle} - ${articleInfo.categories}`,
});

// 打开博客默认滚动的bug
onMounted(() => {
  document.documentElement.scrollTop = 0;
});
</script>
<template>
  <MarkDownPage :content="article" :info="articleInfo" />
</template>
<style>
@import url(~/assets/solarized/solarized.css);
</style>
