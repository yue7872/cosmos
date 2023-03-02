<script setup lang="ts">
import Giscus from '@giscus/vue';
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
  <Giscus
    repo="yue7872/cosmos"
    repo-id="R_kgDOHrpTpA"
    category="Announcements"
    category-id="DIC_kwDOHrpTpM4CUlyw"
    mapping="pathname"
    strict="0"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    theme="preferred_color_scheme"
    lang="zh-CN"
  />
</template>
<style>
@import url(~/assets/solarized/solarized.css);
</style>
