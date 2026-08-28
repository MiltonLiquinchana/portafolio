/**
 * Clase personalizada para manejo de errores extendida de la clase Error nativa
 * Proporciona información adicional como código de error, mensaje del sistema y contexto
 */
export class CustomError extends Error {
  // Código único que identifica el tipo de error
  public errorCode: string;
  // Mensaje técnico del sistema para logs y debugging
  public systemMessage: string;
  // Contexto donde ocurrió el error (función, módulo, etc.)
  public context: string;

  /**
   * Constructor de la clase CustomError
   * @param message - Mensaje de error amigable para el usuario
   * @param errorCode - Código único del error (ej: "ERROR_404")
   * @param systemMessage - Mensaje técnico del sistema
   * @param context - Contexto donde ocurrió el error
   */
  constructor({
    message,
    errorCode,
    systemMessage,
    context,
  }: {
    message: string;
    errorCode: string;
    systemMessage: string;
    context: string;
  }) {
    // Llama al constructor de la clase Error padre
    super(message);

    // Establece el nombre de la clase para identificación
    this.name = "CustomError";

    // Asigna las propiedades personalizadas
    this.errorCode = errorCode;
    this.systemMessage = systemMessage;
    this.context = context;

    // Captura el stack trace si está disponible (Node.js)
    // El '?.' es optional chaining por si no existe la función
    Error.captureStackTrace?.(this, CustomError);
  }
}
