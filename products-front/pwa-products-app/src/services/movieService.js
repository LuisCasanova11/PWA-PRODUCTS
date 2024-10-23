import axios from 'axios';
import { openDB } from 'idb';

const API_URL = 'https://localhost:5000/api/products';

export const ProductService = {
  // Obtener todas las películas y series
  getProducts() {
    return axios.get(API_URL);
  },
  
  // Actualizar una película o serie
  updateMovie(id, updatedMovie) {
    return axios.put(`${API_URL}/${id}`, updatedMovie);
  },
  
  // Eliminar una película o serie
  deleteMovie(id) {
    return axios.delete(`${API_URL}/${id}`);
  },

  async addMovie(movie) {
    if (navigator.onLine) {
      return axios.post(API_URL, movie);
    } else {
      await saveProductOffline(movie);
      await registerSync();
      return Promise.resolve({ message: 'Producto guardado offline' });
    }
  }
};

async function saveProductOffline(product) {
  const db = await openDB('offline-store', 1, {
    upgrade(db) {
      db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
    },
  });
  await db.put('products', product);
}

async function registerSync() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const registration = await navigator.serviceWorker.ready;
    try {
      await registration.sync.register('sync-products');
    } catch (err) {
      console.error('Error al registrar la sincronización:', err);
    }
  }
}
