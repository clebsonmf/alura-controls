<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulario para criação de uuma nova tarefa">
                <input 
                type="text" 
                class="input" 
                placeholder="Qual tarefa voce deseja iniciar?"
                v-model="descricao"
                />
            </div>
            <div class="column is-3">
                    <div class="select">
                        <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                         <option
                            :value="projeto.id"
                             v-for="projeto in projetos"
                            :key="projeto.id" >
                             {{ projeto.nome }}
                         </option>
          </select>
        </div>
      </div>
            <div class="column">
                <TemporizadorVue @ao-temporizador-finalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { key } from '../store';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import TemporizadorVue from './Temporizador.vue'

export default defineComponent({
    name:'FormularioInicial',
    emits: ['aoSalvarTarefa'],
    components:{
        TemporizadorVue
    },
    setup (props, {emit}) {
        const store = useStore(key)

        const descricao = ref("")
        const idProjeto = ref("")

        const projetos = computed(()=> store.state.projeto.projetos)


        const finalizarTarefa = (tempoDecorrido: number): void => {
                emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)          
             })
             descricao.value =''
        }

        return {
            descricao,
            idProjeto,
            projetos,
            finalizarTarefa
        }
    }
});
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>
