<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
   <div class="column is-one-quarter">
    <BarraLateral @aoTemaAlterado="trocarTema"/>
   </div>
   <div class="column is-three-quarter conteudo">
    <NotificacoesVue />
    <router-view />
   </div>
  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NotificacoesVue from './components/Notificacoes.vue';
import BarraLateral from './components/BarraLateral.vue';
export default defineComponent({
  name: 'App',
  components: { 
    BarraLateral,
    NotificacoesVue
  }, 
  data () {
    return {
      modoEscuroAtivo: false
    }
  },
  methods:{
    trocarTema(modoEscuroAtivo: boolean): void{
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
