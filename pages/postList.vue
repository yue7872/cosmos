<script setup lang="ts">
const route = useRoute();
definePageMeta({
  layout: 'default',
  title: '文章列表',
});
useHead({
  title: `${route.meta.title} - Cosmos`,
});

const { posts } = useAllPost();
const sortList = ['latest', 'readingTime', 'oldest', 'random'];
const sortIndex = ref(0);
const sortedPosts = ref(posts);

// 文章排序
const handleSortPosts = (idx: number) => {
  sortIndex.value = idx;
  switch (idx) {
    case 0:
      sortedPosts.value = posts.sort((a, b) => b.articleInfo.timestamp - a.articleInfo.timestamp);
      break;
    case 1:
      sortedPosts.value = posts.sort((a, b) => b.articleInfo.readingTime - a.articleInfo.readingTime);
      break;
    case 2:
      sortedPosts.value = posts.sort((a, b) => a.articleInfo.timestamp - b.articleInfo.timestamp);
      break;
    case 3:
      sortedPosts.value = posts.sort(() => Math.random() - 0.5);
      break;
  }
};
</script>
<template>
  <div w-40vw ma>
    <div>
      Sort By
    </div>
    <div text-3xl flex gap2 mb-20>
      <!-- TODO: 添加hotest排序 -->
      <div
        v-for="(item, idx) in sortList"
        :key="idx"
        sort-item
        :class="[{'sort-active': sortIndex===idx}]"
        @click="handleSortPosts(idx)"
      >
        {{ item }}
      </div>
    </div>
    <div v-for="(post, index) in sortedPosts" :key="index">
      <PostCard :post="post" />
    </div>
  </div>
</template>
