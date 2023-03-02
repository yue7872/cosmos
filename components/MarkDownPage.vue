<script setup>
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  editPath: {
    type: String,
    default: '',
  },
  info: {
    type: Object,
    default: () => {},
  },
});

const mdContent = computed(() => {
  const { articleContent } = useParseMd(props.content);
  return articleContent;
});
</script>
<template>
  <div class="cos-md-page">
    <div>{{ info }}</div>
    <div mt-10>
      readingTime: {{ info.readingTime || '<1' }}min
    </div>
    <div v-html="mdContent" />
    <a
      block
      flex
      items-center
      justify-end
      mt-8
      w-fit
      ml-auto
      class="hover-color-#009966"
      :href="editPath"
    >
      <div class="i-ant-design-edit-outlined" mr-4px />
      Edit on Github
    </a>
  </div>
</template>
