<template>
  <img
    class="h-10 w-10 rounded-full"
    :src="userInfo.avatar_url"
    :alt="`profile picture for ${userInfo.login}`"
  />
  <div class="ml-3">
    <p class="text-sm text-left font-medium text-gray-900">
      {{ userInfo.login }}
    </p>
    <p class="text-sm text-left text-gray-500">calvin.hawkins@example.com</p>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss"></style>
