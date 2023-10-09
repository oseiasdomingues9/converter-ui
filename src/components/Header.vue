<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import CryptoServices from '../services/CryptoServices';


const router = useRouter();

function logout(){
    AuthService.logout().then(() =>{
        localStorage.clear();
        router.push('/login');
    })
}

onMounted(() => {
  let user = CryptoServices.decrypted(localStorage.getItem("user"))
  UserService.findRole(user).then((res) => {
    role.value = res.data.data
  })
})

let role = ref('')

const items2 = ref([
    {
        label: 'Clientes', 
        icon: 'pi pi-wallet', 
        command : () => {
            router.push("/clients")
        },
    },
    {
        label: 'Operadoras', 
        icon: 'pi pi-briefcase', 
        command : () => {
            router.push("/health-insurance")
        },
    },
    {
        label: 'Usuarios', 
        icon: 'pi pi-user', 
        command : () => {
            router.push("/users")
        },
    },
    { separator: true },
    {
        label: 'Sair', 
        icon: 'pi pi-sign-out', 
        command : logout
    }
]);

const menu = ref();

function showMenu(event : any){
    menu.value.toggle(event);
}



</script>

<template>
    <Menubar class="bg-gray-800 border-noround border-none">
        <template #start>
            <div class="logo">
                <span class="ml-1 text-4xl text-yellow-500" @click="router.push('/conversor')">Conversor</span>
            </div>
        </template>
        <template #end>
            <div class="flex align-items-center gap-3">
                <div v-if="role == 'ADMIN'">
                    <Button icon="pi pi-cog" rounded class="bg-orange-500 hover:bg-orange-700" @click="showMenu"></Button>
                    <Menu ref="menu" id="overlay_menu" :model="items2" :popup="true" />
                </div>
                <div v-else>
                    <Button icon="pi pi-sign-out" rounded class="bg-orange-500 hover:bg-orange-700" @click="logout"></Button>
                </div>        
            </div>  
        </template>
    </Menubar>
</template>

<style scoped>

</style>