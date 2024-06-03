
// src/useModal.js
import { ref } from 'vue'

export function useModal() {
  const isShowing = ref(false)

  function toggle() {
    isShowing.value = !isShowing.value
  }

  return {
    isShowing,
    toggle
  }
}