<template>
  <main>
    <!-- Header -->
    <div class="w-full h-16 flex flex-col px-4 m-2">
      <p class="text-gray-400 font-bold">KPI</p>
      <p class="text-black font-semibold">Statistiques clés</p>
    </div>
    <div class="h-full w-full flex flex-col">
    <!-- CardStat Section -->
    <div class="w-full h-42 flex ">
      <CardStat
        v-for="kpi in kpis"
        :key="kpi.title"
        :title="kpi.title"
        :value="kpi.value"
        :description="kpi.description"
        bgColor="bg-white"
        textColor="text-black"
      >
        <template #icon>
          <ClipboardDocumentListIcon class="w-4 h-4 ml-4 " />
        </template>
      </CardStat>
    </div>

    <!-- Chart Section -->
    <div class="mt-8 w-full h-80">
      <Chart type="line" :data="chartData" :options="chartOptions" />
    </div>
  </div>


      
  </main>
</template>

<script setup>
import { ClipboardDocumentListIcon } from "@heroicons/vue/24/outline";
import CardStat from "./CardStat.vue";
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'primevue/chart';

const kpis = ref([]);
const chartData = ref(null);
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const fetchKPIs = async () => {
  try {
    const token = localStorage.getItem('token'); 

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const clientsResponse = await axios.get('http://localhost:4000/users', config);
    const productsResponse = await axios.get('http://localhost:4000/products', config);
    const ordersResponse = await axios.get('http://localhost:4000/orders', config);

    kpis.value = [
      {
        title: 'Nombre de Clients',
        value: clientsResponse.data.length,
        description: 'Total des clients enregistrés sur la plateforme.',
      },
      {
        title: 'Produits Disponibles',
        value: productsResponse.data.length,
        description: 'Nombre total de produits disponibles à la vente.',
      },
      {
        title: 'Commandes Quotidiennes',
        value: ordersResponse.data.length,
        description: 'Nombre moyen de commandes passées chaque jour.',
      },
    ];

    chartData.value = {
      labels: ordersResponse.data.map(order => new Date(order.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Nombre de Commandes',
          data: ordersResponse.data.map(order => order.total || 0),
          borderColor: '#42A5F5',
          fill: false,
        },
        {
          label: 'Nombre de Clients',
          data: clientsResponse.data.map(client => client.id),
          borderColor: '#66BB6A',
          fill: false,
        },
      ],
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des KPIs:', error);
  }
};

onMounted(fetchKPIs);
</script>

