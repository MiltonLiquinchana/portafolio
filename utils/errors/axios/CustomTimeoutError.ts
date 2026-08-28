import { AxiosError } from "axios";
import SystemMessageConstructor from "@/utils/SystemMessageConstructor";
import { CustomError } from "../CustomError";

/**
 * Clase específica para errores 408 (Request Timeout)
 * Extiende CustomError con configuración predefinida para errores de timeout
 */
export class CustomTimeoutError extends CustomError {
  /**
   * Constructor para errores de timeout
   * @param message - Mensaje amigable para el usuario
   * @param error - Error original de Axios
   * @param context - Contexto donde ocurrió el error
   */
  constructor(message: string, error: AxiosError, context: string) {
    // Llama al constructor padre con configuración específica para timeout
    super({
      message, // Mensaje del usuario
      errorCode: "ERROR_408", // Código fijo para errores de timeout
      systemMessage: SystemMessageConstructor(error), // Construye mensaje técnico
      context, // Contexto proporcionado
    });
    
    // Sobrescribe el nombre para identificación específica
    this.name = "TimeoutError";
  }
}