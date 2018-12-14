<template>
  <div>
    <q-window-resize-observable @resize="onResize"/>
    <div class="row gutter-sm" style="padding:10px">
      <transition
        enter-active-class="animated bounceInLeft"
        leave-active-class="animated bounceOutRight"
        :duration="300"
      >
        <div v-if="buscarAlvos" class="col-xs-12 col-md-9">
          <q-card inline class="fit shadow-6">
            <q-card-main>
              <div class="overflow-hidden">
                <div class="row gutter-x-sm gutter-y-lg">
                  <div class="col-xs-12 col-md-12">
                    <p class="caption text-weight-medium">Informe abaixo, os alvos e marque ao lado o tipo de alvo
                      (Instalação ou Conta
                      Contrato), limite de alvos: 1000.</p>
                    <q-input
                      v-model="form.alvos"
                      type="textarea"
                      float-label="Alvos"
                      rows="10"
                      :error="this.$v.form.alvos.$error"
                      :max-height="200"
                    />
                  </div>
                </div>
                <div class="row gutter-x-sm gutter-y-lg">
                  <div class="col-xs-12 col-md-4">
                    <q-field
                      icon="work"
                      label="Tipo de Alvo"
                      helper="Selecione um tipo de alvo"
                      :error="this.$v.form.tipo.$error"
                    >
                      <q-option-group
                        color="primary"
                        v-model="form.tipo"
                        :options="tiposAlvos"
                      />
                    </q-field>
                  </div>
                </div>
              </div>
            </q-card-main>
            <q-card-separator/>
            <q-card-actions align="end">
              <q-btn push class="bg-primary text-white" @click="submit">Pesquisar</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </transition>
    </div>
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
      <q-page v-if="mostrarOpcoes" class="flex flex-center"
              :style="this.size.width > 800 ? 'padding-bottom: 10%' : 'padding-bottom: 40%'">
        <div class="row gutter-sm">
          <div class="col-sm-5 col-md-5">
            <download-excel
              :data="alvos">
              <q-btn :size="this.size.width > 800 ? '6rem' : '2rem'" round icon="fa fa-file-excel" color="green-10">
                <q-tooltip>
                  Exportar para Excel
                </q-tooltip>
              </q-btn>
            </download-excel>
          </div>
          <div class="col-sm-2 col-md-2" style="padding-left: 9%; padding-right: 5%">
            <hr/>
          </div>
          <div class="col-sm-5 col-md-5">
            <q-btn @click="visualizarFichas" :size="this.size.width > 800 ? '6rem' : '2rem'" round
                   color="primary"
                   icon="fa fa-clipboard-list">
              <q-tooltip>
                Imprimir fichas
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-page>
    </transition>
  </div>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'


  export default {
    name: "Fichas",
    data: () => ({
      form: {
        alvos: '',
        tipo: ''
      },
      defaultItem: {
        alvos: '',
        tipo: ''
      },
      tiposAlvos: [
        {label: 'Conta Contrato', value: 'cc'},
        {label: 'Instalação', value: 'instalacao'},
      ],
      buscarAlvos: true,
      mostrarOpcoes: false,
      mostrarFichas: false,
      alvos: {},
      size: {}
    }),
    validations: {
      form: {
        alvos: {required},
        tipo: {required}
      },
    },
    methods: {
      onResize(size) {
        this.size = size
      },
      validaAlvos(alvos) {
        if (isNaN(parseFloat(alvos.substr(-1)) && isFinite(alvos.substr(-1)))) {
          this.validaAlvos(alvos.substr(0, (alvos.length - 1)))
        }
        return alvos
      },
      prepararAlvos(alvos) {
        let tempAlvos = alvos
        tempAlvos = tempAlvos.replace(/^\s*/, "").replace(/\s*$/, "")
        tempAlvos = tempAlvos.replace(/(\r\n|\n|\r)/gm, "")
        tempAlvos = tempAlvos.replace(/\D+,/g, '')
        tempAlvos = tempAlvos.split(',')
        return tempAlvos
      },
      validaAlvo(alvos, tipo) {
        const tamanho = tipo == 'cc' ? 12 : 10
        let formato = tipo == 'cc' ? '000000000000' : '0000000000'
        let tratados = []
        alvos.forEach(function (elemento) {
          if (elemento.length !== tamanho) {
            tratados.push((formato + elemento).slice(-12))
          } else {
            tratados.push(elemento)
          }
        })
        return tratados
      },
      prepararSubmit() {
        this.formTrat = true
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          this.$q.notify('Dados inválidos, favor verifique...')
          return
        }
        let alvos = this.form.alvos
        alvos = this.validaAlvos(alvos)
        alvos = this.prepararAlvos(alvos)
        alvos = this.validaAlvo(alvos, this.form.tipo)
        let dados = {
          '%2C': alvos
        }
        let query = `${this.form.tipo}=${alvos}`
        query = query.replace(/,/g, "%2C")
        return query
      },
      async submit() {
        let query = this.prepararSubmit()
        await this.$store.dispatch('fichas/getFichas', query)
        this.alvos = this.$store.state.fichas.fichas
        this.buscarAlvos = this.$store.state.fichas.buscarAlvos
        setTimeout(() => {
          this.mostrarOpcoes = this.$store.state.fichas.mostrarOpcoes
        }, 600)

      },

      visualizarFichas() {
        this.$router.push('/fichasnegociacao')
      }
    }
  }
</script>

<style scoped>
  hr {

    border: none;
    border-left: 2px solid hsla(200, 10%, 50%, 100);
    height: 100%;
    width: 1px;
  }
</style>
