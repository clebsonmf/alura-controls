<template>
    <BoxVue>
        <div class="columns clicavel" @click="tarefaClicada">
         <div class="column is-4">
            {{ tarefa.descricao }}
         </div>
         <div class="column is-3">{{ tarefa.projeto?.nome || 'Não disponível' }}</div>
         <div class="column">
            <CronometroVue  :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
         </div>
       </div> 
    </BoxVue>   
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CronometroVue from './Cronometro.vue';
import ITarefa from '../Interface/ITarefa';
import BoxVue from './Box.vue';

export default defineComponent({
    name: 'TarefaVue',
    components: {
        CronometroVue,
        BoxVue
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    emits:['aoTarefaClicada'],
    methods: {
        tarefaClicada():void{
             this.$emit('aoTarefaClicada', this.tarefa)
        }
    }
});
</script>
<style scoped>
.clicavel{
    cursor: pointer;
}
</style>
