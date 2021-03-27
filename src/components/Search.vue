<template>
  <div data-testid="search">
    <h1>Search</h1>
    <form v-on:submit.prevent="callApi" class="w-full max-w-xs mx-auto">
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
        type="submit"
        data-testid="searchButton"
        class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Submit
      </button>
    </form>
    <h2
      data-testid="numberOfUsers"
      class="mt-4 text-lg leading-6 font-medium text-gray-900"
      v-if="totalUsers"
    >
      {{ totalUsersString }} Users
    </h2>
    <div class="max-w-md mx-auto pb-6 px-4 sm:px-0">
      <ul class="divide-y divide-gray-200">
        <li :key="user.id" v-for="user in users.value" class="py-4 flex">
          <GithubUserBrief :userInfo="user" />
        </li>
      </ul>
    </div>
    <Pagination
      :totalPages="totalPages"
      :total="totalUsers"
      :totalString="totalUsersString"
      :currentPage="currentPage"
      @custom-previous="goToPrevious()"
      @custom-next="goToNext()"
    />
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import GithubUserBrief from './GithubUserBrief.vue';
import Pagination from './Pagination.vue';

export default {
  components: { GithubUserBrief, Pagination },
  setup() {
    const url = 'https://api.github.com/search/users?q=';
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.VUE_APP_ID}`,
      },
    };
    const searchTerm = ref('');
    const users = reactive({});
    const totalUsers = ref(0);
    const totalUsersString = ref('');
    const currentPage = ref(1);
    const totalPages = computed(() => {
      return Math.ceil(parseInt(totalUsers.value) / 10);
    });
    function goToPrevious() {
      if (currentPage.value === 1) {
        return;
      }
      currentPage.value -= 1;
      callApi();
    }
    function goToNext() {
      if (currentPage.value === totalPages.value) {
        return;
      }
      currentPage.value += 1;
      callApi();
    }

    const callApi = async () => {
      console.log('HERE SEARCH **********************');
      const apiResponse = await fetch(
        `${url}${searchTerm.value}&page=${currentPage.value}&per_page=10`,
        options
      );
      const json = await apiResponse.json();
      users.value = json.items;
      const numberFormat = new Intl.NumberFormat('en-US');
      totalUsers.value = json.total_count;
      totalUsersString.value = numberFormat.format(json.total_count);
    };

    return {
      searchTerm,
      callApi,
      totalUsers,
      totalUsersString,
      users,
      currentPage,
      totalPages,
      goToPrevious,
      goToNext,
    };
  },
};
</script>

<style lang="scss"></style>
