<template>
    <main>
        <Toast />
      <!-- Header -->
      <div class="w-full flex flex-row">
        <div class="w-1/2 h-16 flex flex-col px-4 m-2">
          <p class="text-gray-400 font-bold">Open Food Facts</p>
          <h4 class="text-black font-semibold">Produits alimentaires</h4>
        </div>
        <div class="w-1/2 h-16 flex items-center justify-center">
          <input 
            v-model="searchQuery" 
            type="search" 
            placeholder="Rechercher un produit" 
            id="search"
            class="w-4/5 h-1/2 m-1 outline-none rounded-full bg-white p-2 text-black" 
          />
          <button 
            @click="searchProducts" 
            class="relative rounded-full p-1 ml-1 text-black duration-300"
          >
            <MagnifyingGlassIcon class="size-6 text-black" />
          </button>
        </div>
      </div>
  
      <!-- Statistiques -->
      <div class="w-full flex flex-col">
        <div class="w-full h-40 flex">
          <CardStat
            title="Produits existants"
            :value="countProducts()"
            bgColor="bg-black"
            textColor="text-white"
          >
            <template #icon>
              <ShoppingBagIcon class="w-4 h-4 ml-2" />
            </template>
          </CardStat>
        </div>
  
        <div class="m-5">
          <h4 class="text-black ">Gestion des Produits depuis Openfoodfacts</h4>
        </div>
  
        <div class="w-full flex flex-row m-2">
          <button 
            @click="fetchProducts" 
            class="flex rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 mx-1"
          >
            mettre à jour la liste
            <ClipboardDocumentListIcon class="w-4 h-4 ml-4 mt-1" />
          </button>
        </div>
      </div>

      <div v-if="loading" class="text-center mt-4">
      <span>Chargement...</span>
    </div>

  
   <!-- Liste des produits -->
   <div class="w-full bg-white m-4 p-5 rounded-2xl text-black">
      <h4 class="m-3 font-semibold">Liste des produits</h4>
      <table class="min-w-full table-auto border-collapse border border-gray-200 text-sm">
        <thead>
          <tr>
            <th class="border px-4 py-2"> SKU </th>
            <th class="border px-4 py-2">Image</th>
            <th class="border px-4 py-2">Nom</th>
            <th class="border px-4 py-2">Marque</th>
            <th class="border px-4 py-2">Description</th>
            <th class="border px-4 py-2">Nutri-Score</th>
            <th class="border px-4 py-2">Catégorie</th>
            <th class="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.code">
            <td class="border px-2 py-2">{{ product.code }}</td>
            <td class="border px-2 py-2">
              <img v-if="product.image_url" :src="product.image_url" alt="produit" class="w-12 h-12 object-contain" />
              <span v-else>Pas d'image</span>
            </td>
            <td class="border px-2 py-2">{{ product.product_name }}</td>
            <td class="border px-2 py-2">{{ product.brands || 'N/A' }}</td>
            <td class="border px-2 py-2">{{ product.generic_name || 'N/A' }}</td>
            <td class=" border px-2 py-2 uppercase text-white font-bold ">
  <span 
    class="rounded-xl w-8 h-8 flex justify-center items-center px-2 py-2 mx-auto" 
    :class="getNutritionGradeClass(product.nutrition_grades)">
    {{ product.nutrition_grades || 'N/A' }}
  </span>
</td>
            <td class="border px-2 py-2">
              <button @click="startAddingProduct(product)" class="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-1 px-3 rounded">Ajouter</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal pour ajouter le prix et la quantité -->
    <div v-if="isAdding" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-1/3 text-black">
        <h3 class="text-xl font-bold mb-4">Ajouter Les renseignements</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="price">Prix</label>
          <input v-model="addingProduct.price" min="0" class="w-full p-2 border rounded bg-white" type="number" placeholder="Entrez un prix" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="quantity">Quantité</label>
          <input v-model="addingProduct.quantity" min="0" class="w-full p-2 border rounded bg-white" type="number" placeholder="Entrez une quantité" />
        </div>
        <div class="flex justify-end space-x-2">
          <button @click="isAdding = false" class="bg-gray-600 text-white px-4 py-2 rounded">Annuler</button>
          <button @click="addProduct(product)" class="bg-blue-500 text-white px-4 py-2 rounded">Enregistrer</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import CardStat from "../Dashboard/CardStat.vue";
import { MagnifyingGlassIcon,ShoppingBagIcon, ClipboardDocumentListIcon  } from "@heroicons/vue/24/outline";

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const toast = useToast();
const api = axios.create({
  baseURL: 'https://world.openfoodfacts.org',
  headers: { 'Content-Type': 'application/json' },
});
const loading = ref(false);

const searchQuery = ref('');
const products = ref([]);
const isAdding = ref(false);
const addingProduct = ref({ price: null, quantity: null });

const searchProductsByName = async (productName) => {
  try {
    const response = await api.get('/cgi/search.pl', {
      params: {
        search_terms: productName,
        search_simple: 1,
        action: 'process',
        json: 1,
        page_size: 100,
      },
    });
    return response.data.products.map((product) => ({
      ...product,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    return [];
  }
};

const fetchProducts = async () => {
  products.value = await searchProductsByName('');
};

const getNutritionGradeClass = (grade) => {
  switch (grade?.toUpperCase()) {
    case 'A': return 'bg-green-500';
    case 'B': return 'bg-green-400';
    case 'C': return 'bg-yellow-400';
    case 'D': return 'bg-orange-500';
    case 'E': return 'bg-red-500';
    default: return 'bg-gray-300';
  }
};

const searchProducts = async () => {
  products.value = await searchProductsByName(searchQuery.value);
};

const countProducts = () => products.value.length;

const startAddingProduct = (product) => {
  isAdding.value = true;
  addingProduct.value = { price: null, quantity: null, product }; // Save selected product to add details
};

const addProduct = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const newProductData = {
      name: addingProduct.value.product.product_name,
      description: addingProduct.value.product.generic_name || 'Description non disponible',
      price: addingProduct.value.price,
      sku: addingProduct.value.product.code,
      quantity: addingProduct.value.quantity,
      imageUrl: addingProduct.value.product.image_url,
      categoryId: 1, 
    };

    await axios.post('http://localhost:4000/products', newProductData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProducts(); // Rafraîchir la liste des produits
    toast.add({
      severity: 'success',
      summary: `Produit ajouté: ${addingProduct.value.product.product_name}`,
      life: 3000,
    });
    isAdding.value = false; // Fermer le modal après l'ajout
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Échec de l\'ajout du produit',
      life: 3000,
    });
  }
};

onMounted(async () => {
  loading.value = true;
  fetchProducts();
  loading.value = false;
});

</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>