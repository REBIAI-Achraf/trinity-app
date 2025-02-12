<template>
  <main>
    <Toast />
    <!-- Header -->
    <div class="w-full h-16 flex flex-col px-4 m-2">
      <p class="text-gray-400 font-bold">KPI</p>
      <h4 class="text-black font-semibold"> Statéstiques clés sur les utilisateurs </h4>
    </div>

    <div class=" w-full flex flex-col">
      <div class="w-full h-40 flex">

        <!-- Produits en stock -->
        <CardStat
          title="Produits enregistrés"
          :value="countProducts()"
          bgColor="bg-black"
          textColor="text-white"
        >
          <template #icon>
            <ShoppingBagIcon class="w-4 h-4 ml-2" />
          </template>
        </CardStat>

       </div> 

      <div clas="m-5 bg-red-400">
        <h4 class="text-black m-4"> Gestion des Produits </h4>
      </div>

      <div class=" w-full flex flex-row m-2">

        <button @click="categorieVisibility" class="flex rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 mx-1">
        Créer une catégorie 
       </button>

        <button @click="toggleVisibility"
          class="flex rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 mx-1  ">Ajoutez
          un Produit
          <PlusCircleIcon class="w-4 h-4 ml-4 mt-1" />
        </button>

        <button  @click="fetchProducts"
          class="flex rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 mx-1">
          mettre à jour la liste
          <ClipboardDocumentListIcon class="w-4 h-4 ml-4 mt-1" />
        </button>
      
       <RouterLink to="/dashboard/products/openfoodfacts">
        <button class="flex mx-2">
          <img src="https://cdn.filestackcontent.com/JVzxFl6DSOmG2dwg1Z6H" alt="openfoodfactslogo" class="w-36 h-10  rounded-lg shadow-sm hover:opacity-1/2"  />
        </button>
      </RouterLink>
      


      </div>

      <!-- add Products -->
      <div v-if="isVisible" class="w-3/5 bg-white m-4 p-5 rounded-2xl text-black">
        <h4 class="m-3 font-semibold flex"> Ajouter un Produit
          <PlusCircleIcon class="w-4 h-4 ml-4 mt-1" />
        </h4>

        <form @submit.prevent="createProduct" action="" class="flex flex-col text-black mt-5">

          <label for="name" class="m-2">Nom du produit </label>
          <input v-model="newProduct.name" type="text" id="name" required placholder="nom de produit "
            class="m-2 outline outline-1 outline-black rounded-lg p-1 bg-white" />
          
            <label for="description" class="m-2">Description </label>
          <textarea v-model="newProduct.description" id="description" required class="m-2 outline outline-1 outline-black  rounded-lg p-1 bg-white" >

          </textarea>
          
          
          <label for="price" class="m-2">Prix </label>
          <input v-model="newProduct.price" type="number" id="price" required  placholder="prix"
            class="m-2 outline outline-1 outline-black  rounded-lg p-1 bg-white" />
          
            <label for="sku" class="m-2">SKU</label>
          <input v-model="newProduct.sku" type="text" id="sku" required  placholder="Sku"
            class="m-2 outline outline-1 outline-black  rounded-lg p-1 bg-white" />
           
            <label for="quantity" class="m-2">Quantité </label>
          <input v-model="newProduct.quantity" type="number" id="quantity" required  placholder="Quantité"
            class="m-2 outline outline-1 outline-black  rounded-lg p-1 bg-white" />

            <label for="categoryId" class="m-2 ">ID de la catégorie </label>
            <input v-model="newProduct.categoryId" type="number" id="categoryId" 
            class="m-2 outline outline-1 outline-black  rounded-lg p-1 bg-white" />
          
          <button type="submit"
            class="flex-none rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700  mt-3 ">
            Ajoutez</button>
        </form>

      </div>

        <!-- add category -->
      <div v-if="isVisibleCategory" class="w-1/2 bg-white m-4 p-5 rounded-2xl text-black">
        <h4 class="m-3 font-semibold flex"> Ajouter une Catégorie
          <PlusCircleIcon class="w-4 h-4 ml-4 mt-1" />
        </h4>
        <form @submit.prevent="createCategory" action="" class="flex flex-col text-black mt-5">
          <label for="name" class="m-2"> le nom de votre Categorie </label>
           
          <input  v-model="newCategory.name" type="text" id="name" required placholder="nom de categorie"
            class="m-2 outline outline-1 outline-black rounded-lg p-1 bg-white" />
            
            <button type="submit"
            class="flex-none rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700  mt-3 ">
            Ajoutez</button>
        </form>
      </div>
     <!-- <div class="w-full bg-white m-4 p-5 rounded-2xl text-black"> 
      <h4 class="m-3 font-semibold flex"> Liste des Categories
          <UserGroupIcon class="w-4 h-4 ml-4 mt-1" />
        </h4>
      <table class="w-full bg-white m-4 p-5 rounded-2xl">
  <thead>
    <tr>
      <th class="border px-4 py-2">ID</th>
      <th class="border px-4 py-2">Nom de la catégorie</th>
    </tr>
  </thead>
  <tbody v-if="categories.length === 0">
  <tr>
    <td colspan="2" class="text-center text-gray-500">Aucune catégorie disponible</td>
  </tr>
