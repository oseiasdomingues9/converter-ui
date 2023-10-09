<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import ClientService from '../../services/ClientService';


const dialogRef : any = inject('dialogRef')
const data = dialogRef.value.data
const isUpdate = ref(false)
const id = ref()
const confirm = useConfirm();

onMounted(() => {
  if(data.client){
    isUpdate.value = true
    id.value = data.client.id
  }
})


const remove = () => {
    confirm.require({
        message: 'Tem certeza de que deseja prosseguir com a exclusão deste cliente?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            ClientService.delete(data.client.id).then((res : any) => {
                close(true)
            })
        },
        reject: () => {
        }
    });
};



function close(isDelete : boolean){
    dialogRef.value.close({id : id.value, isDelete : isDelete})
}

</script>

<template>

    <span class="text-2xl">Cadastro</span>
    <div class="flex align-items-center justify-content-end w-full" >
        <Button icon="pi pi-trash" @click="remove" v-if="isUpdate" text rounded></Button>
        <Button icon="pi pi-times" @click="close(false)" text rounded></Button>
    </div>
    <ConfirmDialog></ConfirmDialog>
</template>

<style scoped>

</style>