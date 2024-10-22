import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const ProductService = {
  // Obtener todas las películas y series
  getProducts() {
    return axios.get(API_URL);
  },
  
  // Agregar una nueva película o serie
  addMovie(movie) {
    return axios.post(API_URL, movie);
  },
  
  // Actualizar una película o serie
  updateMovie(id, updatedMovie) {
    return axios.put(`${API_URL}/${id}`, updatedMovie);
  },
  
  // Eliminar una película o serie
  deleteMovie(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
