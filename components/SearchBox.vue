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
  val.searchFocus && searchInput.value?.focus();
});

const handleFocus = (e: any) => {
  e.target.select();
};

const emit = defineEmits(["customHanlde"]);
const jumpClick = () => {
  emit("customHanlde", true);
};
// 搜索逻辑
const { posts } = useAllPost();
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
    <div of-scroll max-h-500px>
      <div
        v-for="(item, index) in searchResult"
        :key="index"
        w-400px
        border-b-red
        border-b
      >
        <NuxtLink :to="item.link" @click="jumpClick" block>
          <div>{{ item.title }}</div>
          <div
            v-for="(arrItem, arrIndex) in useSplitSearch(
              item.content,
              item.searchValue
            )"
            :key="arrIndex"
            inline
            break-all
          >
            <div inline break-all>{{ arrItem }}</div>
            <div
              inline
              text-red
              break-all
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
  </div>
</template>
<style>
</style>
