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
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import TemporizadorVue from './Temporizador.vue'

export default defineComponent({
    name:'FormularioInicial',
    emits: ['aoSalvarTarefa'],
    components:{
        TemporizadorVue
    },
    data () {
        return{
            descricao: "",
            idProjeto: ""
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void{
             this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id==this.idProjeto)          
             })
             this.descricao=''
        }
    },
    setup () {
        const store = useStore(key)
        return {
            projetos: computed(()=> store.state.projetos)
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
