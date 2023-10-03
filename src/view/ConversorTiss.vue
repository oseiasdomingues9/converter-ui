<script setup lang="ts">
import { reactive } from "vue";
import Upload from "../components/conversor/Upload.vue"
import User from "../models/User";



const props = defineProps<{
    user: any,
}>();

let users = reactive<User>({
    id: '',
    login: '',
    active: false,
    role: '',
    healthPlan : []
});

users = props.user

</script>

<template>
    <div class="flex flex-column mx-auto mt-5 w-9">
        <div class="flex flex-row w-12 mx-auto">
            <Card class="w-full h-full">
                <template #title> Upload </template>
                <template #content>
                    <Upload :users="users"/>
                </template>
            </Card>
        </div>
    </div>
</template>

<style scoped>
</style>