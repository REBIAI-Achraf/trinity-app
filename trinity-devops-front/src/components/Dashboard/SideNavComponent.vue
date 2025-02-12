<template>
  <main>
    <nav class="block h-screen w-60 bg-white fixed md:w-48 lg:w-60">

      <!-- Logo -->
      <RouterLink to="/">
      <div class="m-4 flex justify-center">
        <img class="h-6 w-auto" :src="logo" alt="logo" />
      </div>
      </RouterLink>

      <!-- Navigation Links -->
      <div class="flex flex-col h-full">
        <RouterLink to="/dashboard" :class="['nav-link', { 'active': $route.path === '/dashboard' }]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="h-5 w-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
          </svg>
          Dashboard
        </RouterLink>

        <!-- utilisateurs-->
        <RouterLink to="/dashboard/user" :class="['nav-link', { 'active': $route.path === '/dashboard/user' }]">
          <UserIcon class="h-5 w-5 mr-2" />
          utilisateurs
        </RouterLink>

        <!-- Produits -->
        <RouterLink to="/dashboard/products" :class="['nav-link', { 'active': $route.path === '/dashboard/products' }]">
          <ShoppingBagIcon class="h-5 w-5 mr-2" />
          Produits
        </RouterLink>

        <!-- Commandes -->
        <RouterLink to="/dashboard/orders" :class="['nav-link', { 'active': $route.path === '/dashboard/orders' }]">
          <ShoppingCartIcon class="h-5 w-5 mr-2" />
          Commandes
        </RouterLink>

        <!-- Ventes -->
        <RouterLink to="/dashboard/payments" :class="['nav-link', { 'active': $route.path === '/dashboard/sales' }]">
          <ChartBarIcon class="h-5 w-5 mr-2" />
          Ventes
        </RouterLink>

        <!-- Rapports -->
        <RouterLink to="/dashboard/reports" :class="['nav-link', { 'active': $route.path === '/dashboard/reports' }]">
          <DocumentDuplicateIcon class="h-5 w-5 mr-2" />
          Rapports
        </RouterLink>
        <!-- Logout -->
          <RouterLink
            to="/"
            class="nav-link"
          >
            <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 outline-none' : '',
                        'block px-4 py-2 text-sm text-black-700',
                      ]"
                      @click="logout"
                    >Déconnexion</a>
          </RouterLink>

      </div>
    </nav>
  </main>
</template>

<script setup>
import {
  ShoppingCartIcon,
  ShoppingBagIcon,
  UserIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
} from "@heroicons/vue/24/outline";
import logo from "../../assets/images/dashboard-logo.png";
import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const isAuthenticated = ref(!!localStorage.getItem('token'));

  const logout = () => {
  localStorage.removeItem('token');
  isAuthenticated.value = false;
  router.push('/Login');
};

</script>

<style scoped>
.nav-link {
  @apply flex items-center justify-center mx-auto my-2 p-2 w-40 rounded-lg text-sm font-semibold text-gray-600 hover:text-black hover:bg-gray-100 transition duration-200;
}

.active {
  @apply text-black bg-sky-400 hover:bg-sky-500;
}
</style>
