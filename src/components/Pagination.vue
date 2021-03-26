<template>
  <nav
    class="max-w-lg mx-auto bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block" v-if="total > 0">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ rangeStart }}</span>
        to
        <span class="font-medium">{{ rangeEnd }}</span>
        of
        <span class="font-medium">{{ totalString }}</span>
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <button
        type="button"
        @click="previous"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Previous
      </button>
      <button
        type="button"
        @click="next"
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
      return this.rangeEnd - 9;
    },
    rangeEnd() {
      return 10 * this.currentPage;
    },
  },
};
</script>

<style lang="scss"></style>
