<template>
  <div
    v-if="isBannerVisible"
    class="w-full isolate flex items-center gap-x-6 overflow-hidden tomber bg-gradient-to-r from-[#299fff] to-[#ffffff] px-6 py-2.5 sm:px-3.5 sm:before:flex-1 duration-1000"
  >
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center text-center">
      <p class="text-sm/6 text-gray-900">
        <strong class="font-semibold">Trinity 2025</strong>
        <svg viewBox="0 0 2 2" class="mx-2 inline size-0.5 fill-current" aria-hidden="true">
          <circle cx="1" cy="1" r="1" />
        </svg>
        Rejoignez-nous sur Trinity du 7 au 15 janvier pour découvrir en avant-première ce qui vous
        attend !
      </p>

      <RouterLink to="/Login">
      <ButtonStyle1 label="S'inscrire maintenant"/>
      </RouterLink>
      
    </div>
    <div class="flex flex-1 justify-end">
      <button
        type="button"
        class="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        @click="hideBanner"
      >
        <span class="sr-only">Dismiss</span>
        <XMarkIcon class="size-5 text-gray-900" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import ButtonStyle1 from '../UiComponents/ButtonStyle1.vue';

const isBannerVisible = ref(true)

const hideBanner = () => {
  isBannerVisible.value = false
}
</script>

<style>
.tomber {
  animation: tomber 0.5s ease-in-out;
}

@keyframes tomber {
  0% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
