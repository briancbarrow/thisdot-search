<template>
  <img
    class="h-10 w-10 rounded-full"
    :src="userInfo.avatar_url"
    :alt="`profile picture for ${userInfo.login}`"
  />
  <div class="ml-3">
    <p class="text-sm text-left font-medium text-gray-900">
      {{ state.userDetails.name }}
    </p>
    <p class="text-sm text-left text-gray-500">{{ userInfo.login }}</p>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
// import { onBeforeMount } from '@vue/runtime-core';
export default {
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      userDetails: null,
    });
    onMounted(async () => {
      const data = await fetch(props.userInfo.url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_ID}`,
        },
      });
      state.userDetails = await data.json();
      // extraInfo.value = json;
      console.log('EXTRA', state.userDetails);
    });
    return {
      state,
    };
  },
};
</script>

<style lang="scss"></style>
