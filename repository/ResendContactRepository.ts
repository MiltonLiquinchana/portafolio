import { SendContactRequest } from "@/domains/request/SendContactRequest";
import { SendContactResponse } from "@/domains/responses/SendContactResponse";

/**
 * Contrato público para el repositorio de comunicación de contacto vía Resend.
 * 
 * Abstrae el consumo HTTP cliente de la API REST interna o remota.
 * 
 * // WHY: Permite reemplazar el mecanismo HTTP o realizar mockeo directo de red en pruebas sin afectar la capa de servicios.
 * 
 * @interface ResendContactRepository
 * @layer Repository
 */
export interface ResendContactRepository {
    /**
     * Envía la petición HTTP con el payload de contacto hacia el backend/API serverless.
     * 
     * @param request Objeto DTO con los datos de contacto formateados para la API.
     * @returns Promesa que resuelve a la respuesta deserializada SendContactResponse.
     */
    sendMessage(request: SendContactRequest): Promise<SendContactResponse>;
}

