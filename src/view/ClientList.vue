
<script setup lang="ts">
import { markRaw, onMounted, reactive} from 'vue';
import { useDialog } from 'primevue/usedialog';
import ClientForm from '../components/client/ClientForm.vue'
import ClientService from '../services/ClientService';
import Client from '../models/Client';
import HeaderClient from '../components/client/HeaderClient.vue';


let clients = reactive<Client[]>([]);
const dialog = useDialog();

onMounted(() => {
  findAll()
})

function openDialog(client : Client | null){
    dialog.open(ClientForm, {
        props: {
          closable : false,
          modal: true
        },
        templates: {
            header: markRaw(HeaderClient)
        },
        data:{
          client : client
        },
        onClose: (options) => {
            if(options?.data.isDelete) deleteRefresh(options.data.id)
            findAll()
        }
    })
}

function deleteRefresh(id : string){
  let i = clients.findIndex(client => client.id == id)
  clients.splice(i)      
}

function findAll(){
  ClientService.findAll().then((res : any) => {
      Object.assign(clients,res.data.data)
  })
}

</script>

<template>
  <div class="mx-auto w-11 mt-5">
    
    <DataTable :value="clients" @row-click="openDialog($event.data)" stripedRows :rowHover="true">
        <template #header>
          <div class="flex flex-wrap align-items-center justify-content-end gap-2">
              <Button label="Novo" icon="pi pi-plus" class="bg-orange-500 hover:bg-orange-700" @click="openDialog(null)"/>      
          </div>
        </template>
        <Column field="name" header="Nome"></Column>
        <Column field="key" header="Key"></Column>
        <DynamicDialog/>
      </DataTable>
  </div>
</template>


<style scoped>

</style>