</tbody>

  <tbody>
    <tr v-for="category in categories" :key="category.id">
      <td class="border px-2 py-2 text-black">{{ category.id }} </td>
      <td class="border px-2 py-2">{{ category.name }}</td>
    </tr>
  </tbody>
</table>
</div> -->
         <!-- Table Products -->

         <div class="w-full bg-white m-4 p-5 rounded-2xl text-black">
        <h4 class="m-3 font-semibold flex"> Liste des  Produits
          <UserGroupIcon class="w-4 h-4 ml-4 mt-1" />
        </h4>

        <table class="min-w-full table-auto border-collapse border border-gray-200 text-sm">
          <thead>
            <tr>
              <th class="border px-4 py-2">ID</th>
              <th class="border px-4 py-2">Image</th>
              <th class="border px-4 py-2">Nom</th>
              <th class="border px-4 py-2">Discription</th>
              <th class="border px-4 py-2">Prix</th>
              <th class="border px-4 py-2"> Sku</th>
              <th class="border px-4 py-2">Quantité</th>
              <!-- <th class="border px-4 py-2">ID catégorie</th> -->
              <th class="border px-4 py-2">Action</th>
              <th class="border px-4 py-2"> Edit</th>


            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="border px-2 py-2 ">{{ product.id }}</td>
              <td class="border px-2 py-2 "><img v-if="product.imageUrl" :src="product.imageUrl"  alt="" srcset=""  class="w-12 h-12 object-contain"></td>
              <td class="border px-2 py-2">{{ product.name }}</td>
              <td class="border px-2 py-2 "> {{ product.description }}</td>
              <td class="border px-2 py-2 "> {{ product.price }}</td>
              <td class="border px-2 py-2 "> {{ product.sku }}</td>
              <td class="border px-2 py-2 "> {{ product.quantity}}</td>
              <!-- <td class="border px-2 py-2 "> {{ product.categoryId }}</td> -->

              <td class="border px-4 py-2 flex-row justify-center">
                <button @click="deleteProduct(product.id)"  class="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded">
                  <TrashIcon class="w-4 h-4 " />
                </button>
              </td>
              <td class="border px-4 py-2 flex-row justify-center">
                <button  @click="editProduct(product)" class="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded">
                  <PencilSquareIcon class="w-4 h-4 " />
                </button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

</div>  

