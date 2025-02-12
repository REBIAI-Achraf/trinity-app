<template>
  <div>
    <NavbarComponent />
    <div class="flex items-center mt-10 h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <!-- Conteneur principal -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center sm:h-1/3 w-full sm:w-3/4 rounded-xl bg-gradient-to-l from-[#299fff] to-[#ffffff] shadow-2xl">

        <!-- Div grise avec formulaire -->
        <div
          class="m-3 h-full w-full sm:w-1/2 p-10 rounded-xl bg-gray-600 isolate bg-white/20 shadow-lg ring-1 ring-black/5">
          <div class="text-center sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="text-3xl font-bold tracking-tight text-black sm:text-3xl">Se connecter</h2>
          </div>
          <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="login" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
                <div class="mt-2">
                  <input v-model="email" type="email" name="email" id="email" autocomplete="email" required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm" />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium text-gray-900">Mot de passe</label>
                  <div class="text-sm">
                    <a href="#" class="font-semibold text-gray-600 hover:text-gray-900">Mot de passe oublié?</a>
                  </div>
                </div>
                <div class="mt-2">
                  <input v-model="password" type="password" name="password" id="password"
                    autocomplete="current-password" required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm" />
                </div>
              </div>

              <div>
                <button type="submit"
                  class="block w-full rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">
                  Connexion
                </button>
              </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
              Pas encore inscrit ?
              <RouterLink to='/Signin'>
                <a class="font-semibold text-gray-600 hover:text-gray-900 ease-in-out duration-200">
                  Créer votre compte dès maintenant
                </a>
              </RouterLink>


            </p>
          </div>
        </div>

        <!-- Div avec l'image -->
        <div class="m-3 flex justify-center items-end h-72 sm:h-full w-full sm:w-1/2">
          <img :src="image" alt="" class="m-auto h-52 sm:h-72 object-contain">
        </div>

      </div>
    </div>


  </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import image from '../assets/images/img3.png';
import NavbarComponent from '../components/HomeComponents/NavbarComponent.vue';
const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('http://localhost:4000/auth/login', {
      email: email.value,
      password: password.value,
    });
    const token = response.data.access_token;
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email.value);
    router.push('/dashboard');
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Login failed. Please try again.');
  }
};
</script>