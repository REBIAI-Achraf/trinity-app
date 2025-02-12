<template>
  <div>
    <Toast/>
    <NavbarComponent />
 

    <div v-if="loading" class="text-center mt-4">
      <span>Chargement...</span>
    </div>

    <div v-else class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-black sm:text-3xl mt-6">Nos produits</h2>
      <br>
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <div v-for="product in products" :key="product.id" class="group">
          <RouterLink :to="`/product/${product.id}`" class="product-card">
            <img :src="product.imageUrl" :alt="product.name" class="w-32 h-32 object-contain"/>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-brand">{{ product.description }}</p>
              <p class="product-price">{{ product.price}} €</p>
            </div>
          </RouterLink>
          <button @click="addToCart(product)" class="add-to-cart-button">Ajouter au panier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavbarComponent from '../components/HomeComponents/NavbarComponent.vue';
import axios from 'axios';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();


const products = ref([]);
const loading = ref(false);
const cart = ref([]);


const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get('http://localhost:4000/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    products.value = response.data;

  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
  }
};

const addToCart = async (product) => {
try {
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  console.log('Product:', product);
  const response = await axios.post('http://localhost:4000/cart/add', {
    productId: product.id,
    quantity: 1,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
   // Si un nouveau cartId est créé, le stocker
   if (response.data.id) {
      localStorage.setItem('cartId', response.data.id);
    }

  console.log('Response:', response);
  cart.value = response.data;
  toast.add({
      severity: 'success',
      summary: `${product.name}a été ajouté au panier.`,
      life: 3000
    });
} catch (error) {
  console.error('Error adding to cart:', error);
  console.error('Error response:', error.response);
}
};

onMounted(async () => {
  loading.value = true;
  fetchProducts();
  loading.value = false;
});
</script>

<style scoped>
.product-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
}

.product-brand {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #718096;
}

.product-price {
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
}

.add-to-cart-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover {
  background-color: #2b6cb0;
}
</style>
