<template>
  <div class="row">
    <div class="col-12">
      <q-card class="fixed-center" style="width: 350px">
        <q-toolbar color="primary">
          <q-icon name="verified_user"/>
          <q-toolbar-title>
            Login
          </q-toolbar-title>
        </q-toolbar>
        <q-card-separator/>
        <q-card-main>
          <q-field icon="person_pin">
            <q-input v-model="form.login"
                     placeholder="Seu Login"
                     @blur="this.$v.form.login.$touch"
                     @keyup.enter="submit"
                     :error="this.$v.form.login.$error"
            />
          </q-field>
          <br/>
          <q-field icon="vpn_key">
            <q-input v-model="form.password"
                     type="password"
                     placeholder="Sua Senha"
                     @blur="this.$v.form.password.$touch"
                     @keyup.enter="submit"
                     :error="this.$v.form.password.$error"
            />
          </q-field>
        </q-card-main>
        <div class="submit row reverse">
          <q-btn color="primary" :disabled="loading" @click="submit()">Logar</q-btn>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
  import {required, minLength} from 'vuelidate/lib/validators'

  const v_login = value => {
    console.log(value)
    if (typeof value === 'undefined' || value === null || value === '') {
      return true
    }
    return /^[a-z0-9_]+$/.test(value)
  }

  export default {
    name: 'Autenticacao',
    data() {
      return {
        loading: false,
        form: {
          login: '',
          password: ''
        }
      }
    },
    validations: {
      form: {
        login: {required, minLength: minLength(5), v_login},
        password: {required, minLength: minLength(7)}
      }
    },
    computed: {
      loggingIn() {
        return this.$store.state.authentication.status.loggingIn;
      }
    },
    created() {
      // reset login status
      this.$store.dispatch('autenticacao/logout');
    },
    methods: {
      submit() {
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          this.$q.notify('Dados inválidos, favor verifique...')
          return
        }
        this.loading = true
        const {login, password} = this.form;
        if (login && password) {
          this.$store.dispatch('autenticacao/login', {login, password})
        }
      }
    }
  }
</script>

<style lang="stylus">
  .input-card
    border-radius 5px
    margin-top -50px
    width 80vw
    max-width 600px
    margin 10vh
    .layout-padding
      margin 0 32px

  .submit
    > .q-btn
      margin 5px
</style>
