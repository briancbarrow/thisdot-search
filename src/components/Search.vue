<template>
  <div>
    <h1>Search</h1>
    <div class="w-full max-w-xs mx-auto">
      <label for="searchTerm" class="sr-only">Search Users</label>
      <input
        type="text"
        v-model="searchTerm"
        name="searchTerm"
        id="searchTerm"
        class="py-2 px-3 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-500 rounded-md"
        placeholder="Brian Barrow"
      />
      <button
        type="button"
        @click="callApi"
        class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Submit
      </button>
    </div>
    <h2
      class="mt-4 text-lg leading-6 font-medium text-gray-900"
      v-if="totalUsers"
    >
      {{ totalUsers }} Users
    </h2>
    <div class="max-w-md mx-auto pb-12 px-4 sm:px-0 md:pb-16">
      <ul class="divide-y divide-gray-200">
        <li :key="user.id" v-for="user in users.value" class="py-4 flex">
          <GithubUserBrief :userInfo="user" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import GithubUserBrief from './GithubUserBrief.vue';
export default {
  components: { GithubUserBrief },
  setup() {
    const url = 'https://api.github.com/search/users?q=';
    const options = {
      method: 'GET',
    };
    const searchTerm = ref('');
    const users = reactive({});
    const totalUsers = ref(null);
    const callApi = async () => {
      const apiResponse = await fetch(`${url}${searchTerm.value}`, options);
      const json = await apiResponse.json();
      console.log('body', json.items);
      users.value = json.items;
      const numberFormat = new Intl.NumberFormat('en-US');
      totalUsers.value = numberFormat.format(json.total_count);
    };

    return {
      searchTerm,
      callApi,
      totalUsers,
      users,
    };
  },
};
</script>

<style lang="scss"></style>
