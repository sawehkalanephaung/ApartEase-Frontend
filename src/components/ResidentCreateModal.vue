<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg transform transition-all duration-300" @click.stop>
      <!-- Modal Header -->
      <div class="flex justify-between items-center border-b-2 border-gray-200 pb-4">
        <h2 class="text-2xl font-semibold">Create Resident</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="mt-8 space-y-4 ">
        <form @submit.prevent="onSubmit" class="space-y-4">
          <div>
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
              onChange="{(e)=> setResident({...resident, roomNumber: e.target.value})}"
            />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
              >Name</label
            >
            <input
              v-model="resident.name"
              type="text"
              id="name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              onChange="{(e)=> setResident({...resident, name: e.target.value})}"
            />
          </div>
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="lineId"
              >Line ID</label
            >
            <input
              v-model="resident.lineId"
              type="text"
              id="lineId"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              onChange="{(e)=> setResident({...resident, lineId: e.target.value})}"
            />
          </div>
          <div class="flex justify-center mt-10">
            <button
              type="submit"
              class="bg-emerald-500 hover:bg-emerald-700 text-white w-full mt-10 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
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

const onSubmit = async (event) => {
event.preventDefault();
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

try {
const response = await fetch(`${API_URL}/resident/add`, requestOptions);
const result = await response.json();
alert(result.message);
if (result.status === "ok") {
emit("resident-created");
closeModal();
}
} catch (error) {
console.error("Error submitting form:", error);
alert("Failed to submit form. Please try again.");
}
};


</script>

<style scoped>
.modal-mask {
  position: fixed;
  /* z-index: 9998; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.1s ease;
}

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.1s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>