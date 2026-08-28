/**
 * Modelo de dominio para los datos del formulario de contacto.
 * 
 * Utilizado por la capa UI y los controladores para transferir la información ingresada por el usuario.
 * 
 * // WHY: Define el contrato de los datos de entrada limpios requeridos desde el formulario antes de enviarse a la capa de servicio.
 * 
 * @interface ContactModel
 * @layer Domain
 */
export interface ContactModel {
    /** Nombre completo del remitente. */
    name: string;
    /** Dirección de correo electrónico de contacto. */
    email: string;
    /** Contenido descriptivo del mensaje enviado. */
    message: string;
}

