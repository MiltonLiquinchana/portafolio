import { AxiosError } from "axios";
import { CustomNotFoundError } from "./errors/axios/CustomNotFoundError";
import { CustomTimeoutError } from "./errors/axios/CustomTimeoutError";
import { ExceptionHandler } from "./ExceptionHandler";
import { CustomConflictError } from "./errors/axios/CustomConflictError";
import { CustomGenericError } from "./errors/axios/CustomGenericError";

// Interface para definir los parámetros de la función
interface HandleAxiosErrorProps {
  error: unknown; // Error desconocido que puede venir de Axios
  context: string; // Contexto donde ocurrió el error
}

/**
 * Función para manejar errores específicos de Axios
 * Convierte errores de Axios en errores personalizados según el código de estado HTTP.
 * 
 * // WHY: Transforma respuestas HTTP fallidas en excepciones de dominio tipadas (CustomError)
 * // para normalizar la estructura del mensaje y delegarlo al ExceptionHandler de la UI.
 * 
 * @param error - Error original proveniente de la llamada HTTP
 * @param context - Nombre del contexto/controlador origen
 */
export function handleAxiosError({ error, context }: HandleAxiosErrorProps) {
  // Verifica si el error es un error de Axios mediante type guards
  if (
    error &&
    typeof error === "object" &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError
  ) {
    // Cast seguro a AxiosError después de la verificación
    const axiosError = error as AxiosError;

    // Manejo específico para timeout del cliente (solicitud abortada por la red)
    if (axiosError.code === "ECONNABORTED") {
      throw new CustomTimeoutError(
        "La solicitud tardó demasiado. Intenta nuevamente.",
        axiosError,
        context
      );
    }

    // NOTE: Si no hay respuesta HTTP (ej. falla total de conexión o CORS), no hay status que evaluar
    if (!axiosError.response) {
      return;
    }
    const status = axiosError.response.status;
    const { message } = (axiosError.response.data ?? {}) as { message?: string };
    
    // Obtiene el mensaje personalizado enviado por la API o usa el fallback estándar
    const userMessage = message ?? "Ha ocurrido un error";

    try {
      // Switch para mapear códigos de estado HTTP a subclases especializadas de CustomError
      switch (status) {
        case 404:
          // Recurso o ruta API no encontrada
          throw new CustomNotFoundError(userMessage, axiosError, context);

        case 408:
          // Timeout del servidor HTTP
          throw new CustomTimeoutError(userMessage, axiosError, context);
        case 409:
          // Conflicto de datos en el servidor
          throw new CustomConflictError(userMessage, axiosError, context);
        default:
          // Error genérico para otros códigos de estado (incluyendo 500 Internal Server Error)
          throw new CustomGenericError("Ocurrio un error inesperado", status, axiosError, context);
      }
    } catch (error) {
      // Delegates el error tipado al ExceptionHandler centralizado para notificar a la UI
      ExceptionHandler.handle({ error, context });
    }
  }
}
