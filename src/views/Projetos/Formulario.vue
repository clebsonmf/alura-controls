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
import useNotificador  from '../../hooks/notificador'
import { ADICIONA_PROJETO, ALTERA_PROJETO} from "../../store/tipo-mutacoes";
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
            this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O projeto foi cadastrado com sucesso')
            this.$router.push('/projetos')
        }
    },
    setup (){
        const store = useStore()
        const {notificar} = useNotificador()
        return {
            store,
            notificar
        }
    }
});
</script>

