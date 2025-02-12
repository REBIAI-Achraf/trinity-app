<template>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>
        <Toast />
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto w-screen max-w-md">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-lg font-medium text-gray-900">Votre panier</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500" @click="open = false">
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="size-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
  
                      <div class="mt-8">
                        <div class="flow-root">
                          <ul class="-my-6 divide-y divide-gray-200">
                            <!-- Boucle sur cartItems -->
                            <li v-for="item in cartItems" :key="item.id" class="flex py-6">
                              <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                  <p class="text-base font-medium text-gray-900 my-2"> {{ item.name }} </p>
                                  <img :src=" item.imageUrl" :alt="item.name" class="w-12 h-12 object-contain my-2"/>
                                  <p class="text-sm text-sky-500">Prix: <span class="text-gray-900"> {{ item.price }} €  </span></p>
                                  <p class="text-sm text-gray-500">Quantitée: <span class="text-gray-900">{{ item.quantity }}</span></p>
                                  <button type="button" class="font-medium text-red-600 hover:text-red-500" @click="removeCartItem(item.id)">
                                   Supprimer
                                 </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
  
                    <!-- Affichage du total -->
                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div class="mb-6 flex justify-center text-center text-lg text-gray-900">
                        <p>Total: {{ totalPrice }} €</p>
                      </div>
                      <button class="flex rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 m-auto" @click="placeOrder">
                         Valider la commande
                      </button>
                      <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{{ ' ' }}
                          <button type="button" class="font-medium text-sky-500 hover:text-sky-400" @click="open = false">
                            Continue le Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  import axios from 'axios';
  import Toast from 'primevue/toast';
  import { useToast } from 'primevue/usetoast';
  
  const toast = useToast();
  const open = ref(true)
  const cartItems = ref([]);
  const totalPrice = ref(0); 
  
  // Fonction pour récupérer les items du panier
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get('http://localhost:4000/cart/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const items = response.data;
  
      const detailedItems = await Promise.all(
        items.map(async (item) => {
          const productResponse = await axios.get(`http://localhost:4000/products/${item.productId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const product = productResponse.data;
  
          // Combine les données du cartItem avec les infos du produit
          return {
            ...item,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
          };
        })
      );
  
      // Mettre à jour cartItems 
      cartItems.value = detailedItems;
  
    } catch (error) {
      console.error('Erreur lors de la récupération des items du panier :', error);
  
      if (error.response && error.response.status === 401) {
        alert('Session expirée. Veuillez vous reconnecter.');
        window.location.href = '/login';
      } else {
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    }
  };
  
  // Fonction pour supprimer un item du panier
  const removeCartItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.delete(`http://localhost:4000/cart/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.add({
        severity: 'info',
        summary: `Item ${response.data.id} supprimé du panier`,
        life: 3000
      });
  
      // Mettre à jour la liste 
      cartItems.value = cartItems.value.filter((item) => item.id !== itemId);
      calculateTotalPrice(); // Recalculer le total après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'item :', error);
    }
  };
  
  // Fonction pour calculer le total du panier
  const calculateTotalPrice = () => {
    totalPrice.value = cartItems.value.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  
  watch(cartItems, calculateTotalPrice, { immediate: true });
  
  
  
  
  ////////////////////////// add order
  const placeOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      // Structure des données de la commande
      const orderData = {
        status: 'placed',
        total: totalPrice.value,
        items: cartItems.value.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      };
  
      // Appel à l'API pour créer la commande
      const response = await axios.post('http://localhost:4000/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Afficher un toast de confirmation
      toast.add({
        severity: 'success',
        summary: `Commande n°${response.data.id} créée avec succès`,
        life: 3000,
      });
    
      // Réinitialiser le panier local
      cartItems.value = [];
      totalPrice.value = 0;
  
    } catch (error) {
      console.error('Erreur lors de la validation de la commande :', error);
      toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de valider la commande, veuillez réessayer.',
        life: 3000,
      });
    }
  };
  
  
  
  
  
  
  onMounted(fetchCartItems);
  </script>
  