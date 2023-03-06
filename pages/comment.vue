<script setup>
const route = useRoute();
definePageMeta({
  layout: 'default',
  title: '留言板',
});
useHead({
  title: `${route.meta.title} - Cosmos`,
});
</script>
<template>
  <CommentArea />
</template>
