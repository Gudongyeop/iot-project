<template>
  <div class="my-10 mx-auto col-9 col-lg-6">
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field                 
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="ID"
        required
        @keydown.enter="validate"
      ></v-text-field>

      <v-text-field       
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        @keydown.enter="validate"
      ></v-text-field>

      <v-text-field        
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[passwordRules.required, passwordRules.min]"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show = !show"
        @keydown.enter="validate"
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"        
      >
        submit
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        cancel
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const sessionStore = 'sessionStore'
export default { 
  name: 'Signin',
  data() {
    return {
      valid: true,
      show: false,
      password: '',
      passwordRules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email or password you entered don\'t match'),
      },
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

   
    }
  },
  methods: {
    ...mapActions(sessionStore, [
      'signin'
    ]),
    validate () {
      // 여기에 로그인 구현
      const signinInfo = {
        'username': this.name,
        'password': this.password,
        'email': this.email
      }
      this.signin(signinInfo)
    },
    reset () {
      this.$refs.form.reset()
      
    },    
  },
}
</script>

<style>

</style>