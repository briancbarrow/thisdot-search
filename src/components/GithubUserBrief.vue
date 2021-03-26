<template>
  <img
    class="h-10 w-10 rounded-full"
    :src="userInfo.avatar_url"
    :alt="`profile picture for ${userInfo.login}`"
  />
  <div v-if="userDetails" class="ml-3 flex w-full grid grid-cols-3">
    <div>
      <p class="text-sm text-left font-medium text-gray-900">
        {{ userDetails.name }}
      </p>
      <p class="text-sm text-left text-gray-500">{{ userInfo.login }}</p>
    </div>
    <div id="details" class="ml-3">
      <p class="text-sm text-left text-gray-500">
        Followers:
        {{ followerCount }}
      </p>
      <p class="text-sm text-left text-gray-500">
        Stars: {{ formattedStarCount }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount, toRefs, computed } from 'vue';
export default {
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const numberFormat = new Intl.NumberFormat('en-US');
    const state = reactive({
      userDetails: null,
    });
    const starCount = ref(0);
    const followerCount = computed(() => {
      if (state.userDetails) {
        return numberFormat.format(state.userDetails.followers);
      } else {
        return null;
      }
    });
    const formattedStarCount = computed(() => {
      return numberFormat.format(starCount.value);
    });

    async function getStarCount(repos_url) {
      const repos = await fetch(repos_url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_ID}`,
        },
      });
      repos.json().then((jsonRepos) => {
        const stars = jsonRepos.reduce((accumulator, repo) => {
          return repo.stargazers_count + accumulator;
        }, 0);
        starCount.value = stars;
      });
    }

    onBeforeMount(async () => {
      const data = await fetch(props.userInfo.url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_ID}`,
        },
      });
      const json = await data.json();
      state.userDetails = json;
      getStarCount(json.repos_url);
    });
    return {
      ...toRefs(state),
      followerCount,
      formattedStarCount,
    };
  },
};
</script>

<style lang="scss"></style>
