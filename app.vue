<script setup>
import AV from 'leancloud-storage';

// onMounted(() => {
//   AV.init({
//     appId: 'sa7aTueIBD7ax0uRlpK0TZhA-MdYXbMMI',
//     appKey: 'j2qfKyxxNbZ1KCk5itVjgXGn',
//   });
//   AV.debug.enable(); // 启用
//   // const TestObject = AV.Object.extend('TestObject');
//   // const testObject = new TestObject();
//   // testObject.set('words', 'Hello world!');
//   // testObject.save().then((testObject) => {
//   //   console.log('保存成功。');
//   // });
// });
const route = useRoute();
useHead({
  title: 'cosmos',
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.png',
    },
  ],
  htmlAttrs: {
    lang: 'zh-cn',
  },
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
@import url(~/style/common.css);
</style>
