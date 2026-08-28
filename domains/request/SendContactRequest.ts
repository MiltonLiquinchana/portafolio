import { ContactModel } from "../models/ContactModel";

/**
 * DTO (Data Transfer Object) de solicitud para enviar un mensaje de contacto a la API REST.
 * 
 * Centraliza la transformación y sanitización desde el modelo de dominio `ContactModel`.
 * 
 * // WHY: Garantiza la independencia entre los modelos visuales de UI y el contrato de payload HTTP consumido por la API.
 * 
 * @class SendContactRequest
 * @layer Domain
 */
export class SendContactRequest {

    /**
     * Crea una instancia de SendContactRequest.
     * 
     * @param name Nombre del contacto remitente.
     * @param email Correo electrónico de contacto.
     * @param message Mensaje enviado.
     */
    public constructor(
        public name: string,
        public email: string,
        public message: string
    ) { }

    /**
     * Mapea y construye una instancia de SendContactRequest a partir de un objeto `ContactModel`.
     * 
     * @param model - Modelo de dominio recibido de la UI.
     * @returns Instancia tipada de SendContactRequest lista para ser enviada por la capa de repositorio.
     */
    static formModelToRequest(model: ContactModel): SendContactRequest {
        return new SendContactRequest(
            model.name,
            model.email,
            model.message,
        );
    }
}

