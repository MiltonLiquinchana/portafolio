import { AxiosError } from "axios";
import { CustomError } from "../CustomError";
import SystemMessageConstructor from "@/utils/SystemMessageConstructor";

/**
 * Clase específica para errores 409 (Conflict)
 * Extiende CustomError con configuración predefinida para errores de recurso no encontrado
 */
export class CustomConflictError extends CustomError {
  /**
   * Constructor para errores 409
   * @param message - Mensaje amigable para el usuario
   * @param error - Error original de Axios
   * @param context - Contexto donde ocurrió el error
   */
  constructor(message: string, error: AxiosError, context: string) {
    // Llama al constructor padre con configuración específica para 409
    super({
      message, // Mensaje del usuario
      errorCode: "ERROR_409", // Código fijo para errores 409
      systemMessage: SystemMessageConstructor(error), // Construye mensaje técnico
      context, // Contexto proporcionado
    });

    // Sobrescribe el nombre para identificación específica
    this.name = "CustomConflictError";
  }
}
