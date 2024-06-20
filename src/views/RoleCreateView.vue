<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700 text-center">Create Role</h3>
      <Form @submit="onSubmit" :validation-schema="schema" class="rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="role_name">Role Name</label>
          <Field
            v-model="role.role_name"
            type="text"
            id="role_name"
            name="role_name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Role Name"
          />
          <ErrorMessage name="role_name" class="text-red-500 text-xs italic mt-1" />
          <p v-if="message" class="text-red-500 text-xs italic mt-1">{{ message }}</p>
        </div>

        <div class="flex items-center justify-between mt-10">
          <button
            type="submit"
            class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button
            type="button"
            @click="cancel"
            class="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
          >
            Back
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
