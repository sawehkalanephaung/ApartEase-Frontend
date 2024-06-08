<template>
  <div class="home">
    <h1><strong>Welcome</strong></h1>
    <p>Username: {{ username }}</p>
    <p>Role: {{ role }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const username = computed(() => store.getters.getUser?.username || "Guest");
const role = computed(() => store.getters.getRole);
</script>


<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

h1 {
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin: 5px 0;
}
</style>
