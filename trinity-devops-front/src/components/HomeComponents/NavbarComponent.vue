<!-- eslint-disable no-unused-vars -->
<template>
<div>
<Disclosure as="nav" class="bg-white w-full z-10 fixed top-0 left-0 border-b-2 border-gray-50" v-slot="{ open }">
    <BannerComponent/>
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <img class="h-6 w-21" :src="logo" alt="logo" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.to"
                :class="[
                  item.current
                    ? 'text-sky-500 '
                    : 'text-black  hover:text-sky-500 duration-200',
                  ' px-3 py-2 text-sm font-semibold lato ',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</RouterLink>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
        <p class="text-black mx-4">{{userEmail}} </p>
          <button
           @click="toggleCart"
            type="button"
            class="relative rounded-full bg-black-800 p-1 text-black hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-1 duration-200"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">Voir le panier</span>
            <ShoppingBagIcon class="size-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative rounded-full bg-black-800 p-1 text-black hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-1 duration-200"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <UserIcon class="size-6 rounded-full" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <RouterLink to="/orders">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 outline-none' : '',
                      'block px-4 py-2 text-sm text-black',
                    ]"
                    >Mes commandes </a
                  ></RouterLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 outline-none' : '',
                      'block px-4 py-2 text-sm text-black',
                    ]"
                    >Wish list</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 outline-none' : '',
                        'block px-4 py-2 text-sm text-black',
                      ]"
                      @click="logout"
                    >Déconnexion</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-sky-400 text-black'
              : 'text-black-300 hover:bg-sky-400 hover:text-black',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton >
      </div>
    </DisclosurePanel>
  </Disclosure>
  <CartPage v-if="isCartOpen" />

</div>

</template>

<script setup >
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { ref, onMounted ,computed } from 'vue';
import { useRouter } from 'vue-router';

import CartPage from '../../pages/CartPage.vue'  

const userEmail = ref('');

onMounted(() => {
  userEmail.value = localStorage.getItem('userEmail');
});



const isCartOpen = ref(false)  

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
}

import { Bars3Icon, UserIcon, XMarkIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import logo from '../../assets/images/logo.png'
import BannerComponent from './BannerComponent.vue'

const router = useRouter();
const isAuthenticated = ref(!!localStorage.getItem('token'));

const navigation = computed(() => [
  { name: 'Accueil', to: '/', current: true },
  { name: 'Produits', to: '/produits', current: false },
  { name: 'Services', to: '#services', current: false, requiresAuth: false },
  { name: 'A propos', to: '#apropos', current: false, requiresAuth: false },
  { name: 'Contact', to: '#contacter', current: false, requiresAuth: false },
]);

const filteredNavigation = computed(() =>
  navigation.value.filter(item => !item.requiresAuth || isAuthenticated.value)
);

const logout = () => {
  localStorage.removeItem('token');   
  localStorage.removeItem('userEmail');   
  userEmail.value = '';  
  isAuthenticated.value = false;
  router.push('/Login');
};


</script>
