<template>
  <nav
    class="max-w-lg mx-auto bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">1</span>
        to
        <span class="font-medium">10</span>
        of
        <span class="font-medium">{{ total }}</span>
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <button
        type="button"
        @click="$emit('previous')"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Previous
      </button>
      <button
        type="button"
        @click="$emit('next')"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    // totalPages: {
    //   type: Number,
    //   required: true,
    // },
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // maxVisibleButtons: 3,
    };
  },
  computed: {
    rangeStart() {
      return this.rangeEnd - 10;
    },
    rangeEnd() {
      return 10 / this.currentPage;
    },
    // pages() {
    //   const array = [];
    //   for (let i = 1; i <= this.totalPages; i++) {
    //     array.push({
    //       index: i,
    //       isCurrentPage: i === this.currentPage,
    //     });
    //   }
    //   return array;
    // },
  },
  // setup() {
  //   return {};
  // },
};
</script>

<style lang="scss"></style>
