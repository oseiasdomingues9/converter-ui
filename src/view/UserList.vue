
<script setup lang="ts">
import { markRaw, onMounted, reactive} from 'vue';
import UserService from '../services/UserService';
import { useDialog } from 'primevue/usedialog';
import FormUser from '../components/user/FormUser.vue'
import HeaderUser from '../components/user/HeaderUser.vue'
import User from '../models/User'
import ColorService from '../services/ColorService';

let users = reactive<User[]>([]);
const dialog = useDialog();


onMounted(() => {
  findAll()
})

function openDialog(user : User | null){
    dialog.open(FormUser, {
        props: {
          closable : false,
          modal: true
        },
        templates: {
            header: markRaw(HeaderUser)
        },
        data:{
          user : user
        },
        onClose: (options) => {
            if(options?.data.isDelete) deleteRefresh(options.data.id)
            findAll()
        }
    })
    ;
}

function deleteRefresh(id : string){
  let i = users.findIndex(user => user.id == id)
  users.splice(i)      
}

function findAll(){
  UserService.findAll().then((res : any) => {
      Object.assign(users,res.data.data)
  })
}

const rowClass = (data : any) => {
    return [{ 'back': !data.active}];
};

</script>

<template>
  <div class="mx-auto w-11 mt-5">
    
    <DataTable :value="users" @row-click="openDialog($event.data)" stripedRows :rowClass="rowClass" :rowHover="true"> 
        <template #header>
          <div class="flex flex-wrap align-items-center justify-content-end gap-2">
              <Button label="Novo" icon="pi pi-plus" class="bg-orange-500 hover:bg-orange-700" @click="openDialog(null)"/>      
          </div>
        </template>
        <Column field="login" header="Login"></Column>
        <Column field="email" header="Email" class="w-3"></Column>
        <Column field="url" header="Cliente"></Column>
        <Column field="client.name" header="Cliente"></Column>
        <Column field="planType" header="Plano">
          <template #body="slotProps">
            <Tag :value="slotProps.data.planType" :style="ColorService.colorPlan(slotProps.data.planType)" />
          </template>
        </Column>
        <Toast />
        <DynamicDialog/>
      </DataTable>
  </div>
</template>


<style scoped>

:deep(.p-datatable .p-datatable-tbody) .back{
  color: rgba(255, 255, 255, 0.38) !important;
  opacity: 1;
}

</style>