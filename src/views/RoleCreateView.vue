<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-center text-gray-700">Create Role</h3>
      <Form @submit="onSubmit" :validation-schema="schema" class="px-8 pt-6 pb-8 mb-4 rounded">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="role_name">Role Name</label>
          <Field
            v-model="role.role_name"
            type="text"
            id="role_name"
            name="role_name"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-emerald-500 focus:border-emerald-600"
            placeholder="Role Name"
          />
          <ErrorMessage name="role_name" class="mt-1 text-xs italic text-red-500" />
          <p v-if="message" class="mt-1 text-xs italic text-red-500">{{ message }}</p>
        </div>

        <div class="flex items-center justify-between mt-10">
          <button
            type="submit"
            class="px-4 py-2 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button
            type="button"
            @click="cancel"
            class="px-4 py-2 font-bold bg-white border-2 rounded text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import apiClient from '@/services/AxiosClient.js';

const router = useRouter();
const message = ref('');

const role = ref({
  role_name: '',
});

const schema = yup.object().shape({
  role_name: yup.string().required('Role name is required!'),
});

const onSubmit = async (values) => {
  try {
    const response = await apiClient.post('/role/add', values);
    if (response.status === 200) {
      alert(response.data.message);
      router.push('/role-list');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      message.value = error.response.data.message;
    } else {
      message.value = 'An error occurred during registration. Please try again.';
    }
  }
};

const cancel = () => {
  router.push('/role-list');
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
