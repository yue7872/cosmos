<script setup lang="ts">
const props = defineProps({
  post: {
    type: Object,
    default: () => {},
  },
});

// eslint-disable-next-line vue/no-setup-props-destructure
const post: PostDetail = ref(props.post);
const title = ref(post.value.title);
const articleInfo = ref(post.value.articleInfo);

watch(props, (val) => {
  post.value = props.post;
  title.value = post.value.title;
  articleInfo.value = post.value.articleInfo;
});
</script>
<template>
  <div
    box-border
    cursor-pointer
    flex
    justify-center
    flex-col
    relative
    mb-50px
  >
    <NuxtLink :to="`/articles/${title}.vue`">
      <div inline text-14px rd>
        『{{ articleInfo.categories }}』
      </div>
      <div font-medium text-28px class="hover-color-#009966">
        {{ articleInfo.articleTitle }}
      </div>
      <div inline text-16px text-coolGray>
        {{ articleInfo.outline }}
      </div>
    </NuxtLink>
  </div>
</template>
<style lang="less">
.posts-item-box {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
  &:hover {
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.15);
  }
}
</style>
