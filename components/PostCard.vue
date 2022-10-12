<script setup lang="ts">
const props = defineProps({
  post: {
    type: Object,
    default: () => {},
  },
});

// eslint-disable-next-line vue/no-setup-props-destructure
const post: PostDetail = props.post;
const { title, articleInfo } = post;
</script>
<template>
  <div
    mb-20px
    p-30px
    border-rd-20px
    min-h-200px
    box-border
    cursor-pointer
    flex
    justify-center
    flex-col
    relative
    class="posts-item-box"
  >
    <NuxtLink :to="`/articles/${title}.vue`">
      <div hover-color-red font-medium text-28px inline>
        {{ articleInfo.title }}
      </div>
      <div flex>
        <div mr-10px color-coolGray>
          分类:
        </div>
        <div mr-20px>
          {{ articleInfo.categories }}
        </div>
        <div mr-10px color-coolGray>
          标签:
        </div>
        <div v-for="(item, idx) in articleInfo.tags" :key="idx" mr-20px>
          {{ item }}
        </div>
      </div>
      <div color-coolGray>
        {{ articleInfo }}
      </div>
      <div v-if="articleInfo.outline">
        摘要：{{ articleInfo.outline }}
      </div>
      <div absolute bottom-0px>
        {{ articleInfo.date.replace(/(\w{2}:){2}\w{2}/, '') }}
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
