<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
   <div class="column is-one-quarter">
    <BarraLateral @aoTemaAlterado="trocarTema"/>
   </div>
   <div class="column is-three-quarter conteudo">
    <FormularioInicial @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
      <TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
      <BoxVue v-if="listaEstaVazia">
        Você ainda não fez nenhuma tarefa hoje.
      </BoxVue>
    </div>
   </div>
  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioInicial from './components/Formulario.vue';
import TarefaVue from './components/Tarefa.vue';
import ITarefa from './Interface/ITarefa';
import BoxVue from './components/Box.vue';
export default defineComponent({
  components: { 
    BarraLateral, 
    FormularioInicial, 
    TarefaVue,
    BoxVue },
  name: 'App',
  data () {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
    }
  },
  computed: {
    listaEstaVazia (): boolean{
      return this.tarefas.length === 0
    }
  },
  methods:{
    salvarTarefa (tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    },
    trocarTema(modoEscuroAtivo: boolean){
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
});
</script>

<style>
.lista{
  padding: 1.25rem;
}
main{
  --bg-primario: #fff;
  --texto-primario1: #0000;
}
main.modo-escuro{
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
} 
.conteudo {
  background-color: var(--bg-primario);
}
</style>
