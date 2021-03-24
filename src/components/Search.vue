<template>
  <div>
    <h1>Search</h1>
    <input v-model="searchTerm" placeholder="Search for Github Users" />
    <button @click="callApi">Submit</button>
    <h2 v-if="totalUsers">{{ totalUsers }} Users</h2>
    <GithubUserBrief
      :key="user.id"
      v-for="user in users.value"
      :userInfo="user"
    />
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
