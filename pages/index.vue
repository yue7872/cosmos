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
const dailySentence = await useDailySentence();
const { typedText, typing } = useTyper(dailySentence, 100);
let myCustomText = "hahah";
if (!typing) {
  myCustomText = useTyper("花花婚你就能", 100).typedText;
}
</script>
<template>
  <div>
    <div>{{ typing ? typedText : myCustomText }}</div>
    <div>{{ myCustomText }}</div>
  </div>
</template>
