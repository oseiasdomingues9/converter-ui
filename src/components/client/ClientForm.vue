<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import * as yup from "yup";
import { ValidationError } from 'yup';
import Client from '../../models/Client';
import ClientService from '../../services/ClientService';

const dialogRef : any = inject('dialogRef')
const data = dialogRef.value.data
const isUpdate = ref(false)

const client = reactive<Client>(clientInitial())

const errors = reactive(clientErrorInitial())
const SchemaValidation = buildFormValidation()


function clientInitial() {
  return {
    id: '',
    name: '',
    key: ''
  };
}

function clientErrorInitial() {
  return {
    id: '',
    name: '',
    key: ''
  };
}

onMounted(() => {
  if(data.client){
    Object.assign(client,data.client)
    isUpdate.value = true
  }
})

function save(){
    Object.assign(errors,clientErrorInitial())
    SchemaValidation.validate(client, { abortEarly : false})
    .then((res : any) =>{
        if(isUpdate.value){
          ClientService.update(res,res.id).then((res : any) => {
                dialogRef.value.close({message: "msg"})
            })
        }else{
            ClientService.create(res).then((res : any) => {
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

function clear(){
   Object.assign(errors,clientErrorInitial())
   Object.assign(client,clientInitial())
}

function buildFormValidation(){
    return yup.object().shape({
        key: yup.string().required("Login *Obrigatório")
    });
}



</script>

<template>
    <div>
      <div class="flex flex-column align-items-center w-full px-5 pt-2">
        <form class="flex flex-column w-25rem">
            <div class="flex flex-column w-full gap-2">
                <label for="login">Empresa</label>
                <InputText autofocus v-model="client.name" id="login" class="w-full" :class="{ 'p-invalid': errors.name }"/>
                <small class="p-error w-full" id="text-error">{{ errors.name || '&nbsp;' }}</small>
            </div>
            <div class="flex flex-column w-full gap-2">
                <label for="login">Empresa</label>
                <InputText autofocus v-model="client.key" id="login" class="w-full" :class="{ 'p-invalid': errors.key }"/>
                <small class="p-error w-full" id="text-error">{{ errors.key || '&nbsp;' }}</small>
            </div>
            <div class="flex gap-5 justify-content-between">
                <Button label="Salvar" @click="save" class="bg-orange-500 hover:bg-orange-700"></Button>
            </div>
        </form>
        <Toast />
    </div>
    </div>
</template>

<style scoped>

</style>