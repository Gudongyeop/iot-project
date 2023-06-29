<template>
  <div class="background-page">
      <button @click="goBack" class=" btn btn-success mt-10">Go Back</button>
  </div>
</template>

<script>
export default {
    name: 'NotFound',
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }

}
</script>

<style>
.background-page {
    background-image: url('../assets/404notfound.png');
    background-repeat : no-repeat;

}
</style>