<div v-if="isEditing" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  <form action="" class="bg-white p-6 rounded-lg w-1/2 text-black">
  <div >
        <h3 class=" text-xl font-bold mb-4"> Modifier le Produit</h3>
        <div class="mb-2 text-sm">
          <label class="block text-sm  mb-1" for="editName">Nom</label>
          <input v-model="selectedProduct.name" type="text" id="editName" required class="w-full p-1 border rounded bg-white text-sm " />
        </div>
        <div class="mb-2">
          <label class="block text-sm  mb-1" for="editDescription">Description</label>
         <textarea v-model="selectedProduct.description" id="editDescription" required class="w-full p-1 border rounded bg-white text-sm "> </textarea>
        </div>
        <div class="mb-2">
          <label class="block text-sm mb-1" for="editPrice" >Prix</label>
          <input v-model="selectedProduct.price" type="number" id="editPrice" required class="w-full p-1 border rounded bg-white text-sm "/>
        </div>
        <div class="mb-2">
            <label for="editSku" class="block text-sm mb-1 ">SKU</label>
            <input v-model="selectedProduct.sku" type="text" id="editSku" required class="w-full p-1 border rounded bg-white text-sm "/>
          </div>
          <div class="mb-2">
            <label for="editQuantity" class="block text-sm mb-1  ">Quantité</label>
            <input v-model="selectedProduct.quantity" type="number" id="editQuantity" required class="w-full p-1 border rounded bg-white text-sm " />
          </div>
          <div class="mb-2">
            <label for="editCategoryId" class="block text-sm mb-1 ">ID de la Catégorie</label>
            <input v-model="selectedProduct.categoryId" type="number" id="editCategoryId"  class="w-full p-1 border rounded bg-white text-sm " />
          </div>
        <div class="flex justify-end space-x-2">
          <button @click="isEditing = false" class="bg-gray-600 text-white px-4 py-2 rounded">Annuler</button>
          <button @click="updateProduct" class="bg-blue-500 text-white px-4 py-2 rounded">Enregistrer</button>
        </div>
      </div>
    </form> 
    </div>


  </main>
</template>

<script setup>
import CardStat from "../Dashboard/CardStat.vue";
import { ShoppingBagIcon, PlusCircleIcon, ClipboardDocumentListIcon , PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const isVisible = ref(false);
const isVisibleCategory = ref(false);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

const categorieVisibility = () => {
  isVisibleCategory.value = ! isVisibleCategory.value;
};

const categories = ref([]);
const newCategory = ref({ name: '' });

///////////////////// category fetch
const fetchCategory = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get('http://localhost:4000/products/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response.data); // Vérification des données reçues
    categories.value = response.data;

  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
  }
};
////////////////////////////: Add Category 

const createCategory = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token manquant. Veuillez vous reconnecter.');
    }
    await axios.post('http://localhost:4000/products/categories', newCategory.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    toast.add({
      severity: 'success',
      summary: 'Nouvelle catégorie ajoutée',
      life: 3000,
    });
    newCategory.value = { name: '' }; // Réinitialiser
    await fetchCategory(); 
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la catégorie :', error.response?.data || error);
    toast.add({
      severity: 'error',
      summary: 'Échec de l\'ajout de la catégorie',
      detail: error.response?.data?.message || 'Erreur inconnue',
      life: 3000,
    });
  }
};



///////////////////////////////// products fetch 

const products = ref([]);
const newProduct = ref({ name: '', description: '', price: '', sku: '', quantity: '', categoryId:'' });
const selectedProduct = ref(null);

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

///////////////////////////////////// counters
const countProducts = () => {
  return products.value.length;
};




//////////////////////////////////////delete Product

const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.delete(`http://localhost:4000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      toast.add({
      severity: 'info',
      summary: 'Produit suprimé',
      life: 3000
    });
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };


////////////////////////////: Add Poducts
const createProduct = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    await axios.post('http://localhost:4000/products', newProduct.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    fetchProducts();
     // success
  toast.add({
    severity: 'success',
    summary: 'Produit ajouté',
    life: 3000
  });
    newProduct.value = { name: '', description: '', price: 0, sku: '', quantity: 0, categoryId: 0 };
  } catch (error) {
     // error
  toast.add({
    severity: 'error',
    summary: 'Échec de l\'ajout du produit',
    life: 3000
  });
  }
};


/////////////// edit product 
const isEditing = ref(false);

const editProduct = (product) => {
    selectedProduct.value = { ...product };
    isEditing.value = true;
  };
  
  const updateProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.patch(`http://localhost:4000/products/${selectedProduct.value.id}`, selectedProduct.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
       // success
  toast.add({
    severity: 'success',
    summary: 'Produit mis à jour',
    life: 3000
  });
      fetchProducts();
      selectedProduct.value = null;
    } catch (error) {
      console.error('Erreur lors de la modification du produit:', error);
    }
  };


  onMounted(() => {
  fetchProducts();
  fetchCategory(); 
});


</script>