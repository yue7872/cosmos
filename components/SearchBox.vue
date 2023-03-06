<script lang="ts" setup>
import { useSplitSearch } from '~/composables/useSplitSearch';
interface SearchResultObj {
  title: string
  content: string
  link: string
  searchValue: string
  inTitle?: boolean
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

const handleFocus = (e: EventTarget) => {
  e.target.select();
};

const emit = defineEmits(['customHanlde']);
const jumpClick = () => {
  emit('customHanlde', true);
};
// 搜索逻辑
const { posts } = useAllPost();
const searchResult = reactive([] as SearchResultObj[]);
const handleInput = (e: EventTarget) => {
  const { value } = e.target;
  searchResult.splice(0);
  if (value) {
    posts.map((item) => {
      // search in articleTitle
      if (item.articleInfo.articleTitle.toLowerCase().includes(value)) {
        searchResult.push({
          content: item.articleInfo.outline,
          title: item.articleInfo.articleTitle.toLowerCase(),
          link: `/articles/${item.title}.vue`,
          searchValue: value,
          inTitle: true,
        });
      }
      // search in postContent
      const postContent: string = item.content.replace(/\n/g, '').toLowerCase();
      const matchNumber = postContent.indexOf(value);
      if (matchNumber !== -1) {
        searchResult.push({
          content: postContent.slice(
            Math.max(0, matchNumber - 20),
            matchNumber + 50,
          ),
          title: item.articleInfo.articleTitle || item.title,
          link: `/articles/${item.title}.vue`,
          searchValue: value,
        });
      }
    });
  }
};
</script>
<template>
  <div v-if="showSearchBox" p-50px bg-white b-rd-10px @click.stop="">
    <input
      ref="searchInput"
      w-400px
      h-40px
      text-16px
      leading-40px
      border-rd-20px
      border-2px
      border-black
      pl-20px
      pr-20px
      autofocus
      type="search"
      @focus.stop="handleFocus"
      @input="handleInput"
    >
    <div of-scroll max-h-500px mt-10px class="cosmos-search-results">
      <div
        v-for="(item, index) in searchResult"
        :key="index"
        w-400px
        mt-15px
      >
        <NuxtLink :to="item.link" block @click="jumpClick">
          <div v-if="item.inTitle" font-600 text-18px>
            <span>
              {{ useSplitSearch(item.title,item.searchValue)[0] }}
            </span>
            <span
              text-cosGreen break-all
            >
              {{ item.searchValue }}
            </span>
            <span>
              {{ useSplitSearch(item.title,item.searchValue)[1] }}
            </span>
          </div>
          <div v-else font-600 text-18px>
            {{ item.title }}
          </div>
          <div
            v-for="(arrItem, arrIndex) in useSplitSearch(
              item.content,
              item.searchValue,
            )"
            :key="arrIndex"
            inline
            break-all
          >
            <div inline break-all>
              {{ arrItem }}
            </div>
            <div
              v-if="
                arrIndex !==
                  useSplitSearch(item.content, item.searchValue).length - 1
              "
              inline
              text-cosGreen
              break-all
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
.cosmos-search-results::-webkit-scrollbar {
  width: 0;
}
</style>
