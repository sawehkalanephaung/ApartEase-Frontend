<template>
  <transition name="toast">
    <div v-if="show" class="notifications">
      <div :class="['toast', type]">
        <i :class="iconClass"></i>
        <div class="content">
          <div class="title">{{ title }}</div>
          <span>{{ message }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref,computed } from 'vue';
const toasts = ref([]);
let toastId = 0;

const props = defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: String
});

const iconClass = computed(() => {
  switch (props.type) {
    case 'success': return 'fa-solid fa-circle-check';
    case 'error': return 'fa-solid fa-circle-exclamation';
    case 'warning': return 'fa-solid fa-triangle-exclamation';
    case 'info': return 'fa-solid fa-circle-info';
    default: return 'fa-solid fa-circle-check';
  }
});
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.notifications {
  position: fixed;
  top: 10px;
  right: 8px;
}

.toast {
  position: relative;
  padding: 8px;
  color: #fff;
  margin-bottom: 10px;
  width: 400px;
  display: grid;
  grid-template-columns: 70px 1fr;
  border-radius: 10px;
  --color: #155724;
  background-color: #d4edda;
  animation: show 0.2s ease 1 forwards;
}

.toast i {
  color: var(--color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
}

.toast .title {
  font-size: x-large;
  font-weight: bold;
}

.toast span {
  color: #155724;
  opacity: 0.6;
}

@keyframes show {
  0% { transform: translateX(100%); }
  40% { transform: translateX(-5%); }
  80% { transform: translateX(0%); }
  100% { transform: translateX(-10%); }
}

.toast::before {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: var(--color);
  width: 100%;
  height: 3px;
  content: '';
  box-shadow: 0 0 10px var(--color);
  animation: timeOut 5s linear 1 forwards;
}

@keyframes timeOut {
  to { width: 0; }
}

.toast.error {
  --color: #721c24;
  background-image: linear-gradient(to right, #f8d7da, #f8d7da 30%);
}

.toast.error span {
  color: #721c24;
  opacity: 1;
}

.toast.warning {
  --color: #856404;
  background-image: linear-gradient(to right, #fff3cd, #fff3cd 30%);
}

.toast.warning span {
  color: #856404;
  opacity: 1;
}

.toast.info {
  --color: #0c5460;
  background-image: linear-gradient(to right, #d1ecf1, #d1ecf1 30%);
}

.toast.info span {
  color: #0c5460;
  opacity: 1;
}
</style>
