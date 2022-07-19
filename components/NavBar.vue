<script lang="ts" setup>
</script>
<template>
  <div max-w-1200px flex justify-between m-auto h-60px>
    <div flex items-center>
      <img src="~/assets/img/logo.png" alt="Discover Nuxt 3" w-32px h-32px />
      <div ml-10px font-serif font-medium>Cosmos</div>
    </div>
    <div flex items-center>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/hello" ml-10px>Hello</NuxtLink>
      <NuxtLink to="/aa" ml-10px>aa</NuxtLink>
    </div>
  </div>
</template>
