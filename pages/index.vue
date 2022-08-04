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
const { typedText, typing } = useTyper(dailySentence, 200);
let subtitle = reactive({
  content: "",
});

watch(typing, (typing) => {
  if (typing === false) {
    const { typedText: myCustomText } = useTyper(
      "学海无涯，回头是岸。",
      200,
      true
    );
    subtitle.content = myCustomText;
  }
});
</script>
<template>
  <div>
    <div flex flex-row>
      <div>{{ typing ? typedText : subtitle.content }}</div>
      <div :class="typing || 'animate-blink'" font-900 font-system>|</div>
    </div>
  </div>
</template>
