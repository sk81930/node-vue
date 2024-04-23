import axios from 'axios';
import agent from '../../agent';
import store from '../../Store';
export default {
    namespaced: true,
    state: {
        errors: null,
    },
    getters: {
        setErrors(state, value) {
            state.errors = value
        },
    },
    mutations: {
    },
    actions: {
        async addChatUser({commit},data) {

                return await agent.Chat.addChatUser(data);
        },
        async getConversations({commit}) {

                return await agent.Chat.getConversations();
        },
        async getChatByConId({commit},data) {

                return await agent.Chat.getChatByConId(data);
        },
        async sendMessage({commit},data) {

                return await agent.Chat.sendMessage(data);
        },
    }
}