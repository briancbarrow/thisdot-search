<template>
  <nav
    class="max-w-lg mx-auto bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    aria-label="Pagination"
  >
    <div data-testid="paginationText" class="hidden sm:block" v-if="total > 0">
      <p class="text-sm text-gray-700">
        Showing
        <span data-testid="rangeStart" class="font-medium">{{
          rangeStart
        }}</span>
        to
        <span data-testid="rangeEnd" class="font-medium">{{ rangeEnd }}</span>
        of
        <span class="font-medium">{{ totalString }}</span>
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <button
        data-testid="previousButton"
        :disabled="currentPage === 1"
        type="button"
        @click="previous"
        :class="[currentPage === 1 ? 'opacity-50' : '']"
        class="disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Previous
      </button>
      <button
        data-testid="nextButton"
        :disabled="currentPage >= totalPages"
        type="button"
        @click="next"
        :class="[currentPage >= totalPages ? 'opacity-50' : '']"
        class="disabled:opacity-50 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    totalString: {
      type: String,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    next() {
      this.$emit('custom-next');
    },
    previous() {
      this.$emit('custom-previous');
    },
  },
  computed: {
    rangeStart() {
      if (this.total <= 10) {
        return Math.max(this.rangeEnd - 9, this.total);
      } else if (this.currentPage === this.totalPages) {
        return (this.currentPage - 1) * 10 + 1;
      } else {
        return this.rangeEnd - 9;
      }
    },
    rangeEnd() {
      return Math.min(10 * this.currentPage, this.total);
    },
  },
};
</script>

<style lang="scss"></style>
