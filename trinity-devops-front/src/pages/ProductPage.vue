<template>
    <div>
      <h1>{{ product.product_name }}</h1>
      <img :src="product.image_url" :alt="product.product_name" />
      <p>{{ product.brands }}</p>
      <p>{{ product.ingredients_text }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const product = ref({});
  
  onMounted(async () => {
    const productId = route.params.id;
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${productId}.json`);
      product.value = response.data.product;
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  });
  </script>
  