<template>
  <div>
    <h1>{{ userInfo.login }}</h1>
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
