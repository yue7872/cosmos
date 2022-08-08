<script lang="ts" setup>
import { useSplitSearch } from "~/composables/useSplitSearch";
interface SearchResultObj {
  title: string;
  content: string;
  link: string;
  searchValue: string;
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
  searchResult.splice(0);
  if (value) {
    posts.map((item) => {
      const postContent: any = item.content.replace(/\n/g, "").toLowerCase();
      const matchNumber = postContent.indexOf(value);
      if (matchNumber !== -1) {
        searchResult.push({
          content: postContent.slice(
            Math.max(0, matchNumber - 20),
            matchNumber + 50
          ),
          title: item.articleInfo.title || item.title,
          link: `/articles/${item.title}.vue`,
          searchValue: value,
        });
      }
    });
  }
};
</script>
<template>
  <div v-if="showSearchBox" p-50px bg-white @click.stop="">
    <input
      w-400px
      h-40px
      text-16px
      leading-40px
      border-rd-20px
      border-2px
      border-black
      pl-20px
      pr-20px
      @focus.stop="handleFocus"
      @input="handleInput"
      autofocus
      type="search"
      ref="searchInput"
    />
    <div
      v-for="(item, index) in searchResult"
      :key="index"
      w-400px
      border-b-red
      border-b
    >
      <NuxtLink :to="item.link">
        <div>{{ item.title }}</div>
        <div
          v-for="(arrItem, arrIndex) in useSplitSearch(
            item.content,
            item.searchValue
          )"
          :key="arrIndex"
          inline
        >
          <div inline>{{ arrItem }}</div>
          <div
            inline
            text-red
            v-if="
              arrIndex !==
              useSplitSearch(item.content, item.searchValue).length - 1
            "
          >
            {{ item.searchValue }}
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<style>
</style>
