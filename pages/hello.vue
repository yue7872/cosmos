<script setup>
const route = useRoute();

definePageMeta({
  layout: 'default',
  title: 'hello页',
});
useHead({
  title: `${route.meta.title} - Cosmos`,
});
</script>
<template>
  <div>hello</div>
</template>
