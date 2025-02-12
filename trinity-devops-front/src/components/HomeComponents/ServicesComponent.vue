<template>
    <div class="bg-white py-24 sm:py-32" >
      <div class="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div class="max-w-xl">
          <h2 class="text-3xl font-bold tracking-tight text-black sm:text-3xl">Nos Services</h2>
          <p class="mt-6 text-lg/8 text-gray-900">Découvrez les services que nous proposons pour rendre votre expérience d'achat plus agréable et efficace.</p>
        </div>
        <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          <li v-for="service in services" :key="service.name">
            <div class="flex items-center gap-x-6">
              <img class="size-16 rounded-full" :src="service.imageUrl" alt="" />
              <div>
                <h3 class="text-base/7 font-semibold tracking-tight text-sky-500 ">{{ service.name }}</h3>
                <p class="text-sm/6 font-semibold text-gray-900">{{ service.description }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  const services = [
    {
      name: 'Service Après-Vente',
      description: 'Assistance complète après achat de vos compléments.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZE_NluBjph-F_7SiUpqwpjKgwjOmVFs7Ne02QA__OuTCcWfEvG3z_vm6YDSJBmfGxLIk&usqp=CAU',
    },
    {
      name: 'Livraison Rapide',
      description: 'Recevez vos commandes rapidement et en toute sécurité.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/10/04/13/35/drone-2816244_1280.jpg',
    },
    {
      name: 'Support Client 24/7',
      description: 'Notre support client est disponible à tout moment pour vous aider.',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Paiement Sécurisé',
      description: 'Vos paiements sont 100% sécurisés et conformes aux standards de sécurité.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/08/07/19/45/ecommerce-2607114_1280.jpg',
    }
  ]
  </script>
  
  <style scoped>
  .size-16 {
    width: 4rem;
    height: 4rem;
  }
  
  </style>
  