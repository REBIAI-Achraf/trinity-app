<template>
  <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <h2 class=" font-semibold text-sky-500 text-3xl">404</h2>
      <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Page non trouvée
      </h1>
      <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Désolé, nous n'avons pas trouvé la page
        que vous recherchez.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">

        <RouterLink to="/">
          <ButtonStyle2 label="Retouner à l'acceuil" />
        </RouterLink>

      </div>

    </div>
  </main>
</template>
<script setup>
import ButtonStyle2 from "../components/UiComponents/ButtonStyle2.vue"
</script>