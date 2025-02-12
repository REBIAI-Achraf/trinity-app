
<template>

    <a :href="href" class="flex-none rounded-lg bg-gray-800 px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700  " >
      {{ label }} 
      </a>
  
  </template>
  
  <script setup>
  // eslint-disable-next-line no-undef
  defineProps({
    label: {
      type: String,
      required: true,
      default: 'Default Text'
    },
    href: {
      type: String,
      required: false,
      default: '#'
    }
  });
  </script>
  
  
  
  <style scoped>
  /* Ajoutez des styles supplémentaires ici si vous voulez  */
  </style>
  