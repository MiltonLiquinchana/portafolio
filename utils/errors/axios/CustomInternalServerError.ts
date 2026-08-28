import { CustomError } from "../CustomError";
import { AxiosError } from "axios";
import SystemMessageConstructor from "@/utils/SystemMessageConstructor";

/**
 * Clase específica para errores 500 (Internal Server Error)
 * Extiende CustomError con configuración predefinida para errores del servidor
 */
export class CustomInternalServerError extends CustomError {
  /**
   * Constructor para errores 500
   * @param message - Mensaje amigable para el usuario
   * @param error - Error original de Axios
   * @param context - Contexto donde ocurrió el error
   */
  constructor(message: string, error: AxiosError, context: string) {
    // Llama al constructor padre con configuración específica para errores 500
    super({
      message, // Mensaje del usuario
      errorCode: "ERROR_500", // Código fijo para errores internos del servidor
      systemMessage: SystemMessageConstructor(error), // Construye mensaje técnico
      context, // Contexto proporcionado
    });
    
    // Sobrescribe el nombre para identificación específica
    this.name = "CustomInternalServerError";
  }
}