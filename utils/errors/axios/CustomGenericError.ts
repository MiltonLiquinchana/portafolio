import { AxiosError } from "axios";
import { CustomError } from "../CustomError";
import SystemMessageConstructor from "@/utils/SystemMessageConstructor";

/**
 * Clase genérica para errores no mapeados explícitamente (como 500 Internal Server Error)
 * Extiende CustomError para que el ExceptionHandler lo procese correctamente.
 */
export class CustomGenericError extends CustomError {
  /**
   * Constructor para errores genéricos
   * @param message - Mensaje amigable para el usuario
   * @param status - Código de estado HTTP
   * @param error - Error original de Axios
   * @param context - Contexto donde ocurrió el error
   */
  constructor(message: string, status: number, error: AxiosError, context: string) {
    // Llama al constructor padre con configuración genérica
    super({
      message, // Mensaje del usuario
      errorCode: `ERROR_${status}`, // Código dinámico según el status (ej: "ERROR_500")
      systemMessage: SystemMessageConstructor(error), // Construye mensaje técnico
      context, // Contexto proporcionado
    });

    // Sobrescribe el nombre para identificación específica
    this.name = "CustomGenericError";
  }
}
