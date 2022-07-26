<script setup lang="ts">
const route = useRoute();
const articleId = route.params.id as string;

const mdPath: string = `../../articles/${articleId.replace(".vue", ".md")}`;
// @ts-ignore-disable-next-line
const articleList = import.meta.glob("../../articles/*.md", {
  as: "raw",
});

const mdContent: any = articleList[mdPath];
const { article, articleInfo } = useMd(mdContent);

useHead({
  title: `${articleInfo.title} - ${articleInfo.categories}`,
});
</script>
<template>
  <MarkDownPage :content="article" :info="articleInfo" />
</template>
