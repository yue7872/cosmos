<script lang="ts" setup>
const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>
<template>
  <div flex justify-between h-60px>
    <div flex items-center cursor-pointer @click="goHome">
      <img src="~/assets/img/logo.png" alt="cosmos" w-32px h-32px />
      <div ml-10px font-serif font-medium>Cosmos</div>
    </div>
    <div flex items-center font-serif select-none>
      <div class="nav-item" mr-10px cursor-pointer>search</div>
      <NuxtLink to="/postList">blog</NuxtLink>
      <NuxtLink to="/hello" ml-10px>Hello</NuxtLink>
      <NuxtLink to="/aa" ml-10px>aa</NuxtLink>
    </div>
  </div>
</template>
