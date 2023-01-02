<template>
    <div class="notificacoes">
        <article class="message" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes" :key="notificacao.id">
            <div class="message-header">{{ notificacao.titulo }}</div>
            <div class="message-body">{{notificacao.texto}}</div>
        </article>
    </div>
</template>
<script lang="ts">
import { TipoNotificacao } from '../Interface/INotificacao';
import { computed, defineComponent } from 'vue';
import { useStore } from '../store';

export default defineComponent({
    name: 'NotificacoesVue',
    data (){
        return{
            contexto:{
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.ATENCAO]: 'is-warning',
                [TipoNotificacao.FALHA]: 'is-danger'
            }
        }
    },
    setup (){
        const store = useStore()
        return{
            notificacoes: computed (()=> store.state.notificacoes)
        }
    }
})

</script>
<style scoped>
.notificacoes{
    position: absolute;
    padding: 8px;
    right: 0;
    width: 300px;
    z-index:105 ;
}

</style>