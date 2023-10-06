
<script setup lang="ts">
import { markRaw, onMounted, reactive} from 'vue';
import { useDialog } from 'primevue/usedialog';
import HealthInsuranceForm from '../components/health-insurance/HealthInsuranceForm.vue'
import HealthInsuranceService from '../services/HealthInsuranceService';
import HealthInsurance from '../models/HealthInsurance';
import HeaderHealthInsurance from '../components/health-insurance/HeaderHealthInsurance.vue';
import ColorService from '../services/ColorService';



let healthInsurances = reactive<HealthInsurance[]>([]);
const dialog = useDialog();

onMounted(() => {
  findAll()
})

function openDialog(healthInsurance : HealthInsurance | null){
    dialog.open(HealthInsuranceForm, {
        props: {
          closable : false,
          modal: true
        },
        templates: {
            header: markRaw(HeaderHealthInsurance)
        },
        data:{
          healthInsurance : healthInsurance
        },
        onClose: (options) => {
            if(options?.data.isDelete) deleteRefresh(options.data.id)
            findAll()
        }
    })
}

function deleteRefresh(id : string){
  let i = healthInsurances.findIndex(healthInsurance => healthInsurance.id == id)
  healthInsurances.splice(i)      
}

function findAll(){
  HealthInsuranceService.findAll().then((res : any) => {
      Object.assign(healthInsurances,res.data.data)
  })
}

</script>

<template>
  <div class="mx-auto w-11 mt-5">
    
    <DataTable :value="healthInsurances" @row-click="openDialog($event.data)" stripedRows :rowHover="true">
        <template #header>
          <div class="flex flex-wrap align-items-center justify-content-end gap-2">
              <Button label="Novo" icon="pi pi-plus" class="bg-orange-500 hover:bg-orange-700" @click="openDialog(null)"/>      
          </div>
        </template>
        <Column field="name" header="Nome"></Column>
        <Column field="planType" header="Plano">
          <template #body="slotProps">
            <Tag :value="slotProps.data.planType" :style="ColorService.colorPlan(slotProps.data.planType)" />
          </template>
        </Column>        
        <DynamicDialog/>
      </DataTable>
  </div>
</template>


<style scoped>

</style>