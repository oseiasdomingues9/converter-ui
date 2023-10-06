<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import HealthInsuranceService from '../../services/HealthInsuranceService';


const dialogRef : any = inject('dialogRef')
const data = dialogRef.value.data
const isUpdate = ref(false)
const id = ref()
const confirm = useConfirm();

onMounted(() => {
  if(data.healthInsurance){
    isUpdate.value = true
    id.value = data.healthInsurance.id
  }
})


const remove = () => {
    confirm.require({
        message: 'Tem certeza de que deseja prosseguir com a exclusão deste operadora?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            HealthInsuranceService.delete(data.healthInsurance.id).then((res : any) => {
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