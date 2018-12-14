<template>
  <div class="row gutter-sm" style="margin:10px">
    <q-card inline class="fit shadow-6 q-pa-md">
      <q-table
        ref="table"
        :data="serverData"
        :columns="columns"
        :filter="filter"
        row-key="name"
        :pagination.sync="serverPagination"
        :loading="loading"
        :visible-columns="visibleColumns"
        @request="request"
      >
        <template slot="top-left" slot-scope="props">
          <q-search upper-case v-model="filter"/>

          <q-btn color="primary"
                 push
                 icon="note_add" style="margin-left: 10px" :to="{ name: 'nova_anotacao_diario_bordo'}"/>
        </template>
        <template slot="top-right" slot-scope="props">
          <q-table-columns
            color="secondary"
            class="q-mr-sm"
            v-model="visibleColumns"
            :columns="columns"
          />
          <q-btn
            flat round dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          />

        </template>
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
          <q-btn
            flat round dense
            color="primary"
            icon="edit"
            @click="$router.push({ name: 'editar_anotacao_diario_bordo', params: { id: props.row.id }})"
          />
          <q-btn
            flat round dense
            color="red"
            icon="delete"
            @click="excluirOcorrencia(props.row.id)"
          />
        </q-td>

        <!--<div slot="bottom" slot-scope="props" class="row flex-center fit">-->
          <!--<q-btn-->
            <!--round dense icon="chevron_left" color="primary" class="q-mr-md"-->
            <!--:disable="props.isFirstPage"-->
            <!--@click="props.prevPage"-->
          <!--/>-->
          <!--<q-btn-->
            <!--round dense icon="chevron_right" color="primary"-->
            <!--:disable="props.pagination.rowsPerPage % props.pagination.rowsNumber == 0"-->
            <!--@click="props.nextPage"-->
          <!--/>-->
        <!--</div>-->

      </q-table>
    </q-card>
  </div>
</template>

<script>
  import {date} from 'quasar'

  export default {
    name: "Anotacoes",
    data: () => ({
      filter: '',
      loading: false,
      separator: 'horizontal',
      visibleColumns: ['id', 'dta_ocor', 'dta_ocor_hora', 'motivo_causa', 'geracao_compl', 'motivo_reducao', 'hr_ocioso', 'acoes'],
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
        rowsNumber: 5
      },
      alvo: '',
      serverData: []
    }),
    methods: {
      async request({pagination, filter}) {
        let params = {
          pagination: pagination,
          query: `page=${pagination.page}${pagination.sortBy == null ? '' : '&ordering=' + (pagination.descending ? '' : '-') + pagination.sortBy}&filter=${filter}`
        }
        await this.$store.dispatch('anotacoes/anotacoes', params)
        this.loading = this.$store.state.anotacoes.loading
        this.serverData = await this.$store.state.anotacoes.serverData
        this.serverPagination = this.$store.state.anotacoes.serverPagination
      },
      async excluirOcorrencia(id) {
        await this.$q.dialog({
          title: 'Confirmação de Exclusão',
          message: 'Tem certeze que quer mesmo excluir este registro?',
          ok: 'Sim! Eu quero excluir.',
          cancel: 'Não, cliquei sem querer'
        }).then(async () => {
          await this.$store.dispatch('anotacoes/removerAnotacao', id)
          if (this.$store.state.anotacoes.removido) {
            this.$q.notify({
              message: 'Ocorrência removida com sucesso!',
              type: 'positive',
              position: 'top'
            })
          } else {
            this.$q.notify({
              message: 'Erro ao remover ocorrência.',
              type: 'negative',
              position: 'top'
            })
          }
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
