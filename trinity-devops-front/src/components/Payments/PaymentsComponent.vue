<!-- APPjs/trinity-devops-front/src/components/Payments/PaymentsComponent.vue -->
<template>
    <div class="container mx-auto mt-10 ">
      <h2 class="text-2xl font-bold mb-4 flex justify-center">Paiement</h2>
      <div class="button-container">
      <button @click="handlePayment" class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Payer</button>
    </div></div>
  </template>
  
  <script setup>
  import axios from 'axios';
  
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4000/payments/stripe/create-checkout-session/1', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      window.location.href = response.data.url; // Redirige l'utilisateur vers l'URL de la session de paiement
    } catch (error) {
      console.error('Erreur lors de la création de la session de paiement:', error);
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
    color: #333333;
  }
  
  .description {
    text-align: center;
    color: #666666;
    margin-bottom: 1.5rem;
  }
  
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 1rem;
    font-weight: medium;
    color: #ffffff;
    background-color: #4f46e5;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
  }
  
  .button:hover {
    background-color: #4338ca;
  }
  
  .button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5);
  }
  
  </style>