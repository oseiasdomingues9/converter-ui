
<script setup lang="ts">
import { onMounted, reactive} from 'vue';
import { useDialog } from 'primevue/usedialog';
import FormUser from '../components/user/FormUser.vue'
import User from '../models/User'
import HealthPlan from '../models/HealthPlan';
import HealthPlanService from '../services/HealthPlanService';


let healthPlan = reactive<HealthPlan[]>([]);
const dialog = useDialog();


onMounted(() => {
  HealthPlanService.findAll().then((res : any) => {
      Object.assign(healthPlan,res.data.data)
  })
})


//Modal
function openDialogCreate(){
    dialog.open(FormUser, {
        props: {
          header: 'Dados',
          style: {
              width: '35vw',
          },
          breakpoints:{
              '960px': '75vw',
              '640px': '90vw'
          },
          modal: true
      }
    });
}


//Modal
function openDialog(user : User){
    dialog.open(FormUser, {
        props: {
          header: 'Dados',
          style: {
              width: '35vw',
          },
          breakpoints:{
              '960px': '75vw',
              '640px': '90vw'
          },
          modal: true
      },
        data:{
          user : user
        }
    });
}



</script>

<template>
  <div class="mx-auto w-11 mt-5">
    
    <DataTable :value="healthPlan" tableStyle="min-width: 50rem" @row-click="openDialog($event.data)">
        <template #header>
          <div class="flex flex-wrap align-items-center justify-content-end gap-2">
              <Button label="Novo" icon="pi pi-plus" class="mr-2" @click="openDialogCreate()"/>      
          </div>
        </template>
        <Column field="id" header="Nome"></Column>
        <Column field="planType" header="Empresa"></Column>
        <Column field="name" header="Role"></Column>
        <DynamicDialog/>
      </DataTable>
  </div>
</template>


<style scoped>

</style>