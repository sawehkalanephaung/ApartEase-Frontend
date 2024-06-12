<template>
  <div class="flex items-center justify-center h-full">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <h3 class="text-2xl font-medium text-gray-700 text-center">
        Create User
      </h3>

      <form @submit.prevent="register" class="rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
            >Username</label
          >
          <input
            v-model="user.username"
            type="text"
            id="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
            >Password</label
          >
          <input
            v-model="user.password"
            type="password"
            id="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="role"
            >Role</label
          >
          <select
            id="role"
            name="role"
            required
            v-model="user.role"
            class="block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-600 sm:text-sm"
          >
            <option
              v-for="role in roles"
              :key="role.id"
              :value="role.role_name"
            >
              {{ role.role_name }}
            </option>
          </select>
        </div>

        <div class="flex items-center justify-between mt-10">
          <button
            type="submit"
            class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Submitting..." : "Submit" }}
          </button>
          <button
            type="button"
            @click="cancel"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </button>
        </div>
      </form>
      <p v-if="message" class="text-error mt-5">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/services/AxiosClient.js";

const router = useRouter();

const user = ref({
  username: "",
  password: "",
  role: "",
});

const isSubmitting = ref(false);
const message = ref("");

// list all role in role selection
const roles = ref([]);

const fetchRoles = async () => {
  try {
    const response = await apiClient.get("/role/list");
    roles.value = response.data.Role.slice(0, -1); // Assuming the last item is pagination info
  } catch (error) {
    console.error("Error fetching roles:", error);
    message.value = "Error fetching roles. Please try again later.";
  }
};

onMounted(() => {
  fetchRoles();
});

const register = async () => {
  if (!user.value.username || !user.value.password || !user.value.role) {
    message.value = "Please fill in all required fields.";
    return;
  }

  isSubmitting.value = true;

  try {
    const userData = {
      username: user.value.username,
      password: user.value.password,
      role: user.value.role,
    };
    const response = await apiClient.post("/user/add", userData);
    const result = response.data;
    if (result.message === "The role does not exist!") {
      message.value = result.message;
      isSubmitting.value = false;
      return;
    }
    router.push("/user-list");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while creating the user. Please try again later.";
    console.error("Error creating user:", errorMessage);
    message.value = errorMessage;
    isSubmitting.value = false;
  }
};

const cancel = () => {
  router.push("/user-list");
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
