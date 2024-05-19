
<template>
 <div class="home">
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style scoped>

</style>
