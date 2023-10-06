<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import User from '../../models/User'
import * as yup from "yup";
import { ValidationError } from 'yup';
import { useConfirm } from "primevue/useconfirm";
import HealthInsuranceService from '../../services/HealthInsuranceService';
import ClientService from '../../services/ClientService';
import Client from '../../models/Client';
import UserService from '../../services/UserService';
import Plan from '../../models/Plan';
import AuthService from '../../services/AuthService';
import ColorService from '../../services/ColorService';
import UserCreate from '../../models/UserCreate';
import { useToast } from "primevue/usetoast";


const dialogRef : any = inject('dialogRef')
const data = dialogRef.value.data
const isUpdate = ref(false)
const loginInitial = ref('')


const users = reactive<User>(userInitial())
const client = reactive<Client>({
    id: '',
    name: '',
    key: ''
})

const errors = reactive(userErrorInitial())
const SchemaValidation = buildFormValidation()
const clientList = reactive<Client[]>([])
const plansList = reactive<Plan[]>([])


function userInitial() {
  return {
    id: '',
    login: '',
    password : '',
    active: false,
    role: '',
    healthInsurance: [],
    email: '',
    client: undefined,
    planType: '',
    url: ''
  };
}

function userErrorInitial() {
  return {
    id: '',
    login: '',
    password : '',
    active: false,
    role: '',
    email: '',
    client: undefined,
    planType: '',
    url: ''
  };
}

onMounted(() => {
  if(data.user){
    Object.assign(users,data.user)
    isUpdate.value = true
    loginInitial.value = users.login
    Object.assign(client,users.client)
  }



  ClientService.findAll().then((res : any) => {
    Object.assign(clientList,res.data.data)
  })

  UserService.findPlans().then((res : any) => {
    Object.assign(plansList,res.data)
  })

})

function save(){
    Object.assign(errors,userErrorInitial())
    SchemaValidation.validate(users, { abortEarly : false})
    .then((res : any) =>{
        console.log(isUpdate.value)
        let form : UserCreate = {
                    login: res.login,
                    password: res.password,
                    email: res.email,
                    role: 'USER',
                    active: true,
                    clientKey: client.key,
                    planType: res.planType,
                    url: res.url
                }
        if(isUpdate.value){
            UserService.update(form,res.id).then((res : any) => {
                dialogRef.value.close({message: "msg"})
            })
        }else{
            UserService.create(form).then((res : any) => {
                dialogRef.value.close({message: "msg"})
            })
        }
        
    }).catch((error) => {
        error.inner.forEach((err : ValidationError) => {
            // @ts-ignore: Unreachable code error         
            errors[err.path] = err.message
        })
    })
}

function deleteUser(){

}

function clear(){
   Object.assign(errors,userErrorInitial())
   Object.assign(users,userInitial())
}

function buildFormValidation(){
    return yup.object().shape({
        login: yup.string().required("Login *Obrigatório").test("invalid-cpf","CPF invalido",(login) => valideCdf(login)),
    });
}

function valideCdf(login : string){
    return true
}

function validateLogin(){
    errors["login"] = ""
    if(users.login && !isUpdate.value){
        //errors["login"] = "Login existe"
    }else if(isUpdate && loginInitial.value != users.login){
        //errors["login"] = "Login existe AAA"
    }
}


</script>

<template>
    <div class="flex flex-column align-items-center w-full px-5 pt-2">
        <form class="flex flex-column w-25rem">


            <div class="flex gap-3">
                <div class="flex flex-column w-full gap-2">
                    <label for="login">Login</label>
                    <InputText autofocus v-model="users.login" id="login" class="w-full" :class="{ 'p-invalid': errors.login }" @blur="validateLogin()"/>
                    <small class="p-error w-full" id="text-error">{{ errors.login || '&nbsp;' }}</small>
                </div>

                <div class="flex flex-column w-full gap-2" v-if="!isUpdate">
                    <label for="login">Senha</label>
                    <InputText v-model="users.password" id="login" class="w-full" :class="{ 'p-invalid': errors.password }"/>
                    <small class="p-error w-full" id="text-error">{{ errors.password || '&nbsp;' }}</small>
                </div>

            </div>

            <div class="flex flex-column w-full gap-2">
                <label for="login">email</label>
                <InputText autofocus v-model="users.email" id="login" class="w-full" :class="{ 'p-invalid': errors.email }"/>
                <small class="p-error w-full" id="text-error">{{ errors.email || '&nbsp;' }}</small>
            </div>

            <div class="flex flex-column w-full gap-2">
                <label for="url">URL</label>
                <InputText v-model="users.url" id="email" class="w-full" :class="{ 'p-invalid': errors.url }"/>
                <small class="p-error w-full" id="text-error">{{ errors.url || '&nbsp;' }}</small>
            </div>
            

            <div class="flex gap-3">

                <div class="flex flex-column w-full gap-2">
                    <label for="client">Cliente</label>
                    <Dropdown v-model="client.key" id="client" class="w-full h-4rem line-height-3" style="height: 3.73rem !important" :options="clientList" optionLabel="name" optionValue="key"></Dropdown>
                    <small class="p-error w-full" id="text-error">{{ errors.client || '&nbsp;' }}</small>
                </div>

                <div class="flex flex-column w-full  gap-2">
                    <label for="planType">Planos</label>
                    <Dropdown v-model="users.planType" id="planType" class="w-full" style="height: 3.73rem !important" :options="plansList" optionValue="key" optionLabel="name">
                        <template #value="slotProps"> 
                            <div v-if="slotProps.value">
                                <Tag :style="ColorService.colorPlan(slotProps.value)" :value="slotProps.value"/>
                            </div>
                         </template>
                        <template #option="slotProps"> 
                            <Tag :style="ColorService.colorPlan(slotProps.option.key)" :value="slotProps.option.name"/>
                        </template>
                    </Dropdown>
                    <small class="p-error w-full" id="text-error">{{ errors.planType || '&nbsp;' }}</small>
                </div>

            </div>
      
            <div class="flex gap-5 justify-content-between">
                <Button label="Salvar" @click="save" class="bg-orange-500 hover:bg-orange-700"></Button>
                <Button icon="pi pi-user" text rounded></Button>
            </div>
        </form>
        <Toast />
    </div>
</template>

<style scoped>

</style>