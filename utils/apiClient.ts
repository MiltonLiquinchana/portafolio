import axios from "axios";
import { handleAxiosError } from "./HandleAxiosError";

/**
 * Cliente HTTP base configurado con Axios para la aplicación.
 * 
 * Centraliza la URL base de peticiones e integra interceptores para:
 * 1. Inyección dinámica del token JWT de Clerk en la cabecera `Authorization`.
 * 2. Captura y normalización automática de errores HTTP mediante `handleAxiosError`.
 * 
 * // WHY: Evita la repetición de lógica de autenticación y manejo de errores en cada repositorio de datos.
 * 
 * @layer Utils
 */
const apiClient = axios.create({
  // NOTE: Se usa URL relativa para que /api/* resuelva al mismo servidor Next.js,
  // tanto en desarrollo local como en producción. NEXT_PUBLIC_API_URL permite
  // apuntar a un backend externo si fuera necesario en el futuro.
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
});

/**
 * Referencia interna al getter asíncrono del token de Clerk.
 * 
 * // WHY: `useAuth()` solo se puede ejecutar en componentes cliente React. Guardar el getter aquí
 * permite al interceptor de Axios invocarlo al realizar cada petición HTTP en módulos TypeScript puros.
 */
let clerkGetToken: (() => Promise<string | null>) | null = null;

/**
 * Registra el método `getToken` de Clerk en la instancia del cliente Axios.
 * Debe ejecutarse en componentes cliente que utilicen `<ClerkProvider>`.
 *
 * @param getToken - Función asíncrona obtenida desde el hook `useAuth()` de Clerk.
 */
export function setupClerkTokenInjection(
  getToken: () => Promise<string | null>
): void {
  clerkGetToken = getToken;
}

// Interceptor de petición: inyecta el token de Clerk en cada request saliente
apiClient.interceptors.request.use(
  async (config) => {
    try {
      if (clerkGetToken) {
        const token = await clerkGetToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(token) //En el futuro eliminar esta linea
        }
      }
    } catch (error) {
      console.error("Error al inyectar token de Clerk:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Configuración de interceptores de respuesta
apiClient.interceptors.response.use(
  // Interceptor para respuestas exitosas - las pasa sin modificar
  (response) => response,

  // Interceptor para errores - maneja automáticamente todos los errores HTTP
  (error) => {
    // Log básico del error para debugging
    console.log("ocurrió un problema: " + error);

    // Extrae el contexto de la configuración de la petición o usa uno por defecto
    const context = error.config?.context ?? "default context";

    // Delega el manejo del error a la función especializada
    handleAxiosError({ error, context });

    // Retorna una respuesta fallback para evitar crashes por undefined en response.data
    return Promise.resolve({ data: { success: false } });
  }
);

export default apiClient;

