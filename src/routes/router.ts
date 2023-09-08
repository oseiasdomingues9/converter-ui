import { createRouter, createWebHistory } from 'vue-router'
import ConversorTiss from '../components/conversor/ConversorTiss.vue'

export default createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : '/',
            component : ConversorTiss
        }
    ]

})