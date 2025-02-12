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

        <!-- Clients enregistrés -->
        <CardStat
          title="Clients enregistrés"
          :value="countClients()"
          bgColor="bg-black"
          textColor="text-white"
        >
          <template #icon>
            <UsersIcon class="w-4 h-4 ml-2" />
          </template>
        </CardStat>



        <!-- Admin enregistrés -->
        <CardStat
          title="Admins enregistrés"
          :value="countAdmin()"
          bgColor="bg-white"
          textColor="text-black"
        >
          <template #icon>
            <UsersIcon class="w-4 h-4 ml-2" />
          </template>
        </CardStat>

       </div> 

      <div clas="m-5 bg-red-400">
        <h4 class="text-black  m-4"> Gestion des utilisateurs </h4>
      </div>

      <div class=" w-full flex flex-row m-2">
        <button @click="toggleVisibility"
          class="flex rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 mx-1  ">Ajoutez
          un utilisateur
          <UserPlusIcon class="w-4 h-4 ml-4 mt-1" />
        </button>

        <button @click="fetchUsers"
          class="flex rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 mx-1">
          mettre à jour la liste
          <UserGroupIcon class="w-4 h-4 ml-4 mt-1" />
        </button>
      </div>

      <!-- add users -->
      <div v-if="isVisible" class="w-3/5 bg-white m-4 p-5 rounded-2xl text-black">
        <h4 class="m-3 font-semibold flex"> Ajouter un utilisateur
          <UserPlusIcon class="w-4 h-4 ml-4 mt-1" />
        </h4>

        <form @submit.prevent="createUser" action="" class="flex flex-col text-black mt-5">

          <label for="email" class="m-2">Email</label>
          <input v-model="newUser.email" required type="email" placholder="email"
            class="m-2 outline outline-1 outline-black rounded-lg p-1 bg-white" />
          <label for="passord" class="m-2">Mot de passe </label>
          <input v-model="newUser.password" required type="password" placholder="password"
            class="m-2 outline outline-1 outline-black  rounded-lg p-1 bg-white" />
          <label for="passordconfirmation" class="m-2">Confirmez le mot de passe </label>
          <input v-model="newUser.confirmPassword" required type="password" placholder="passordconfirmation"
            class="m-2 outline outline-1 outline-black  rounded-lg p-1 bg-white" />
          <label for="role" class="m-2 ">Définir le role </label>
          <select v-model="newUser.role" class="m-2 rounded-lg p-2 bg-white outline outline-1 outline-black">
            <option value="customer"> client </option>
            <option value="Admin"> Admin </option>
          </select>
          <button type="submit"
            class="flex-none rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700  mt-3 ">
            Ajoutez</button>
        </form>

      </div>



      <!-- Table users -->

      <div class="w-4/5 bg-white m-4 p-5 rounded-2xl text-black">
        <h4 class="m-3 font-semibold flex"> Liste des utilisateur
          <UserGroupIcon class="w-4 h-4 ml-4 mt-1" />
        </h4>

        <table class="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th class="border px-4 py-2">ID</th>
              <th class="border px-4 py-2">Email</th>
              <th class="border px-4 py-2">Rôle</th>
              <th class="border px-4 py-2">Action</th>
              <th class="border px-4 py-2"> Edit</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="border px-4 py-2 ">{{ user.id }}</td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2 "> {{ user.role }}</td>
              <td class="border px-4 py-2 flex justify-center">
                <button @click="deleteUser(user.id)" class="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded">
                  <TrashIcon class="w-4 h-4 " />
                </button>
              </td>
              <td class="border px-4 py-2 flex-row justify-center">
                <button @click="startEditUser(user)" class="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded">
                  <PencilSquareIcon class="w-4 h-4 " />
                </button>
              </td>

            </tr>

          </tbody>
        </table>
      </div>

    </div>

    <div v-if="isEditing" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-1/3 text-black">
        <h3 class=" text-xl font-bold mb-4">Modifier l'utilisateur</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="email">Email</label>
          <input v-model="editingUser.email" class="w-full p-2 border rounded bg-white" type="email" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="role">Rôle</label>
          <select v-model="editingUser.role" class="w-full p-2 border rounded bg-white">
            <option value="admin">Admin</option>
            <option value="customer">Client</option>
          </select>
        </div>
        <div class="flex justify-end space-x-2">
          <button @click="isEditing = false" class="bg-gray-600 text-white px-4 py-2 rounded">Annuler</button>
          <button @click="editUser" class="bg-blue-500 text-white px-4 py-2 rounded">Enregistrer</button>
        </div>
      </div>
    </div>


  </main>
</template>

<script setup>
import CardStat from "../Dashboard/CardStat.vue";
import { UsersIcon, UserPlusIcon, UserGroupIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const isVisible = ref(false);
const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

///////////////////////////////// users fetch 

const users = ref([]);

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get('http://localhost:4000/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    users.value = response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error('Erreur: Accès refusé. Vous n\'avez pas les permissions nécessaires.');
    } else {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  }
};

///////////////////////////////////// clients & admin counts
const countClients = () => {
  return users.value.filter(user => user.role === 'customer').length;
};

const countAdmin = () => {
  return users.value.filter(user => user.role === 'admin').length;
};


////////////////////////// Add New User
const newUser = ref({ email: '', password: '', confirmPassword: '', role: '' });

const createUser = async () => {
  // passwordverification
  if (newUser.value.password !== newUser.value.confirmPassword) {
    toast.add({
      severity: 'error',
      summary: 'Les mots de passe ne correspondent pas',
      life: 3000
    });
    return;
  }

  try {

    await axios.post('http://localhost:4000/users/register', {
      email: newUser.value.email,
      password: newUser.value.password,
      role: newUser.value.role
    });

    // Réinitialise le formulaire
    newUser.value = { email: '', password: '', confirmPassword: '', role: '' };
    fetchUsers();
    // success
    toast.add({
      severity: 'success',
      summary: 'Utilisateur ajouté',
      life: 3000
    });
  } catch (error) {

    // error
    toast.add({
      severity: 'error',
      summary: 'Échec de l\'ajout de l\'utilisateur',
      life: 3000
    });
  }
};

/////////////////// delete
const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/users/${id}`);
    toast.add({
      severity: 'info',
      summary: 'utilisateur suprimé',
      life: 3000
    });

    fetchUsers();
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
  }
};

/////////////// edit user 
const isEditing = ref(false);
const editingUser = ref(null);

/////open the modal
const startEditUser = (user) => {
  editingUser.value = { ...user };
  isEditing.value = true;
};

// Fonction 
const editUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    // send mofdification 
    await axios.patch(
      `http://localhost:4000/users/${editingUser.value.id}`,
      editingUser.value,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.add({ severity: 'success', summary: 'Utilisateur mis à jour', life: 3000 });
    fetchUsers();
    isEditing.value = false;
    editingUser.value = null;
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Erreur lors de la mise à jour', life: 3000 });
    console.error('Erreur lors de la modification de l\'utilisateur:', error);
  }
};

onMounted(fetchUsers);


</script>