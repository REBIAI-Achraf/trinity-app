<template>
    <div>
      <div class="container mx-auto mt-10">
        <h2 class="text-2xl font-bold mb-4 flex justify-center">Gestion des Commandes</h2>
      </div>
      <div class="mb-4">
        <form @submit.prevent="createOrder" class="bg-white p-6 rounded-lg shadow-md">
          <div class="mb-2">
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <input v-model="newOrder.status" type="text" id="status" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div class="mb-2">
            <label for="total" class="block text-sm font-medium text-gray-700">Total</label>
            <input v-model="newOrder.total" type="number" id="total" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div class="mb-2">
            <label for="userId" class="block text-sm font-medium text-gray-700">User ID</label>
            <input v-model="newOrder.userId" type="number" id="userId" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div class="mb-2">
            <label for="productId" class="block text-sm font-medium text-gray-700">Product ID</label>
            <input v-model="newOrder.productId" type="number" id="productId" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <button type="submit" class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Créer Commande</button>
        </form>
        <button @click="fetchOrders" class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Récupérer Commandes</button>
      </div>
      <table class="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="order in orders" :key="order.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.status }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.total }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.userId }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.product ? order.product.name : 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="editOrder(order)" class="text-indigo-600 hover:text-indigo-900">Modifier</button>
              <button @click="deleteOrder(order.id)" class="text-red-600 hover:text-red-900 ml-4">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="selectedOrder" class="mt-4">
        <h3 class="text-xl font-bold mb-4">Modifier Commande</h3>
        <form @submit.prevent="updateOrder" class="bg-white p-6 rounded-lg shadow-md">
          <div class="mb-2">
            <label for="editStatus" class="block text-sm font-medium text-gray-700">Status</label>
            <input v-model="selectedOrder.status" type="text" id="editStatus" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div class="mb-2">
            <label for="editTotal" class="block text-sm font-medium text-gray-700">Total</label>
            <input v-model="selectedOrder.total" type="number" id="editTotal" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div class="mb-2">
            <label for="editUserId" class="block text-sm font-medium text-gray-700">User ID</label>
            <input v-model="selectedOrder.userId" type="number" id="editUserId" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div class="mb-2">
            <label for="editProductId" class="block text-sm font-medium text-gray-700">Product ID</label>
            <input v-model="selectedOrder.productId" type="number" id="editProductId" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <button type="submit" class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Mettre à jour Commande</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const orders = ref([]);
  const newOrder = ref({ status: 'placed', total: 0, userId: 1, productId: 1 });
  const selectedOrder = ref(null);
  
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get('http://localhost:4000/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      orders.value = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  };
  
  const createOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.post('http://localhost:4000/orders', newOrder.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchOrders();
      newOrder.value = { status: 'placed', total: 0, userId: 1, productId: 1 };
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
    }
  };
  
  const deleteOrder = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.delete(`http://localhost:4000/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchOrders();
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande:', error);
    }
  };
  
  const editOrder = (order) => {
    selectedOrder.value = { ...order };
  };
  
  const updateOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.patch(`http://localhost:4000/orders/${selectedOrder.value.id}`, selectedOrder.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchOrders();
      selectedOrder.value = null;
    } catch (error) {
      console.error('Erreur lors de la modification de la commande:', error);
    }
  };
  
  onMounted(fetchOrders);
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  form {
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  form .mb-2 {
    margin-bottom: 1rem;
  }
  
  form label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4a5568;
  }
  
  form input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  form input:focus {
    border-color: #5a67d8;
    box-shadow: 0 0 0 3px rgba(90, 103, 216, 0.3);
  }
  
  form button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    background-color: #5a67d8;
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  form button:hover {
    background-color: #434190;
  }
  
  table {
    width: 100%;
    margin-top: 1.5rem;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  table th,
  table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  table th {
    background-color: #f7fafc;
    font-size: 0.75rem;
    font-weight: 600;
    color: #4a5568;
    text-transform: uppercase;
  }
  
  table td {
    font-size: 0.875rem;
    color: #4a5568;
  }
  
  table tr:last-child td {
    border-bottom: none;
  }
  
  table button {
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  table button.text-indigo-600 {
    color: #5a67d8;
  }
  
  table button.text-indigo-600:hover {
    color: #434190;
  }
  
  table button.text-red-600 {
    color: #e53e3e;
  }
  
  table button.text-red-600:hover {
    color: #c53030;
  }
  </style>