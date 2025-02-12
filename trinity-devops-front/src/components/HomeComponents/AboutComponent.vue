<template>
  <div 
id="contact"
    class="relative isolate overflow-hidden py-24 sm:py-32 bg-fixed bg-cover bg-center" 
    :style="{ backgroundImage: `url(${Image})` }"
  >
    <!-- Overlay sombre -->
    <div class="absolute inset-0 bg-black/50 -z-10"></div> 

    <!-- Effets de forme en arrière-plan -->
    <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
      <div 
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#010001] to-[#0c00f7] opacity-20" 
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" 
      />
    </div>

    <!-- Contenu principal -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-5xl font-bold tracking-tight text-white sm:text-7xl">À propos de nous</h2>
        <p class="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
          Rejoignez-nous dans notre mission de booster votre parcours fitness. Nous vous proposons des protéines et des suppléments de qualité supérieure pour vous aider à atteindre vos objectifs de santé et de performance
        </p>
      </div>

      <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
          <a v-for="link in links" :key="link.name" :href="link.href">
            {{ link.name }} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.name" class="flex flex-col-reverse gap-1">
            <dt class="text-base/7 text-gray-300">{{ stat.name }}</dt>
            <dd class="text-4xl font-semibold tracking-tight text-white">{{ stat.value }} <span class="text-sky-400">+</span></dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import Image from '../../assets/images/img5.png'

const links = [
  { name: 'Nos produits', href: '#' },
  { name: 'Avis clients ', href: '#' },
  { name: 'Notre mission', href: '#' },
  { name: 'Pourquoi Choisir Nos Produits ', href: '#' },
]

const stats = [
  { name: 'Clients Satisfaits', value: '25k' },
  { name: 'Produits Disponibles', value: '150' },
  { name: 'Commandes Quotidiennes', value: '100' }
]
</script>
