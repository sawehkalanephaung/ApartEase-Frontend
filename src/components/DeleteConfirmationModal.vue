<!-- src/components/DeleteConfirmationModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-75"
  >
    <div
      class="w-2/5 px-8 py-8 rounded-lg bg-gray-50 sm:px-12 sm:py-12 md:px-16 md:py-14"
    >
      <div class="flex justify-center">
        <div class="p-4 bg-red-200 rounded-full sm:p-6">
          <div
            class="flex items-center justify-center w-12 h-12 p-3 bg-red-500 rounded-full sm:h-16 sm:w-16 sm:p-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-white sm:h-8 sm:w-8"
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
        class="my-4 text-xl font-semibold text-center text-gray-700 sm:text-2xl md:text-3xl"
      >
        Are you sure?
      </h3>
      <p class="text-sm text-center text-gray-600 sm:text-base"> This process cannot be
        undo.
      </p>
      <div class="flex justify-center mt-6 space-x-4 sm:mt-8 md:mt-10">
        <button
          @click="$emit('close')"
             class="w-full px-3 py-2 text-sm font-medium text-center text-black bg-transparent border-2 border-gray-600 rounded-2xl hover:bg-black hover:text-white sm:px-6 sm:py-3 sm:text-base"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm-delete')"
          class="w-full px-4 py-2 text-sm font-medium text-center text-red-100 bg-red-400 border-4 border-transparent rounded-2xl hover:bg-red-500 sm:px-6 sm:py-3 sm:text-base"
        >
        <!-- class="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-emerald-400 px-6 py-3 text-center text-base font-medium text-emerald-100 outline-8 hover:outline hover:duration-100 -->
          Delete
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
