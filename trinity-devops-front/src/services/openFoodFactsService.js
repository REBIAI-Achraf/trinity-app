import axios from 'axios';

const api = axios.create({
  baseURL: 'https://world.openfoodfacts.org',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchProductsByName = async (productName) => {
  try {
    const response = await api.get(`/cgi/search.pl`, {
      params: {
        search_terms: productName,
        search_simple: 1,
        action: 'process',
        json: 1,
        page_size: 20,
      },
    });
    return response.data.products.map(product => ({
        ...product,
        price: Math.random() * 100,
    }));
  } catch (error) {
    console.error('Error fetching products from Open Food Facts:', error);
    return [];
  }
};
