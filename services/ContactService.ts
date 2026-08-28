import { ContactModel } from "@/domains/models/ContactModel";
import { SendContactResponse } from "@/domains/responses/SendContactResponse";

/**
 * Contrato público para la capa de servicio de contacto.
 * 
 * Defines las operaciones de lógica de negocio relacionadas con la recepción y procesamiento de mensajes de contacto.
 * 
 * // WHY: Permite reemplazar la lógica del servicio o realizar mocking en pruebas unitarias del controlador.
 * 
 * @interface ContactService
 * @layer Service
 */
export interface ContactService {
    /**
     * Procesa la lógica de negocio para validar y preparar la solicitud de envío de mensaje.
     * 
     * @param model Modelo de contacto proveniente de la capa superior.
     * @returns Promesa que resuelve a la respuesta de envío de mensaje.
     */
    sendMessage(model: ContactModel): Promise<SendContactResponse>;
}

