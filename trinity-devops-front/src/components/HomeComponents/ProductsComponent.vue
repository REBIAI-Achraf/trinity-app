<template>
  <div>
    <div class="relative w-full h-10 flex justify-center align-middle mt-28">
      <input v-model="searchQuery" type="search" placeholder="rechercher un produit" id="search"
        class="w-1/2 h-full p-3 outline-none rounded-full bg-gray-100" />
      <button @click="searchProducts"
        class="relative rounded-full bg-black-800 p-1 ml-1 text-black-400 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-1 duration-300">
        <MagnifyingGlassIcon class="size-6" />
      </button>
    </div>

    <div v-if="loading" class="text-center mt-4">
      <span>Chargement...</span>
    </div>

    <div v-else class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-black sm:text-3xl">Résultats de recherche</h2>
      <br>
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <RouterLink v-for="product in products" :key="product.id" :to="`/product/${product.id}`" class="group">
          <img :src="product.image_url" :alt="product.product_name"
            class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]" />
          <div class="mt-4 flex flex-column justify-between align-middle">
            <h3 class="text-sm text-gray-700">{{ product.product_name }}</h3>
            <span class="text-sm text-gray-500">{{ product.brands }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { searchProductsByName } from '../../services/openFoodFactsService';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const searchQuery = ref('');
const products = ref([]);
const loading = ref(false);

const searchProducts = async () => {
  loading.value = true;
  products.value = await searchProductsByName(searchQuery.value);
  loading.value = false;
};

// Optionally, you can load some default products on mount
onMounted(async () => {
  loading.value = true;
  products.value = await searchProductsByName('default');
  loading.value = false;
});
</script>
