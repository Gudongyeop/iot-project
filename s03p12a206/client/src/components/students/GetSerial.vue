<template>
  <div>
    <h2>시리얼 등록</h2>
    <div class="my-2">
      <label>시리얼 번호</label> :
      <input v-model="serial" disabled>
      <v-btn color="#0f4c81" style="margin-left :10px; color: white" @click="serialcheck(serial)">중복확인</v-btn>
    </div>    
    <v-btn
      color="#9b1b30"
      text
      @click="closeModal"
    >
      취소
    </v-btn>
    <v-btn
      color="#0f4c81"
      text
      @click="getSerialNum"
      :disabled="!isSerialOk"
    >
      확인
    </v-btn>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
const studentsStore = 'studentsStore'
import io from 'socket.io-client';

export default {
  name: 'GetSerial',
  data() {
    return {
        serial: '',
      }
  },
  computed: {
    ...mapGetters(studentsStore, [
      'isSerialOk'
    ])
  },
  created() {
    const socket = io('http://localhost:3001');
    socket.on('return', (data)=> {
      this.serial = data.message1
    })
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.serial = ''
    },
    getSerialNum() {
      this.$emit('getSerialNum', this.serial)
      this.serial = ''
    },
    ...mapActions(studentsStore, [
      'serialcheck',
    ])
    
  }
}
</script>

<style>

</style>