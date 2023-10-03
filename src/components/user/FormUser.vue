<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import User from '../../models/User'
import * as yup from "yup";
import { ValidationError } from 'yup';


const dialogRef : any = inject('dialogRef')
const data = dialogRef.value.data
const isUpdate = ref(false)
const loginInitial = ref('')

const users = reactive<User>(userInitial())
const errors = reactive(userErrorInitial())
const SchemaValidation = buildFormValidation()

function userInitial() {
  return {
    id: '',
    login: '',
    active: false,
    role: '',
    healthPlan: [],
    email: '',
    clientKey: '',
    plantType: '',
    url: ''
  };
}

function userErrorInitial() {
  return {
    id: '',
    login: '',
    active: false,
    role: '',
    email: '',
    clientKey: '',
    plantType: '',
    url: ''
  };
}

onMounted(() => {
  if(data){
    Object.assign(users,data.user)
    isUpdate.value = true
    loginInitial.value = users.login
  }
})

function save(){
    Object.assign(errors,userErrorInitial())
    SchemaValidation.validate(users, { abortEarly : false})
    .then((res : any) =>{
        console.log(res)
    }).catch((error) => {
        error.inner.forEach((err : ValidationError) => {
            // @ts-ignore: Unreachable code error         
            errors[err.path] = err.message
        })
    })
}

function clear(){
   Object.assign(errors,userErrorInitial())
   Object.assign(users,userInitial())
}

function buildFormValidation(){
    return yup.object().shape({
        login: yup.string().required("Login *Obrigatório").test("invalid-cpf","CPF invalido",(login) => valideCdf(login)),
        role: yup.string().required("*Role *Obrigatório")
    });
}

function valideCdf(login : string){
    console.log(login)
    return false
}



function validateLogin(event : any){
    console.log(event)
    console.log(isUpdate.value)
    errors["login"] = ""
    if(users.login && !isUpdate.value){
        errors["login"] = "Login existe"
    }else if(isUpdate && loginInitial.value != users.login){
        errors["login"] = "Login existe AAA"
    }
}

</script>

<template>
    <div class="flex flex-column align-items-center w-full px-5 pt-2 gap-3">
        <form class="flex flex-column gap-2">
            <div class="flex flex-column w-full gap-2">
                <InputText autofocus v-model="users.login" id="name" class="w-full" :class="{ 'p-invalid': errors.login }" @blur="validateLogin($event)"/>
                <small class="p-error w-full" id="text-error">{{ errors.login || '&nbsp;' }}</small>
            </div>

            <div class="flex flex-column w-full gap-2">
                <InputText v-model="users.email" id="name" class="w-full" :class="{ 'p-invalid': errors.email }"/>
                <small class="p-error w-full" id="text-error">{{ errors.email || '&nbsp;' }}</small>
            </div>
      
            <div class="flex gap-3">
                <Button label="Salvar" @click="save"></Button>
                <Button label="Limpar" @click="clear"></Button>
            </div>
        </form>
        <Toast />
    </div>
</template>

<style scoped>

</style>