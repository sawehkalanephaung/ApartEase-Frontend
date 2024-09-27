<template>
    <ToastNotification :show="showToast" :message="toastMessage" :type="toastType" />
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
        <div class="flex items-center justify-between w-full px-4 py-4 text-sm font-medium leading-none select-none">
          <h2 class="ml-4 text-2xl font-medium text-gray-700">Edit Role</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div v-if="loading" class="text-center text-gray-500">Loading...</div>
        <form v-else @submit.prevent="onSubmit" class="px-8 pt-6 pb-8 mb-4 rounded">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="role_name">Role Name</label>
            <input
              v-model="role.role_name"
              type="text"
              id="role_name"
              class="w-full px-3 py-3 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
              :placeholder="originalRoleName || 'Role Name'"
            />
            <div v-if="error" class="mt-1 text-xs italic text-red-500">{{ error }}</div>
          </div>
        
          <div class="flex items-center justify-end mt-20 space-x-4">
            <button
              type="button"
              @click="cancel"
              class="w-full px-3 py-2 text-sm font-medium text-center text-black bg-transparent border-2 border-gray-600 rounded-xl hover:bg-gray-600 hover:text-white sm:px-6 sm:py-3 sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="w-full px-3 py-2 text-sm font-medium text-center text-white border-2 border-transparent bg-emerald-400 rounded-xl hover:bg-emerald-500 sm:px-6 sm:py-3 sm:text-base"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, watch } from 'vue';
import apiClient from '@/services/AxiosClient';
import ToastNotification from '@/components/ToastNotification.vue';


const props = defineProps({
  show: Boolean,
  roleId: String,
});

const emit = defineEmits(['close']);

const role = ref({ role_name: '' });
const originalRoleName = ref('');
const loading = ref(true);
const error = ref(null);


const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');

const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};


const fetchData = async () => {
  try {
    const response = await apiClient.get(`/role/list/${props.roleId}`);
    if (response.data && response.data.Role) {
      role.value = {
        role_name: response.data.Role.name,
      };
      originalRoleName.value = response.data.Role.name;
    } else {
      error.value = 'Failed to load role data. Please try again later.';
    }
  } catch (err) {
    error.value = 'Failed to load role data. Please try again later.';
  } finally {
    loading.value = false;
  }
};

// Watch for changes in the 'show' prop to fetch data when the modal is opened
watch(() => props.show, (newVal) => {
  if (newVal) {
    fetchData();
  }
});

const cancel = () => {
  emit('close');
};

const closeModal = () => {
  emit('close');
};

const onSubmit = async () => {
  try {
    if (!role.value.role_name) {
      role.value.role_name = originalRoleName.value;
    }

    const response = await apiClient.put(`/role/edit/${props.roleId}`, {
      role_name: role.value.role_name,
    });
    console.log(response.data.message);
    showToastMessage('Role updated successfully!');
    emit('close');
  } catch (err) {
    error.value = "The name of this role is already in use.";
    showToastMessage('The name of this role is already in use.', 'error');
  }
};
</script>
  
<style scoped>
/* Your scoped styles here */
</style>
