<template>
    <div class="flex min-h-screen w-full bg-gray-100 ">
        <SideNav class="w-1/5 " />
        <main class="w-3/4 flex flex-col ">
            <router-view></router-view> 
        </main>

    </div>
</template>
<script setup>
import SideNav from "./SideNavComponent.vue";
</script>