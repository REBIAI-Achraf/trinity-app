<template>
  <div :class="['p-4 rounded-lg shadow-md w-1/4', bgColor, 'm-4']">
    <div class="text-sm p-4">
      <h3 :class="['font-bold flex items-center', textColor]">
        {{ title }}
        <slot name="icon"></slot>
      </h3>
      <h4 :class="['font-semibold text-lg mt-2', textColor]">{{ value }}</h4>
      <sub :class="[textColor]">{{ description }}</sub>

    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  value: [String, Number],
  bgColor: { type: String, default: 'bg-white' },
  textColor: { type: String, default: 'text-black' },
});
</script>