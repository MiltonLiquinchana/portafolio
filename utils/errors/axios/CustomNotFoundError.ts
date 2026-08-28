import { AxiosError } from "axios";
import { CustomError } from "../CustomError";
import SystemMessageConstructor from "@/utils/SystemMessageConstructor";

/**
 * Clase específica para errores 404 (Not Found)
 * Extiende CustomError con configuración predefinida para errores de recurso no encontrado
 */
export class CustomNotFoundError extends CustomError {
  /**
   * Constructor para errores 404
   * @param message - Mensaje amigable para el usuario
   * @param error - Error original de Axios
   * @param context - Contexto donde ocurrió el error
   */
  constructor(message: string, error: AxiosError, context: string) {
    // Llama al constructor padre con configuración específica para 404
    super({
      message, // Mensaje del usuario
      errorCode: "ERROR_404", // Código fijo para errores 404
      systemMessage: SystemMessageConstructor(error), // Construye mensaje técnico
      context, // Contexto proporcionado
    });
    
    // Sobrescribe el nombre para identificación específica
    this.name = "CustomNotFoundError";
  }
}