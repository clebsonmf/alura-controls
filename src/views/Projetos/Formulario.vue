<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
                <input 
                  class="input"
                  type="text"
                  v-model="nomeDoProjeto"
                  id="nomeDoProjeto"
                
                />
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
       
    </section>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { TipoNotificacao } from '../../Interface/INotificacao';
import { useStore } from '../../store';
import { ADICIONA_PROJETO, ALTERA_PROJETO, NOTIFICAR} from "../../store/tipo-mutacoes";
export default defineComponent ({
    name: 'FormularioVue',
    props: {
        id: {
            type: String
        }
    },
    mounted(){
        if (this.id){
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data (){
        return {
            nomeDoProjeto: ''
        };
    },
    methods: {
        salvar (){
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto 
                })
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }
            this.nomeDoProjeto='',
            this.store.commit(NOTIFICAR, {
                titulo:'Novo projeto salvo',
                texto: 'Sucesso. Seu projeto está disponível pra uso',
                tipo: TipoNotificacao.SUCESSO
            })
            this.$router.push('/projetos')
        },
    },
    setup (){
        const store = useStore()
        return {
            store
        }
    }
});
</script>

