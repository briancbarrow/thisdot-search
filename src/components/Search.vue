<template>
  <div>
    <h1>Search</h1>
    <!-- <form @submit.prevent="callApi"> -->
    <input v-model="searchTerm" placeholder="Search" />
    <button @click="callApi">Submit</button>
    <!-- </form> -->
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const url = 'https://api.github.com/search/users?q=';
    const options = {
      method: 'GET',
    };
    const searchTerm = ref('');
    const callApi = async () => {
      const apiResponse = await fetch(`${url}${searchTerm.value}`, options);
      const body = await apiResponse.json();
      console.log('body', body);
      console.log('value', window.location);
    };

    return {
      searchTerm,
      callApi,
    };
  },
};
</script>

<style lang="scss"></style>
