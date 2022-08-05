<script lang="ts" setup>
interface SearchResultObj {
  title: string;
  content: string;
  link: string;
}

const props = defineProps({
  showSearchBox: {
    type: Boolean,
    default: false,
  },
  searchFocus: {
    type: Boolean,
    default: false,
  },
});

// 自动聚焦
const searchInput = ref(null);
watch(props, (val) => {
  if (val.searchFocus) {
    setTimeout(() => {
      searchInput.value?.focus();
    }, 50);
  }
});

const { posts } = useAllPost();
const handleFocus = (e: any) => {
  e.target.select();
};
const searchResult = reactive([] as SearchResultObj[]);
const handleInput = (e: any) => {
  const { value } = e.target;
  if (value) {
    posts.map((item, index) => {
      let postContent: any = item.content;
      postContent = postContent.replace(/\n/g, "");
      const matchNumber = postContent.indexOf(value);
      if (matchNumber !== -1) {
        searchResult[index] = {
          content: postContent.slice(
            Math.max(0, matchNumber - 20),
            matchNumber + 100
          ),
          title: item.articleInfo.title || item.title,
          link: `articles/${item.title}.vue`,
        };
      }
    });
  }
};
</script>
<template>
  <div v-if="showSearchBox">
    <input
      w-400px
      h-40px
      text-16px
      leading-40px
      border-rd-20px
      pl-20px
      pr-20px
      @focus="handleFocus"
      @input="handleInput"
      autofocus
      type="search"
      ref="searchInput"
    />
    <div v-for="(item, index) in searchResult" :key="index">
      <div>{{ item.title }}</div>
      <div>{{ item.content }}</div>
    </div>
  </div>
</template>
<style>
</style>
