import { ContactModel } from "@/domains/models/ContactModel";
import { SendContactResponse } from "@/domains/responses/SendContactResponse";

/**
 * Contrato público para el controlador del formulario de contacto.
 * 
 * // WHY: Permite desacoplar los componentes UI de la implementación concreta del controlador,
 * facilitando pruebas unitarias y el cumplimiento del principio de inversión de dependencias (DIP).
 * 
 * @interface ContactControllerInterface
 * @layer Controller
 */
export interface ContactControllerInterface {
    /**
     * Procesa el envío de un mensaje de contacto generado desde la interfaz de usuario.
     * 
     * @param model Modelo que encapsula la información ingresada por el usuario en el formulario.
     * @returns Promesa que resuelve a la respuesta de envío SendContactResponse.
     */
    sendMessage(model: ContactModel): Promise<SendContactResponse>;
}

