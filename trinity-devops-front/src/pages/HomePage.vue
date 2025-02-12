<template>
  <div>
    <Banner />
    <Navbar />
    <Hero />
      <Products />
    <section id="services">
      <Services />
    </section>
    <section id="apropos">
      <About />
    </section>
    <section id="contacter">
      <Contact />
    </section>
    <Footer />
  </div>

</template>

<script setup>
import Banner from '../components/HomeComponents/BannerComponent.vue'
import Navbar from '../components/HomeComponents/NavbarComponent.vue'
import Hero from '../components/HomeComponents/HeroComponent.vue'
import Products from '../components/HomeComponents/ProductsComponent.vue'
import About from '../components/HomeComponents/AboutComponent.vue'
import Services from '../components/HomeComponents/ServicesComponent.vue'
import Contact from'../components/HomeComponents/ContactComponent.vue'
import Footer from'../components/HomeComponents/FooterComponent.vue'



</script>
