<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import * as yup from "yup";
import { ValidationError } from 'yup';
import HealthInsurance from '../../models/HealthInsurance';
import HealthInsuranceService from '../../services/HealthInsuranceService';
import Plan from '../../models/Plan';
import UserService from '../../services/UserService';
import ColorService from '../../services/ColorService';



const dialogRef : any = inject('dialogRef')
const data = dialogRef.value.data
const isUpdate = ref(false)

const healthInsurance = reactive<HealthInsurance>(healthInsuranceInitial())
const plansList = reactive<Plan[]>([])

const errors = reactive(healthInsuranceServiceErrorInitial())
const SchemaValidation = buildFormValidation()

const value = ref();


function healthInsuranceInitial() {
  return {
    id: '',
    name: '',
    version: [],
    planType: ''
  };
}

function healthInsuranceServiceErrorInitial() {
  return {
    id: '',
    name: '',
    version: '',
    planType: ''
  };
}

onMounted(() => {
  if(data.healthInsurance){
    Object.assign(healthInsurance,data.healthInsurance)
    value.value = healthInsurance.version
    isUpdate.value = true
  }

  UserService.findPlans().then((res : any) => {
    Object.assign(plansList,res.data)
  })
})

function save(){
    Object.assign(errors,healthInsuranceServiceErrorInitial())
    SchemaValidation.validate(healthInsurance, { abortEarly : false})
    .then((res : any) =>{
        if(isUpdate.value){
          HealthInsuranceService.update(res,res.id).then((res : any) => {
                dialogRef.value.close({message: "msg"})
            })
        }else{
          HealthInsuranceService.create(res).then((res : any) => {
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
   Object.assign(errors,healthInsuranceServiceErrorInitial())
   Object.assign(healthInsurance,healthInsuranceInitial())
}

function buildFormValidation(){
    return yup.object().shape({
        name: yup.string().required("Login *Obrigatório")
    });
}



</script>

<template>
    <div>
      <div class="flex flex-column align-items-center w-full px-5 pt-2">
        <form class="flex flex-column w-25rem">
            <div class="flex flex-column w-full gap-2">
              <label for="login">Empresa</label>
              <InputText autofocus v-model="healthInsurance.name" id="login" :class="{ 'p-invalid': errors.name }"/>
              <small class="p-error w-full" id="text-error">{{ errors.name || '&nbsp;' }}</small>
            </div>
            
            <div class="flex flex-column w-full gap-2">
              <label for="planType">Planos</label>
              <Dropdown v-model="healthInsurance.planType" id="planType" style="height: 3.73rem !important" :options="plansList" optionValue="key" optionLabel="name">
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
            <div class="flex flex-column w-full gap-2">
              <label for="login">Versões</label>
              <Chips v-model="healthInsurance.version" inputClass="w-30rem" :class="{ 'p-invalid': errors.version }"/>
              <small class="p-error w-full" id="text-error">{{ errors.version || '&nbsp;' }}</small>
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