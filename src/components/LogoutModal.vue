<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75"
  >
    <div
      class="px-8 py-8 rounded-lg bg-gray-50 sm:px-12 sm:py-12 md:px-16 md:py-14"
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
        Confirm Logout
      </h3>
      <p class="text-sm text-center text-gray-600 sm:text-base">
        Are you sure you want to logout?
      </p>
      <div class="flex justify-center mt-6 space-x-4 sm:mt-8 md:mt-10">
        <button
          @click="confirmLogout"
          class="px-4 py-2 text-sm font-medium text-center text-red-100 bg-red-400 border-4 border-transparent rounded-xl hover:bg-red-500 sm:px-6 sm:py-3 sm:text-base"
        >
          Yes
        </button>
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-center text-gray-100 bg-gray-400 border-4 border-transparent rounded-xl hover:bg-gray-500 sm:px-6 sm:py-3 sm:text-base"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['confirm-logout', 'close'])

const confirmLogout = () => {
  emit('confirm-logout')
}

const closeModal = () => {
  emit('close')
}
</script>
