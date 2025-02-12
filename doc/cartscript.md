<script setup>
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'

const open = ref(true)
const cartItems = ref([]) 

const fetchCartItems = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get('http://localhost:4000/cart/items', {
      headers: {
        Authorization: `Bearer ${token}`, 
      }
    })

    cartItems.value = response.data

  } catch (error) {
    console.error('Erreur lors de la récupération des items du panier :', error)
  }
}
onMounted(() => {
  fetchCartItems()
})
</script>