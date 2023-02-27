import { INotificacao} from "../Interface/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore} from "vuex";
import { NOTIFICAR } from "./tipo-mutacoes";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefas, tarefa } from "./modulos/tarefas";

export interface Estado {
    tarefa: EstadoTarefas,
    projeto: EstadoProjeto,
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes:[],
        projeto: {
            projetos:[]
        },
        tarefa: {
            tarefas:[]
        }
    },
    mutations: {
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() =>{
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != notificacao.id)
            },3000 )
        },
    },
    modules:{
        projeto,
        tarefa
    }
})

export function useStore ():Store<Estado>{
    return vuexUseStore(key)
}