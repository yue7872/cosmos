<script setup lang="ts">
import { Ref } from "vue";

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
let subtitle = reactive({
  content: "",
});

watch(typing, (typing) => {
  if (typing === false) {
    const { typedText: myCustomText } = useTyper(
      "学海无涯，回头是岸。",
      100,
      true
    );
    subtitle.content = myCustomText;
  }
});
</script>
<template>
  <div>
    <div>{{ typing ? typedText : subtitle.content }}</div>
  </div>
</template>
