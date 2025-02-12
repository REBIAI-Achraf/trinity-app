import { createRouter, createWebHistory } from 'vue-router';

// Pages principales
import HomePage from "../pages/HomePage.vue";
import SigninPage from "../pages/SigninPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import ProductPage from '../pages/ProductPage.vue';
import ProductsPage from '../pages/ProductsPage.vue';
import OrdersPage from '../pages/OrdersPage.vue';

// Dashboard 
import Layout from '../components/Dashboard/LayoutComponent.vue'; 
import HomeComponent from '../components/Dashboard/HomeComponent.vue'; 
import UsersComponent from '../components/Users/UsersComponent.vue'; 
import ProductsComponent from '../components/Products/ProductsComponent.vue';
import OpenFoodFactProducts from '../components/Products/OpenFoodFactProducts.vue';
import OrdersComponent from '../components/Orders/OrdersComponent.vue';
import PaymentsComponent from '../components/Payments/PaymentsComponent.vue';

// Page d'erreur
import ErrorPage from '../pages/ErrorPage.vue';

export const routes = [
    // Pages principales
    { path: '/', component: HomePage },
    { path: '/Signin', component: SigninPage },
    { path: '/Login', component: LoginPage },
    { path: '/product/:id', component: ProductPage, meta: { requiresAuth: true } },
    { path: '/produits', component: ProductsPage, meta: { requiresAuth: true } }, 
    { path: '/orders', component: OrdersPage, meta: { requiresAuth: true } }, 

    // Dashboard 
    { 
        path: '/dashboard',
        component: Layout, 
        meta: { requiresAuth: true }, 
        children: [
            { path: '', name: 'home', component: HomeComponent },
            { path: 'user', name: 'user', component: UsersComponent },
            { path: 'products', name: 'products', component: ProductsComponent },
            { path: 'products/openfoodfacts', name: 'openfoodfacts products', component: OpenFoodFactProducts },
            { path: 'orders', name: 'orders', component: OrdersComponent },
            { path: 'payments', name: 'payments', component: PaymentsComponent },
        ]
    },

    { path: '/:catchAll(.*)', component: ErrorPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      next('/Login');
  } else if (to.matched.some(record => record.meta.requiresAdmin) && userRole !== 'admin') {
      next('/'); 
  } else {
      next();
  }
});


export default router;
