<!-- src/components/DeleteConfirmationModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
    <div class="rounded-lg bg-gray-50 px-16 py-14">
      <div class="flex justify-center">
        <div class="rounded-full bg-red-200 p-6">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
      <h3 class="my-4 text-center text-3xl font-semibold text-gray-700">Are you sure?</h3>
      <p class="text-center text-gray-600">Do you really want to delete this resident? This process cannot be undone.</p>
      <div class="mt-10 flex justify-center space-x-4">
        <button @click="$emit('confirm-delete')" class="rounded-xl border-4 border-transparent bg-red-400 hover:bg-red-500 px-6 py-3 text-center text-base font-medium text-red-100 ">Delete</button>
        <button @click="$emit('close')" class="rounded-xl border-4 border-transparent bg-gray-400 hover:bg-gray-500 px-6 py-3 text-center text-base font-medium text-gray-100 ">Cancel</button>
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
