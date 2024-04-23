
import { createApp } from 'vue';
import router from './Routes/index.js';
import MyApp from './components/MyApp.vue';

import Store from './Store';

import {createBootstrap} from 'bootstrap-vue-next'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import './Assets/scss/common.scss';





createApp(MyApp)
.use(router)
.use(createBootstrap({components: true, directives: true}))
.use(Store)
.mount('#app');