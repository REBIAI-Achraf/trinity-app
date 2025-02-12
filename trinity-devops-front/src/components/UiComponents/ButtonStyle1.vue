
<template>
    <a 
      :href="href" 
      class="flex-none rounded-full bg-gray-900 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-gray-700  "
    >
      {{ label }} 
      <span aria-hidden="true">&emsp14;&rarr;</span>
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
  /* Ajoutez des styles supplémentaires ici si nécessaire */
  </style>
  