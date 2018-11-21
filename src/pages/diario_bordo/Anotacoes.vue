<template>
  <div>
    <q-table
      grid
      title="Diário de Bordo"
      ref="table"
      :data="serverData"
      :columns="columns"
      :filter="filter"
      :separator="separator"
      row-key="name"
      :pagination.sync="serverPagination"
      :loading="loading"
      :visible-columns="visibleColumns"
      @request="request"
    >
      <template slot="top-right" slot-scope="props">
        <q-table-columns
          color="secondary"
          class="q-mr-sm"
          v-model="visibleColumns"
          :columns="columns"
        />
        <!--<q-select-->
        <!--color="secondary"-->
        <!--v-model="separator"-->
        <!--:options="[-->
        <!--{ label: 'Horizontal', value: 'horizontal' },-->
        <!--{ label: 'Vertical', value: 'vertical' },-->
        <!--{ label: 'Cell', value: 'cell' },-->
        <!--{ label: 'None', value: 'none' }-->
        <!--]"-->
        <!--hide-underline-->
        <!--/>-->
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
        />
        <q-search hide-underline v-model="filter"/>
      </template>
      <!--<template slot="top-left" slot-scope="props">-->
      <!---->
      <!--</template>-->
      <q-tr class="bg-primary" slot="header" slot-scope="props" :props="props">
        <q-th class="text-white" v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
      <q-td slot="body-cell-geracao_compl" slot-scope="props" :props="props">
        <q-icon :name="props.value ? 'check_circle' : 'clear'" size="1.5rem"/>
      </q-td>
      <q-td slot="body-cell-motivo_causa" slot-scope="props" :props="props">
        <span v-html="props.value"></span>
      </q-td>
      <q-td slot="body-cell-motivo_reducao" slot-scope="props" :props="props">
        <span v-html="props.value"></span>
      </q-td>
      <q-td slot="body-cell-acoes" slot-scope="props" :props="props">
        <!--<q-btn-->
          <!--flat round dense-->
          <!--color="primary"-->
          <!--icon="edit"-->
          <!--@click="editarAnotacao(props.row)"-->
        <!--/>-->
        <!--<q-btn-->
          <!--flat round dense-->
          <!--color="faded"-->
          <!--icon="assignment_turned_in"-->
          <!--@click="finalizarOcorrencia(props.row.id)"-->
        <!--/>-->
        <q-btn
          flat round dense
          color="red"
          icon="delete"
          @click="excluirOcorrencia(props.row.id)"
        />
      </q-td>
    </q-table>
    <q-btn
      round
      size="lg"
      color="primary"
      class="glossy fixed"
      icon="note_add"
      style="right: 18px; bottom: 68px"
      :to="nova_anotacao_diario_bordo"
    />
  </div>
</template>

