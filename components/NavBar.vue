<script setup lang="ts">
const router = useRouter();
const goHome = () => {
  router.push('/');
};

const showSearch = ref(false);
const searchFocus = ref(false);

// 搜索状态切换
const handleSearch = async() => {
  showSearch.value = !showSearch.value;
  // dom更新后再聚焦
  await nextTick();
  searchFocus.value = !searchFocus.value;
};

const hideSearch = (val) => {
  val && handleSearch();
};

watch(showSearch, (val) => {
  useBodyScroll(val);
});

const showTitleInNav = ref(false);
const isArticles = ref(false);
const postTitle = ref('');
watch(
  () => router.currentRoute.value.path,
  (val) => {
    isArticles.value = val.includes('/articles/');
    postTitle.value = val.replace('/articles/', '').replace('.vue', '');
    if (!isArticles.value)
      showTitleInNav.value = false;
  },
  { immediate: true },
);
onMounted(() => {
  document.addEventListener('scroll', () => {
    const { scrollTop } = document.documentElement;
    if (scrollTop > 40) {
      if (!showTitleInNav.value && isArticles.value)
        showTitleInNav.value = true;
    }
    else if (showTitleInNav.value && isArticles.value) {
      showTitleInNav.value = false;
    }
  });
});
</script>
<template>
  <div>
    <div
      flex
      justify-between
      h-60px
      fixed
      w-full
      top-0
      left-0
      pl-32px
      pr-32px
      nav
    >
      <div flex items-center cursor-pointer @click="goHome">
        <img src="~/assets/img/logo.png" alt="cosmos" w-32px h-32px>
        <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
        <div ml-10px font-serif font-medium>
          Cosmos
        </div>
        <div
          cursor-auto
          ml-10px
          text-cosLight
          class="nav-title"
          :class="showTitleInNav ? 'nav-title-show' : 'nav-title-hide'"
        >
          {{ postTitle }}
        </div>
      </div>
      <div flex items-center font-serif select-none>
        <div mr-10px cursor-pointer class="hover-color-#009966" @click="handleSearch">
          search
        </div>
        <NuxtLink to="/postList">
          blog
        </NuxtLink>
        <NuxtLink to="/hello" ml-10px>
          Hello
        </NuxtLink>
        <NuxtLink to="/aa" ml-10px>
          aa
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="showSearch"
      w-100vw
      flex
      justify-center
      absolute
      left-0
      top-0
      h-100vh
      bg-mask
      z-9999
      @click="handleSearch"
    >
      <SearchBox
        :show-search-box="showSearch"
        :search-focus="searchFocus"
        absolute
        top-100px
        @customHanlde="hideSearch"
      />
    </div>
  </div>
</template>
