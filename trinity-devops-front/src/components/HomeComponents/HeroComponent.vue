<template>
  <div>
    
    <div class="mx-auto mt-14 max-w-7xl sm:px-4 lg:px-8">
      <div
        class="relative flex flex-col lg:flex-row justify-center items-center h-screen sm:h-screen lg:h-[80vh] bg-gradient-to-l from-[#299fff] to-[#ffffff] rounded-lg px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:gap-x-20 lg:px-24 lg:pt-0">
        <div class="mx-auto max-w-md w-full lg:w-1/2 text-center lg:text-left lg:flex-auto lg:py-32">
          <h2 class="text-balance text-3xl font-semibold tracking-tight lato text-black sm:text-3xl">
            Transformez votre alimentation dès aujourd'hui !
          </h2>
          <p class="mt-6 text-pretty text-lg/8 text-black">
            Découvrez nos produits alimentaires, offrant une sélectionde produits sains et équilibrés. Que vous cherchiez à améliorer votre santé, ou à adopter une alimentation plus consciente, nos produits vous accompagnent dans tous vos objectifs.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <RouterLink to="/Login">
              <ButtonStyle2 label="S'inscrire maintenant" />
            </RouterLink>

            <a href="#" class="text-sm/6 font-semibold text-black">En savoir plus <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div
          class="h-96 w-full custom-mt-small lg:w-1/2 flex justify-center items-center rounded-lg bg-gray-600 isolate aspect-video bg-white/20 shadow-lg ring-1 ring-black/5 overflow-visible">
          <img class="lg:h-full sm:h-96  w-4/5 object-center animation" :src="image1" alt="" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import image1 from '../../assets/images/img3.png'
import ButtonStyle2 from '../UiComponents/ButtonStyle2.vue';

</script>

<style>
/* Règle CSS personnalisée pour ajouter margin-top en mode small */
@media (max-width: 640px) {
  .custom-mt-small {
    margin-top: 2.5rem !important;
  }
}

.animation {
  animation: flotter 3s ease-in-out infinite;
}

@keyframes flotter {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0px);
  }
}

</style>
