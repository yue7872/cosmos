<script setup>
const route = useRoute();

definePageMeta({
  layout: "default",
  title: "首页",
});
// const router = useRouter();
// console.log(router.getRoutes());
useHead({
  title: `${route.meta.title} - Cosmos`,
});
</script>
<template>
  <NuxtLink to="/articles/1.vue">文章详情</NuxtLink>
</template>
