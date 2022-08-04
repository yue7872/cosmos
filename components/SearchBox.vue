<script lang="ts" setup>
const props = defineProps({
  showSearchBox: {
    type: Boolean,
    default: false,
  },
  searchFocus: {
    type: Boolean,
    default: false,
  },
});

const handleFocus = (e: any) => {
  e.target.select();
};

const searchInput = ref(null);
watch(props, (val: any) => {
  if (val.searchFocus) {
    setTimeout(() => {
      searchInput.value?.focus();
    }, 50);
  }
});
</script>
<template>
  <div v-if="showSearchBox">
    <input
      w-400px
      h-40px
      text-16px
      leading-40px
      border-rd-20px
      pl-20px
      pr-20px
      @focus="handleFocus"
      autofocus
      type="search"
      ref="searchInput"
    />
  </div>
</template>
<style>
</style>
