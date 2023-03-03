<script setup lang="ts">
import MarkDownPage from '~/components/MarkDownPage.vue';
const route = useRoute();
const articleId = route.params.id as string;

const mdPath = `../articles/${articleId.replace('.vue', '.md')}`;
const githubPath = `https://github.com/yue7872/cosmos/edit/master/${mdPath.replace('../', '')}`;

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
  <MarkDownPage
    :content="article"
    :info="articleInfo"
    :editPath="githubPath"
  />
  <div
    mt-2 pt-6 b-gray-200 b-t-2px b-t-solid
  />
  <CommentArea />
</template>
<style>
@import url(~/assets/solarized/solarized.css);
</style>
