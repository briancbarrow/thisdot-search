<template>
  <img
    class="h-10 w-10 rounded-full"
    :src="userInfo.avatar_url"
    :alt="`profile picture for ${userInfo.login}`"
  />
  <div class="ml-3">
    <p class="text-sm text-left font-medium text-gray-900">
      {{ extraInfo.name }}
    </p>
    <p class="text-sm text-left text-gray-500">{{ userInfo.login }}</p>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { onBeforeMount } from '@vue/runtime-core';
export default {
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    let extraInfo = reactive({});
    onBeforeMount(async () => {
      console.log('BEARER', process.env.VUE_APP_ID);
      const data = await fetch(props.userInfo.url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_ID}`,
        },
      });
      extraInfo = await data.json();
      console.log('EXTRA', extraInfo);
    });
    return {
      extraInfo,
    };
  },
};
</script>

<style lang="scss"></style>
