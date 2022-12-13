  <template>
     <div class="column is-three-quarter conteudo">
      <FormularioInicial @aoSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <BoxVue v-if="listaEstaVazia">
          Você ainda não fez nenhuma tarefa hoje.
        </BoxVue>
      </div>
     </div>  
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue';
  import FormularioInicial from '../components/Formulario.vue';
  import TarefaVue from '../components/Tarefa.vue';
  import ITarefa from '../Interface/ITarefa';
  import BoxVue from '../components/Box.vue';
  export default defineComponent({
    components: { 
      FormularioInicial, 
      TarefaVue,
      BoxVue },
    name: 'App',
    data () {
      return {
        tarefas: [] as ITarefa[],
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
      }
    }
  });
  </script>
  
 