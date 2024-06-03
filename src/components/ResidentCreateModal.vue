<template>
  <div class="modal-mask" @click.self="closeModal">
    <div class="modal-container" @click.stop>
      <h3 class="text-2xl font-medium text-gray-700">Create Resident</h3>
      <form
        @submit.prevent="onSubmit"
        class="shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="roomNumber"
            >Room No</label
          >
          <input
            v-model="resident.roomNumber"
            type="text"
            id="roomNumber"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
            >Name</label
          >
          <input
            v-model="resident.name"
            type="text"
            id="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="lineId"
            >Line ID</label
          >
          <input
            v-model="resident.lineId"
            type="text"
            id="lineId"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="flex items-center justify-between mt-10">
          <button
            type="submit"
            class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            ADD
          </button>
          <button
            type="button"
            @click="closeModal"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { API_URL, JWT_TOKEN, AUTHORIZATION } from "@/config";

const router = useRouter();

const resident = ref({
  roomNumber: "",
  name: "",
  lineId: "",
});

const emit = defineEmits(["close", "resident-created"]);

const closeModal = () => {
  emit("close");
};

const onSubmit = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-access-token", JWT_TOKEN);
  myHeaders.append("Authorization", AUTHORIZATION);

  const raw = JSON.stringify({
    roomNumber: resident.value.roomNumber,
    name: resident.value.name,
    lineId: resident.value.lineId,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${API_URL}/resident/add`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "ok") {
        alert("Resident created successfully!");
        emit("resident-created");
        closeModal();
      } else {
        alert(result.message);
      }
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    });
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
</style>
