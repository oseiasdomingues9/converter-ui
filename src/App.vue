<script setup lang="ts">
import { useRouter } from 'vue-router';
import Header from './components/Header.vue'
import CryptoServices from './services/CryptoServices';
import UserService from './services/UserService';
import { reactive, onUpdated } from 'vue';
import User from './models/User';

const route = useRouter()

function showHeader() {
    return !route.currentRoute.value.fullPath.includes("login")
}

let users = reactive<User>({
    id: '',
    login: '',
    active: false,
    role: '',
    healthPlan : []
});

onUpdated(() =>{
    if(localStorage.getItem("token")){
        let userId : any = CryptoServices.decrypted(localStorage.getItem('user'))
        UserService.findById(userId).then((res) => {
            Object.assign(users,res.data.data)
        })
    }
})



</script>

<template>
    <Header v-if="showHeader()" :user="users"/>    
    <router-view :user="users"></router-view>
</template>

<style scoped>
</style>
