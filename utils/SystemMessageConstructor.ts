import { AxiosError } from "axios";

/**
 * Función utilitaria para construir mensajes del sistema a partir de errores de Axios
 * @param axiosError - Error de Axios del cual extraer información
 * @returns Mensaje del sistema formateado
 */
export default function SystemMessageConstructor(axiosError: AxiosError) {
  // Mensaje por defecto si no se puede construir información específica
  let systemMessage = "Recurso no encontrado.";

  // Verifica que el error de Axios exista
  if (axiosError) {
    // Extrae información de la petición HTTP
    const method = axiosError.config?.method?.toUpperCase() ?? "UNKNOWN_METHOD";
    const url = axiosError.config?.url ?? "UNKNOWN_URL";
    const status = axiosError.response?.status ?? "NO_STATUS";

    // Construye mensaje técnico con formato HTTP estándar
    systemMessage = `${method} ${url} returned ${status}`;
  }

  return systemMessage;
}
