/**
 * DTO de respuesta estandarizada para la operación de envío de contacto.
 * 
 * Es compartida a través de todas las capas (API Route → Repository → Service → Controller → UI).
 * 
 * // WHY: Garantiza una respuesta uniforme (exito/error y metadata) sin importar el proveedor de correo subyacente.
 * 
 * @interface SendContactResponse
 * @layer Domain
 */
export interface SendContactResponse {
    /** Flag booleano que indica si el correo fue procesado y enviado con éxito. */
    success: boolean;
    /** Metadata adicional opcional devuelta por el servidor (ej. ID de mensaje en Resend). */
    data?: {
        id?: string;
    };
    /** Detalle o mensaje de error descriptivo en caso de fallo. */
    error?: string;
}

