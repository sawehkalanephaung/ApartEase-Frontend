<template>

<div id="home"  class="p-[20px] h-full overflow-auto rounded-lg">
  <div class="flex flex-col h-full">
    <h1 class="text-4xl text-center text-white sm:text-center">
      <strong>Welcome to Home</strong>
    </h1>
    <p class="text-2xl text-white">Username: {{ username }}</p>
    <p class="text-white">Role: {{ role }}</p>


    <div id="clock" class="p-10">
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
  </div>

  </div>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useStore } from "vuex";
const store = useStore();

const time = ref('');
const date = ref('');


const username = computed(() => store.getters.getUser?.username || "Guest");
const role = computed(() => store.getters.getRole);

const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const zeroPadding = (num, digit) => {
  return num.toString().padStart(digit, '0');
};

const updateTime = () => {
  const cd = new Date();
  time.value = `${zeroPadding(cd.getHours(), 2)}:${zeroPadding(cd.getMinutes(), 2)}:${zeroPadding(cd.getSeconds(), 2)}`;
  date.value = `${zeroPadding(cd.getFullYear(), 4)}-${zeroPadding(cd.getMonth() + 1, 2)}-${zeroPadding(cd.getDate(), 2)} ${week[cd.getDay()]}`;
};

let timerID;

onMounted(() => {
  timerID = setInterval(updateTime, 1000);
  updateTime();
});

onUnmounted(() => {
  clearInterval(timerID);
});
</script>

<style scoped>
#home {
  padding: 50px;
  text-align: center;
  background-image: url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); /* Update the path to your image */
  background-size: cover; /* Adjust the background size as needed */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat; /* Prevent the background image from repeating */
}

h1 {
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin: 5px 0;
}

#clock {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-align: center;
  position: absolute;
  right: 20px;
  bottom: 20px;
  color: #daf6ff;
}

.time {
  letter-spacing: 0.05em;
  font-size: 50px;
  padding: 5px 0;
}

.date {
  letter-spacing: 0.1em;
  font-size: 24px;
}

.text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}
/* Responsive styles */
@media (max-width: 1280px) {
  .time {
    font-size: 40px;
  }
  .date {
    font-size: 22px;
  }
  .text {
    font-size: 11px;
  }
}

@media (max-width: 1024px) {
  .time {
    font-size: 30px;

  }
  .date {
    font-size: 20px;
  }
  .text {
    font-size: 10px;

  }
}

@media (max-width: 640px) {
  .time {
    font-size: 20px;
  }
  .date {
    font-size: 18px;
  }
  .text {
    font-size: 9px;
  }
}

@media (max-width: 480px) {
  .time {
    font-size: 20px;

  }
  .date {
    font-size: 6px;
    
  }
  .text {
    font-size: 4px;
   
  }
}
</style>
