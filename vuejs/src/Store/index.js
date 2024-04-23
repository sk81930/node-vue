import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import profile from './modules/profile';
import admin from './modules/admin';
import manager from './modules/manager';
import project from './modules/project';
import task from './modules/task';
import chat from './modules/chat';

export default createStore({
     plugins:[
        createPersistedState()
    ],
    modules:{
        auth,
        profile,
        admin,
        manager,
        project,
        task,
        chat,
    }
})