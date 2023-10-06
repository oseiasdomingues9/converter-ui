<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import UserService from '../../services/UserService';


const dialogRef : any = inject('dialogRef')
const data = dialogRef.value.data
const isUpdate = ref(false)
const isActive= ref(true)
const id = ref()
const confirm = useConfirm();
const toast = useToast();

onMounted(() => {
  if(data.user){
    isUpdate.value = true
    isActive.value = data.user.active
    id.value = data.user.id
  }
})

const disable = () => {
    confirm.require({
        message: 'Tem certeza de que deseja prosseguir com a desativação deste usuário?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            UserService.disable(data.user.id).then((res : any) => {
                console.log(res)
                close(false)
            })
        },
        reject: () => {
        }
    });
};

const remove = () => {
    confirm.require({
        message: 'Tem certeza de que deseja prosseguir com a exclusão deste usuário?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            UserService.delete(data.user.id).then((res : any) => {
                console.log(res)
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

const getIcon = () => {
    if(!isActive.value) return "pi pi-check-circle" 
    else return "pi pi-ban" 

}


</script>

<template>

    <span class="text-2xl">Cadastro</span>
    <div class="flex align-items-center justify-content-end w-full" >
        <Button :icon="getIcon()" @click="disable" v-if="isUpdate" text rounded></Button>
        <Button icon="pi pi-trash" @click="remove" v-if="isUpdate && !isActive" text rounded></Button>
        <Button icon="pi pi-times" @click="close(false)" text rounded></Button>
    </div>
    <ConfirmDialog></ConfirmDialog>
</template>

<style scoped>

</style>