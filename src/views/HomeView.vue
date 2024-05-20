<template>
  <div class="home">
      <p>This is the dashboard page.</p>
      <p v-if="user">Welcome, {{ user.username }}!</p>
      <p v-if="user">Your role: {{ user.role }}</p>
  </div>

</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  computed: {
    ...mapGetters(['getUser']),
    user() {
      return this.getUser;
    }
  },
  created() {
    if (!this.user) {
      // Redirect to login page if user is not logged in
      this.$router.push('/login');
    }
  }
};
</script>