import axios from "axios";

// API URL ya definida en next.config.js (con el proxy para redirigir a localhost:4000)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const authService = {
  // Registro de usuario
  register: async (data: { rucCI: string; email: string; contrasena: string }) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, data);
      console.log("Respuesta del registro:", response.data);
      return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;  // Lanza el error para manejarlo fuera del servicio
    }
  },
  // Login de usuario
  login: async (data: { email: string; contrasena: string }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      console.log("Respuesta de la API:", response);
      return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
      console.error("Error al hacer login:", error);
      throw error;  // Lanza el error para manejarlo fuera del servicio
    }
  },
};

export default authService;
