import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../view/UserList.vue';
import ClientList from '../view/ClientList.vue';
import HealthInsuranceList from '../view/HealthInsuranceList.vue';
import Login from '../view/Login.vue';
import ConversorTiss from '../view/ConversorTiss.vue';

import { authGuard } from '../guards/authGuard';
import { conversorGuard } from '../guards/conversorGuard';
import { controlGuard } from '../guards/controlGuard';


export default createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : '/',
            redirect : "/login",
        },
        {
            path : '/login',
            component : Login,
            beforeEnter : authGuard
        },
        {
            path: '/conversor',
            beforeEnter : conversorGuard,
            component: ConversorTiss,
        },
        {
            path : '/clients',
            beforeEnter : controlGuard,
            component : ClientList,
        },
        {
            path : '/plans',
            beforeEnter : controlGuard,
            component : HealthInsuranceList,
        },
        {
            path : '/users',
            beforeEnter : controlGuard,
            component : UserList,
        }
        ]
})