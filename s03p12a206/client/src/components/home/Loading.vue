<template>
  <v-container fluid class="loading-page align-center">

  <v-layout class="video">


  <transition name="fade" >
    <v-layout  v-if="show" class="loading-page d-flex align-start flex-column" >
      <v-row class="logorow d-flex justify-start">
        <div >
          <img src="@/assets/S.png" class="letter" alt="S">
        </div>
        <v-spacer v-if="space"></v-spacer>
        <div >
          <img src="@/assets/S.png" class="letter" alt="S">
        </div>
        <v-spacer v-if="space"></v-spacer>
        <div >
          <img src="@/assets/A.png" class="letter" alt="A">
        </div>
        <v-spacer v-if="space"></v-spacer>
        <div >
          <img src="@/assets/F.png" class="letter" alt="F">
        </div>
        <v-spacer v-if="space"></v-spacer>
        <div >
          <img src="@/assets/Y.png" class="letter" alt="Y">
        </div>
      </v-row>

      <v-row class="logorow d-flex justify-center">
        <v-spacer v-if="space"></v-spacer>
      </v-row>

      <v-row class="logorow d-flex justify-end">
      
       <div >
          <img src="@/assets/T.png" class="letter" alt="T">
        </div>
        <v-spacer v-if="space"></v-spacer>
        <div >
          <img src="@/assets/E.png" class="letter" alt="E">
        </div>
        <v-spacer v-if="space"></v-spacer>
        <div v-if="space">
          <img src="@/assets/2m.png" class="letter" alt="2m">
        </div>
        <v-spacer v-if="space"></v-spacer>
        <div >
          <img src="@/assets/M.png" class="letter" alt="M">
        </div>
        <v-spacer v-if="space"></v-spacer>
        <div >
          <img src="@/assets/P.png" class="letter" alt="P">
        </div>
        
      </v-row>
    </v-layout>
  </transition>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      space: false,
      show: true
    }
  },
  created() {
    setTimeout(() => {
      this.show = false
      this.space = true
    }, 800)

    setTimeout(() => {
      this.show = true
    }, 2000)
  }
}
</script>

<style scoped>
.loading-page {
  max-height: 1080 px;
}
.logorow {
  width: 66vw;
}
.video {
  margin-top: 30vh;
  margin-left: 15vw;
  margin-right: 10vw;
}
.letter {
  max-height: 100px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

</style>