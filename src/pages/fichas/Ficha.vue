<template>
  <q-layout>
    <div style="background-color: #fff; padding-left: 5px; padding-right: 5px;">
      <q-page-sticky class="print-hide" position="top-right" :offset="[18, 18]">
        <q-btn round color="primary" @click="$router.push('/alvos/fichas')" icon="arrow_back">
          <q-tooltip>
            <!--
              The DOM element(s) that make up the tooltip,
              in this case a simple text:
            -->
            Voltar para alvos.
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
      <div class="row justify-center">
        <div class="titulo">
          <h4 class="text-weight-medium">
            Fichas de Negociação
          </h4>
        </div>
      </div>
      <div v-for="ficha in alvos" class="justify-center">
        <div class="fichas">
          <div class="ficha">
            <div class="row">
              <div class="col-4 col-md-9">
                <b>Nome:</b> {{ ficha.nome }}
              </div>
              <div class="col-4 col-md-3">
                <b>UC:</b> {{ ficha.instalacao }} - {{ ficha.status_inst }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-10">
                <b>Endereço:</b> {{ ficha.endereco }}
              </div>
              <div class="col-md-2">
                <b>TIPO:</b> {{ ficha.zona }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-5">
                <b>Bairro:</b> {{ ficha.bairro }}
              </div>
              <div class="col-md-5">
                <b>Compl.:</b> {{ ficha.complemento }}
              </div>
              <div class="col-md-2">
                <b>Classe:</b> {{ ficha.classe }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-5">
                <b>Cliente:</b> {{ ficha.cc }}
              </div>
              <div class="col-md-4">
                <b>E-mail:</b> {{ ficha.email }}
              </div>
              <div class="col-md-3">
                <b>Telefone:</b> {{ ficha.telefone }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <b>Referencia:</b> {{ ficha.referencia }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <b>Etapa:</b> {{ ficha.etapa }}
              </div>
              <div class="col-md-2">
                <b>BaixaRenda:</b> {{ ficha.e_baixarenda }}
              </div>
              <div class="col-md-2">
                <b>Seq.:</b> {{ ficha.sequencia }}
              </div>
              <div class="col-md-4">
                <b>Localidade:</b> {{ ficha.localidade }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <b>Medidor:</b> {{ ficha.medidor }}
              </div>
              <div class="col-md-4">
                <b>Unidade Leitura:</b> {{ ficha.unidade_leitura }}
              </div>
              <div class="col-md-4">
                <b>Responsável:</b> {{ ficha.responsavel }}
              </div>
            </div>
          </div>
          <div class="subficha">
            <div class="row">
              <div class="col-md-4">
                <b>Valor do Débito [{{ ficha.faturas }}]:</b> R$ {{ ficha.debito }}
              </div>
              <div class="col-md-4">
                <b>Valor do CNR:</b> R$ {{ ficha.cnr }}
              </div>
              <div class="col-md-4">
                <b>Valor do Total:</b> R$ {{ ficha.total }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <b>PDD+Perdas Cons:</b> R$ {{ ficha.pdd_perdas_consumo }}
              </div>

              <div class="col-md-4">
                <b>PDD+Perdas CNR:</b> R$ {{ ficha.pddperdas_cnr }}
              </div>
              <div class="col-md-4">
                <b>PDD+Perdas:</b> R$ {{ ficha.pddperdas }}
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <b>LF:</b> R$ {{ ficha.lf }}
              </div>
              <div class="col-md-4">
                <b>Bloq:</b> R$ {{ ficha.bloq }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
  export default {
    name: "Ficha",
    data: () => ({
      alvos: []
    }),
    methods: {
      getAlvos() {
        this.alvos = this.$store.state.fichas.fichas
        return this.alvos
      }
    },
    created() {
      this.getAlvos()
    }
  }
</script>

<style scoped>
  .fichas {
    padding-bottom: 5px;
  }

  .ficha {
    padding: 10px;
    border-style: solid;
    background-color: #fff;
  }

  .subficha {
    border-style: none solid solid solid;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #fff;
  }

  .subficha .row:first-child {
    padding-top: 10px;
  }

  .subficha .row:last-child {
    padding-bottom: 10px;
  }

  @media print {
    *,
    *::before,
    *::after {
      text-shadow: none !important;
      box-shadow: none !important;
    }

    a:not(.btn) {
      text-decoration: underline;
    }

    abbr[title]::after {
      content: " (" attr(title) ")";
    }

    pre {
      white-space: pre-wrap !important;
    }

    pre,
    blockquote {
      border: 1px solid #adb5bd;
      page-break-inside: avoid;
    }

    thead {
      display: table-header-group;
    }

    tr,
    img {
      page-break-inside: avoid;
    }

    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }

    @page {
      size: a3;
    }

    body {
      min-width: 992px !important;
    }

    .container {
      min-width: 992px !important;
    }

    .navbar {
      display: none;
    }

    .badge {
      border: 1px solid #000;
    }

    .table {
      border-collapse: collapse !important;
    }

    .table td,
    .table th {
      background-color: #fff !important;
    }

    .table-bordered th,
    .table-bordered td {
      border: 1px solid #dee2e6 !important;
    }

    .table-dark {
      color: inherit;
    }

    .table-dark th,
    .table-dark td,
    .table-dark thead th,
    .table-dark tbody + tbody {
      border-color: #dee2e6;
    }

    .table .thead-dark th {
      color: inherit;
      border-color: #dee2e6;
    }
  }

</style>
