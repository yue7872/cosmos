<script setup>
const route = useRoute();

definePageMeta({
  layout: "default",
  title: "首页",
});

useHead({
  title: route.meta.title,
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.png",
    },
  ],
});
</script>
<template></template>
