<template>
  <div>
    <Toast />
    <NavbarComponent />
    <div class="w-full mx-auto mt-20">
      <h2 class="text-2xl font-bold mt-20 ml-6 text-black">Mes Commandes</h2>

      <div v-if="loading" class="text-gray-500 mt-4 ml-6">Chargement des commandes...</div>
      <div v-else-if="orders.length === 0" class="text-gray-500 mt-4  ml-6">Aucune commande trouvée.</div>

      <div v-else class=" w-full flex ">
        <div v-for="order in orders" :key="order.id" class=" w-1/3 mt-6 grid wrap gap-6 mx-6 p-4 border rounded-lg shadow">
          <div class="flex justify-between">
            <div>
          <h3 class="text-lg font-semibold text-black">Commande : {{ order.id }}</h3>
            </div>
            <div>
          <p class="text-sm text-gray-600">Date: {{ new Date(order.createdAt).toLocaleDateString() }}</p>
          <p class="text-sm text-gray-600">Total: {{ order.total }} €</p>
            </div>
        </div>
          <!-- Liste des produits avec image -->
          <ul class="mt-2">
            <li v-for="item in order.items" :key="item.id" class="flex items-center space-x-4">
              <img :src="item.product.imageUrl" alt="Image du produit" class="w-12 h-12 object-contain my-2">
              <span class="text-gray-700">
                {{ item.product.name }} (x{{ item.quantity }}) - {{ item.price }} €
              </span>
            </li>
          </ul>

          <!-- Bouton de paiement Stripe -->
          <button
            @click="payWithStripe(order.id)"
            class=" w-1/2 flex justify-center rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 m-auto">
            Payer la commande
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NavbarComponent from '../components/HomeComponents/NavbarComponent.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const orders = ref([]);
const loading = ref(true);

// Fonction pour récupérer les commandes
const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Utilisateur non authentifié");
    }

    const response = await axios.get("http://localhost:4000/orders/user/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    orders.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  } finally {
    loading.value = false;
  }
};

// Fonction pour initier le paiement avec Stripe
const payWithStripe = async (orderId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Utilisateur non authentifié");
    }

    const response = await axios.post(
      `http://localhost:4000/payments/stripe/create-checkout-session/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.url) {
      window.location.href = response.data.url; // Redirige vers la page de paiement Stripe
    }
  } catch (error) {
    console.error("Erreur lors du paiement avec Stripe:", error);
  }
};


onMounted(fetchOrders);
</script>
