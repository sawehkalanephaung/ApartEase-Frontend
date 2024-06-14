<!-- src/components/DeleteConfirmationModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75"
  >
    <div
      class="rounded-lg bg-gray-50 px-8 py-8 sm:px-12 sm:py-12 md:px-16 md:py-14"
    >
      <div class="flex justify-center">
        <div class="rounded-full bg-red-200 p-4 sm:p-6">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 p-3 sm:h-16 sm:w-16 sm:p-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-white sm:h-8 sm:w-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <h3
        class="my-4 text-center text-xl font-semibold text-gray-700 sm:text-2xl md:text-3xl"
      >
        Are you sure?
      </h3>
      <p class="text-center text-sm text-gray-600 sm:text-base">
        Do you really want to delete this resident? This process cannot be
        undone.
      </p>
      <div class="mt-6 flex justify-center space-x-4 sm:mt-8 md:mt-10">
        <button
          @click="$emit('confirm-delete')"
          class="rounded-xl border-4 border-transparent bg-red-400 hover:bg-red-500 px-4 py-2 text-center text-sm font-medium text-red-100 sm:px-6 sm:py-3 sm:text-base"
        >
        <!-- class="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-emerald-400 px-6 py-3 text-center text-base font-medium text-emerald-100 outline-8 hover:outline hover:duration-100 -->
          Delete
        </button>
        <button
          @click="$emit('close')"
          class="rounded-xl border-4 border-transparent bg-gray-400 hover:bg-gray-500 px-4 py-2 text-center text-sm font-medium text-gray-100 sm:px-6 sm:py-3 sm:text-base"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>
