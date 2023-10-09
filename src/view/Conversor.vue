<script setup lang="ts">
import { reactive } from "vue";
import Upload from "../components/conversor/Upload.vue"
import User from "../models/User";
import CryptoServices from "../services/CryptoServices";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { useRouter } from "vue-router";

const route = useRouter()


let users = reactive<User>({
    id: '',
    login: '',
    active: false,
    role: '',
    healthInsurance: [],
    email: '',
    password: "",
    client: undefined,
    planType: "",
    url: ""
});

function getUser(){
    if(localStorage.getItem("authenticated")){
        let userId : any = CryptoServices.decrypted(localStorage.getItem('user'))
        UserService.findById(userId).then((res) => {
            Object.assign(users,res.data.data)
        }).
        catch(() => {
            localStorage.removeItem("authenticated")
            logout()
        }
    )}else{
        logout()
    }
}

function logout(){
    AuthService.logout()
    .then(() => {
        localStorage.removeItem("authenticated")
        route.push("/login")
    })
}

getUser()


</script>

<template>
    <div class="flex flex-column mx-auto mt-5 w-9">
        <div class="flex flex-row w-12 mx-auto">
            <Card class="w-full h-full">
                <template #title> Upload </template>
                <template #content>
                    <Upload :users="users"/>
                </template>
            </Card>
        </div>
    </div>
</template>

<style scoped>
</style>