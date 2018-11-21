<template>
  <!-- Criar Ocorrência -->
  <q-card>
    <q-card-separator/>
    <q-card-main>
      <div class="overflow-hidden">
        <div class="row gutter-x-sm gutter-y-lg">
          <div class="col-xs-12 col-md-6">
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
          <div class="col-xs-12 col-md-6">
            <q-datetime v-model="form.dta_concl"
                        type="datetime"
                        float-label="Data da Conclusão"
                        format="DD/MM/YYYY HH:mm:ss"
                        clearable
            />
          </div>
          <div class="col-xs-12 col-md-12">
            <q-checkbox v-model="form.geracao_compl" label="Geração Complementar?"/>
          </div>
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
</template>

<script>
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
      }
    }),
    methods: {
      submit() {
        this.formTrat = true
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          this.$q.notify('Dados inválidos, favor verifique...')
          return
        }
        this.$axios.defaults.headers.common["Authorization"] = authHeader()["Authorization"];
        if (this.modalBtnTitulo != 'Editar') {
          this.$axios.post(`${API_SERVICE_URL}/diario/`, this.form)
            .then(res => {
              this.$q.notify({
                message: 'Ocorrência criada com sucesso!',
                type: 'positive',
                position: 'top'
              })
              this.request({
                pagination: this.serverPagination,
                filter: this.filter
              })
            })
            .catch(e => {
              this.$q.notify({
                message: 'Erro ao criar ocorrência.',
                type: 'negative',
                position: 'top'
              })
              console.log(e)
            })
        } else {
          let dados = {
            dta_ocor: this.form.dta_ocor,
            geracao_compl: this.form.geracao_compl,
            motivo_causa: this.form.motivo_causa
          }
          this.$axios.patch(`${API_SERVICE_URL}/diario/${this.alvo}/`, dados)
            .then(res => {
              this.$q.notify({
                message: 'Ocorrência editada com sucesso!',
                type: 'positive',
                position: 'top'
              })
              this.request({
                pagination: this.serverPagination,
                filter: this.filter
              })
            })
            .catch(e => {
              this.$q.notify({
                message: 'Erro ao editar ocorrência.',
                type: 'negative',
                position: 'top'
              })
              console.log(e)
            })
        }
        this.alvo = ''
        this.formTrat = false
        this.opened = false
        this.form = Object.assign({}, this.defaultItem)
      }
    }
  }
</script>

<style scoped>

</style>