<script>
  import {API_SERVICE_URL} from "../../config";
  import {date} from 'quasar'
  import {required} from 'vuelidate/lib/validators'
  import {authHeader} from "../../helpers/auth_header";

  export default {
    name: "Anotacoes",
    data: () => ({
      opened: false,
      modalBtnTitulo: 'Criar',
      filter: '',
      loading: false,
      separator: 'horizontal',
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
      visibleColumns: ['id', 'dta_ocor_semana', 'dta_ocor', 'dta_ocor_hora', 'motivo_causa', 'geracao_compl', 'motivo_reducao', 'hr_ocioso', 'acoes'],
      columns: [
        {
          name: 'id',
          label: '#',
          field: 'id',
          sortable: true
        },
        {
          name: 'dta_ocor_semana',
          label: 'Dia Ocorrência',
          field: 'dta_ocor',
          format: val => date.formatDate(val, 'dddd')
        },
        {
          name: 'dta_ocor',
          label: 'Data Ocorrência',
          field: 'dta_ocor',
          sortable: true,
          format: val => date.formatDate(val, 'DD/MM/YYYY')
        },
        {
          name: 'dta_ocor_hora',
          label: 'Hora',
          field: 'dta_ocor',
          format: val => date.formatDate(val, 'HH:mm')
        },
        {
          name: 'motivo_causa',
          label: 'Observação',
          field: 'motivo_causa'
        },
        {
          name: 'situacao',
          label: 'Situação',
          field: 'situacao',
          sortable: true
        },
        {
          name: 'usu_origem',
          label: 'Criado Por',
          field: 'usu_origem'
        },
        {
          name: 'geracao_compl',
          label: 'Complement.',
          field: 'geracao_compl'
        },
        {
          name: 'motivo_reducao',
          label: 'Motivos Reduções',
          field: 'motivo_reducao'
        },
        {
          name: 'hr_ocioso',
          label: 'HR Ociosa',
          field: 'hr_ocioso'
        },
        {
          name: 'acoes',
          label: 'Ações',
          field: 'id',
        }
      ],
      serverPagination: {
        page: 1,
        rowsNumber: 31
      },
      alvo: '',
      serverData: []
    }),
    validations: {
      form: {
        dta_ocor: {required},
        motivo_causa: {required}
      },
    },
    methods: {
      request({pagination, filter}) {
        this.loading = true
        this.$axios.defaults.headers.common["Authorization"] = authHeader()["Authorization"];
        let url = `${API_SERVICE_URL}/diario/?page=${pagination.page}${pagination.sortBy == null ? '' : '&ordering=' + (pagination.descending ? '' : '-') + pagination.sortBy}&filter=${filter}`
        // console.log(url)
        this.$axios.get(url)
          .then(({data}) => {
            this.serverPagination = pagination
            this.serverPagination.rowsNumber = data.count
            this.serverData = data.results
            // console.log(data.results)
            this.loading = false
          })
          .catch(e => {
            console.log(e.response)
            this.loading = false
          })
      },
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
      },
      criarAnotacao() {
        this.alvo = 0
        this.modalBtnTitulo = 'Criar'
        this.form = Object.assign({}, this.defaultItem)
        this.opened = true
        console.log(this.form)
      },
      editarAnotacao(item) {
        // if (item.situacao.toLowerCase() != 'ativo') {
        //   this.$q.notify({
        //     message: 'Não é possível editar uma ocorrência concluída...',
        //     type: 'warning',
        //     position: 'top'
        //   })
        //   return
        // }
        this.alvo = item.id
        this.modalBtnTitulo = 'Editar'
        this.form = Object.assign({}, item)
        this.opened = true
      },
      // finalizarOcorrencia(id) {
      //   this.alvo = id
      //   this.finalForm = {
      //     dta_concl: '',
      //     motivo_reducao: ''
      //   }
      //   this.openedFinal = true
      // },
      // submitFinalizarOcorrencia() {
      //   this.formTrat = true
      //   this.$v.finalForm.$touch()
      //   if (this.$v.finalForm.$error) {
      //     this.$q.notify('Dados inválidos, favor verifique...')
      //     return
      //   }
      //   let dados = {
      //     dta_concl: this.finalForm.dta_concl,
      //     motivo_reducao: this.finalForm.motivo_reducao
      //   }
      //   this.$axios.defaults.headers.common["Authorization"] = authHeader()["Authorization"];
      //   this.$axios.patch(`${API_SERVICE_URL}/diario/${this.alvo}/`, dados)
      //     .then(res => {
      //       this.$q.notify({
      //         message: 'Ocorrência finalizada com sucesso!',
      //         type: 'positive',
      //         position: 'top'
      //       })
      //       this.request({
      //         pagination: this.serverPagination,
      //         filter: this.filter
      //       })
      //     })
      //     .catch(e => {
      //       this.$q.notify({
      //         message: 'Erro ao finalizar ocorrência.',
      //         type: 'negative',
      //         position: 'top'
      //       })
      //       console.log(e)
      //     })
      //   this.alvo = ''
      //   this.formTrat = false
      //   this.openedFinal = false
      // },
      excluirOcorrencia(id) {
        this.$q.dialog({
          title: 'Confirmação de Exclusão',
          message: 'Tem certeze que quer mesmo excluir este registro?',
          ok: 'Sim! Eu quero excluir.',
          cancel: 'Não, cliquei sem querer'
        }).then(() => {
          this.$axios.defaults.headers.common["Authorization"] = authHeader()["Authorization"];
          this.$axios.delete(`${API_SERVICE_URL}/diario/${id}/`)
            .then(res => {
              this.$q.notify({
                message: 'Ocorrência removida com sucesso!',
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
                message: 'Erro ao remover ocorrência.',
                type: 'negative',
                position: 'top'
              })
              console.log(e)
            })
        }).catch(() => {
          this.$q.notify({
            message: 'Calma, nada foi enviado.',
            type: 'info',
            position: 'top'
          })
        })
        this.alvo = ''
      }
    },
    mounted() {
      this.request({
        pagination: this.serverPagination,
        filter: this.filter
      })
    }
  }
</script>

<style scoped>

</style>
