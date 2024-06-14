<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="bg-white rounded-lg shadow-lg p-8 z-10">
        <h2 class="text-xl font-semibold mb-6">Confirm Logout</h2>
        <p class="mb-6">Are you sure you want to logout?</p>
        <div class="flex justify-end">
          <button
            @click="confirmLogout"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
          >
            Yes
          </button>
          <button
            @click="closeModal"
            class="bg-emerald-500 hover:bg-emerald-600 text-text px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </transition>
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

<style scoped>
/* Add any additional styles if needed */
</style>
