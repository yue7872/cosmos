<script setup lang="ts">
const router = useRouter();
const goHome = () => {
  router.push("/");
};
const showSearch = ref(false);
const searchFocus = ref(false);
const handleSearch = () => {
  searchFocus.value = !searchFocus.value;
  showSearch.value = !showSearch.value;
};
</script>
<template>
  <div flex justify-between h-60px relative>
    <div flex items-center cursor-pointer @click="goHome">
      <img src="~/assets/img/logo.png" alt="cosmos" w-32px h-32px />
      <div ml-10px font-serif font-medium>Cosmos</div>
    </div>
    <div flex items-center font-serif select-none>
      <div mr-10px cursor-pointer @click="handleSearch">search</div>
      <NuxtLink to="/postList">blog</NuxtLink>
      <NuxtLink to="/hello" ml-10px>Hello</NuxtLink>
      <NuxtLink to="/aa" ml-10px>aa</NuxtLink>
    </div>
    <div w-100% flex justify-center absolute>
      <SearchBox
        :showSearchBox="showSearch"
        :searchFocus="searchFocus"
        absolute
        top-100px
      />
    </div>
  </div>
</template>
