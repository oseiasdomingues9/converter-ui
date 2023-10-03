<script setup lang="ts">
import { ref } from 'vue';
import User from '../../models/User';
import ConversorService from '../../services/ConversorService';

let uploadFile = ref(false);
let valueBadge = ref("Pending")
let severityBadge = ref("warning")

let blob : any = ref();
let label = ref()


function onAdvancedUpload(event : any){
    label.value = event[0].name.replace(".pdf",".xml")

    let operadora : string = operadoraNome.value;
    operadora = operadora.toLowerCase();
    let versao : string = versaoSelecionada.value
    versao = versao.toLowerCase()

    ConversorService.upload(operadora,versao,event[0]).then((res : any) => {
        blob.value = res.data
    })

    uploadFile.value = true
    valueBadge.value = "Completed"
    severityBadge.value = "success"
};

function download(){
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob.value)
    link.download = label.value
    link.click()
    URL.revokeObjectURL(link.href)
}

const formatSize = (bytes : any) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const onRemoveTemplatingFile = (removeFileCallback : any, index : any) => {
    removeFileCallback(index);
    uploadFile.value = false
    valueBadge.value = "Pending"
    severityBadge.value = "warning"
};

const btnSearch = ref()

function testeA(){
    btnSearch.value.$attrs.onClick()
}

const props = defineProps<{
    users: User,
}>();


const operadoraSelecionada = ref();

const versaoSelecionada = ref();
const versao = ref();
const operadoraNome = ref();

function testeB(){
    let operador = props.users.healthPlan.find(x => x.id === operadoraSelecionada.value)
    versao.value = operador?.version
    operadoraNome.value = operador?.name
}

function teesaaa(){
    console.log(operadoraNome.value)
    console.log(versaoSelecionada.value)
}



        
</script>

<template>
    <FileUpload name="demo[]" accept="application/pdf" :maxFileSize="1000000">
        <template #header="{ chooseCallback,files }">
            <div class="flex flex-1 flex-wrap justify-content-between align-items-center ">
                <div style="display: none;">
                    <Button @click="chooseCallback()" icon="pi pi-folder-open" rounded outlined :disabled="!files || files.length > 0" ref="btnSearch"></Button>
                </div>
                <div class="card flex justify-content-center gap-3">
                    <Dropdown v-model="operadoraSelecionada" :options="props.users.healthPlan" optionLabel="name" option-value="id" placeholder="Operadora" class="w-15rem" @update:model-value="testeB" />
                    <Dropdown v-model="versaoSelecionada" :options="versao" placeholder="Versão" class="w-full" :disabled="!operadoraSelecionada"/>
                </div>
                <div>
                    <Button @click="onAdvancedUpload(files)" icon="pi pi-cloud-upload" rounded :disabled="!files || files.length === 0 || !operadoraSelecionada || !versaoSelecionada || uploadFile" label="Converter" class="bg-orange-500 hover:bg-orange-700"></Button>
                </div>
            </div>
        </template>
        <template #content="{ files, removeFileCallback }">
            <div v-if="files.length > 0" class="flex align-items-center justify-content-center h-15rem">
                <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="flex flex-column justify-content-around p-3 border-1 surface-border align-items-center w-full">
                    <i class="pi pi-file-pdf text-6xl p-4 " style="font-size: 2rem"/>
                    <div class="flex flex-column align-items-center">
                        <span class="font-semibold">{{ file.name }}</span>
                        <span class="mt-2">{{ formatSize(file.size) }}</span>
                        <Badge :value="valueBadge" :severity="severityBadge" class="m-2"/>
                    </div>
                    <div class="flex m-2">
                        <Button icon="pi pi-download" v-if="uploadFile" @click="download" rounded  severity="success" class="mr-1"> </Button>
                        <Button icon="pi pi-times" @click="onRemoveTemplatingFile(removeFileCallback, index)" outlined rounded severity="danger"  class="ml-1"/>
                    </div>

                </div>
            </div>
        </template>
        <template #empty>
            <div class="flex align-items-center justify-content-center flex-column h-15rem " ref="teste" @click="testeA">
                <i class="pi pi-cloud-upload border-2 border-circle p-5 text-2xl text-400  border-400 hover:bg-gray-700" />
                <p class="mt-4 mb-0">Arraste e solte os arquivos aqui para fazer upload.</p>
            </div>
        </template>
    </FileUpload>
</template>

<style scoped>

</style>