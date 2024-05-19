<template>
  <div>
    <h1>Signup</h1>
    <signup-form />
  </div>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue';

export default {
  name: 'SignupView',
  components: {
    SignupForm,
  }
};
</script>

<style scoped>
/* Your component styles */
</style>
