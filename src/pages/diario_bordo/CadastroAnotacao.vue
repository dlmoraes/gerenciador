<template>
  <div class="row gutter-sm" style="padding:10px">
    <div class="col-xs-12 col-md-9">
      <q-card inline class="fit shadow-6">
        <q-card-separator/>
        <q-toolbar class="bg-white" slot="footer">
          <q-toolbar-title>
            <div class="row">
              <div class="offset-md-11">
                <q-btn
                  color="primary"
                  size="md"
                  label="Criar"
                  @click="submit"
                  :disabled="formTrat"
                />
              </div>
            </div>
          </q-toolbar-title>
        </q-toolbar>
        <q-card-main>
          <div class="overflow-hidden">
            <div class="row gutter-x-sm gutter-y-lg">
              <div class="col-xs-12 col-md-12">
                <label class="q-title">Causa</label>
                <hr/>
                <q-editor
                  v-model="form.motivo_causa"
                  toolbar-text-color="white"
                  toolbar-toggle-color="yellow-8"
                  toolbar-flat
                  toolbar-bg="primary"
                  :toolbar="[
                                ['bold', 'italic', 'underline'],
                                [{
                                  label: this.$q.i18n.editor.formatting,
                                  icon: this.$q.icon.editor.formatting,
                                  list: 'no-icons',
                                  options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
                                }]
                              ]"
                  @blur="this.$v.form.motivo_causa.$touch"
                  @keyup.enter="submit"
                  :error="this.$v.form.motivo_causa.$error"
                />
              </div>
              <div class="col-xs-12 col-md-12">
                <label class="q-title">Redução</label>
                <hr/>
                <q-editor
                  v-model="form.motivo_reducao"
                  toolbar-text-color="white"
                  toolbar-toggle-color="yellow-8"
                  toolbar-flat
                  toolbar-bg="primary"
                  :toolbar="[
                                ['bold', 'italic', 'underline'],
                                [{
                                  label: this.$q.i18n.editor.formatting,
                                  icon: this.$q.icon.editor.formatting,
                                  list: 'no-icons',
                                  options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
                                }]
                              ]"
                />
              </div>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="col-xs-12 col-md-3">
      <q-card inline class="fit shadow-6 q-pa-md">
        <q-card-main>
          <div class="row q-mt-lg">
            <div class="col">
              <q-datetime v-model="form.dta_ocor"
                          type="datetime"
                          float-label="Data da Ocorrência"
                          format="DD/MM/YYYY HH:mm:ss"
                          clearable
                          @blur="this.$v.form.dta_ocor.$touch"
                          @keyup.enter="submit"
                          :error="this.$v.form.dta_ocor.$error"
              />
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col">
              <q-datetime v-model="form.dta_concl"
                          type="datetime"
                          float-label="Data da Conclusão"
                          format="DD/MM/YYYY HH:mm:ss"
                          clearable
              />
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col">
              <q-checkbox v-model="form.geracao_compl" label="Geração Complementar?"/>
            </div>
          </div>
        </q-card-main>
        <q-card-separator/>
        <q-card-actions align="end">
          <q-btn push @click="$router.push({name:'anotacoes_diario_bordo'})">Voltar</q-btn>
          <q-btn push class="bg-primary text-white" @click="submit">Criar</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
  import {date} from 'quasar'
  import {required} from 'vuelidate/lib/validators'
  import request from '../../libs/request'

  export default {
    name: "CadastroAnotacao",
    data: () => ({
      form: {
        dta_ocor: '',
        geracao_compl: false,
        motivo_causa: '',
        dta_concl: '',
        motivo_reducao: ''
      },
      defaultItem: {
        dta_ocor: '',
        geracao_compl: false,
        motivo_causa: '',
        dta_concl: '',
        motivo_reducao: ''
      },
      alvo: '',
      formTrat: false

    }),
    validations: {
      form: {
        dta_ocor: {required},
        motivo_causa: {required}
      },
    },
    methods: {
      async submit() {
        this.formTrat = true
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          this.$q.notify('Dados inválidos, favor verifique...')
          return
        }
        await this.$store.dispatch('anotacoes/addAnotacao', this.form)
        if (this.$store.state.anotacoes.criado) {
          this.$q.notify({
            message: 'Ocorrência criada com sucesso!',
            type: 'positive',
            position: 'top'
          })
          setTimeout(() => {
            this.$router.back()
          }, 1000)
        } else {
          this.$q.notify({
            message: 'Erro ao criar ocorrência.',
            type: 'negative',
            position: 'top'
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
