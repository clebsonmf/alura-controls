import ITarefa from "@/Interface/ITarefa";
import { Estado } from "@/store";
import { Module } from "vuex";
import http from '@/http'
import { ALTERA_TAREFA, ADICIONA_TAREFA, DEFINIR_TAREFAS } from "@/store/tipo-mutacoes";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "@/store/tipo-acoes";

export interface EstadoTarefas {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefas, Estado> ={
    state:{
        tarefas: []
    },
    mutations: {
        [DEFINIR_TAREFAS] (state, tarefas: ITarefa[]){
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA] (state, tarefa:ITarefa){
            const index = state.tarefas.findIndex(tarefa => tarefa.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
    },
    actions: {
        [OBTER_TAREFAS] ({ commit }, filtro: string) {
            let url = 'tarefas'

            if(filtro){
                url += '?descricao=' + filtro
            }

            http.get(url)
            .then(resposta => commit (DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA] ({commit}, tarefa: ITarefa){
           return http.post('/tarefas', tarefa)
           .then(resposta =>commit(ADICIONA_TAREFA, resposta.data) )
        },
        [ALTERAR_TAREFA]  ({commit}, tarefa: ITarefa){
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
            .then(()=>commit(ALTERAR_TAREFA, tarefa) )
        },
    }
}