<script setup lang="ts">
import Upload from "./Upload.vue"

</script>

<template>
    <div class="flex flex-column mx-auto mt-5 w-9">
        <div class="flex flex-row w-12 mx-auto">
            <Card class="w-full h-full">
                <template #title> Upload </template>
                <template #content>
                    <Upload/>
                </template>
            </Card>
            <!--<Card class="ml-3 w-6 h-30rem">
                <template #title> Download </template>
                <template #content>
      
                </template>
            </Card>-->
        </div>
    </div>
</template>

<style scoped>
</style>