  <template>
  <FormularioInicial @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <BoxVue v-if="listaEstaVazia">
      Você ainda não fez nenhuma tarefa hoje.
    </BoxVue>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="filtro" placeholder="Digite o que deseja buscar" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TarefaVue
      v-for="(tarefa, index) in tarefas"
      :tarefa="tarefa"
      :key="index"
      @aoTarefaClicada="selecionarTarefa"
    />
  </div>
  <div
    class="modal"
    :class="{ 'is-active': tarefaSelecionada }"
    v-if="tarefaSelecionada"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edite uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="descricaoDaTarefa" class="label"> Descrição </label>
          <input
            class="input"
            type="text"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button @click="alterarTarefa" class="button is-success">
          Salvar alterações
        </button>
        <button class="button" @click="fecharModal">Cancelar alterações</button>
      </footer>
    </div>
  </div>
</template>

  <script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import FormularioInicial from "../components/Formulario.vue";
import TarefaVue from "../components/Tarefa.vue";
import BoxVue from "../components/Box.vue";

import { useStore } from "@/store";
import ITarefa from "@/Interface/ITarefa";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";

export default defineComponent({
  name: "App",
  components: {
    FormularioInicial,
    TarefaVue,
    BoxVue,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length == 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref("")
    // const tarefas = computed(() => store.state.tarefas.filter(
    //   t => !filtro.value || t.descricao.includes(filtro.value)))

    watchEffect(() =>{
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })
    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro
    };
  },
});
</script>
  
 