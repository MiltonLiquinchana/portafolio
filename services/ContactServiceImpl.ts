import { Logger } from "@/utils/Logger";
import { ContactService } from "./ContactService";
import { ContactModel } from "@/domains/models/ContactModel";
import { SendContactRequest } from "@/domains/request/SendContactRequest";
import { SendContactResponse } from "@/domains/responses/SendContactResponse";
import { ResendContactRepository } from "@/repository/ResendContactRepository";
import { ResendContactRepositoryImpl } from "@/repository/ResendContactRepositoryImpl";

import { toast } from "react-toastify";
import { ERROR_TOAST_CONFIG } from "@/utils/ToastConfiguration";

/**
 * Implementación de la capa de servicio para la gestión de mensajes de contacto.
 * 
 * Se encarga de la validación de campos obligatorios, la conversión entre el modelo de dominio UI (`ContactModel`)
 * y el DTO de infraestructura (`SendContactRequest`), delegando la persistencia/envío a `ResendContactRepository`.
 * 
 * // WHY: Desacopla la vista de los detalles del contrato REST y encapsula la validación de negocio y manejo de toasts.
 * 
 * @class ContactServiceImpl
 * @implements {ContactService}
 * @layer Service
 */
export class ContactServiceImpl implements ContactService {
    /**
     * Repositorio encagado de comunicarse con la API REST interna o servicio externo de correo.
     */
    private readonly contactRepository: ResendContactRepository = new ResendContactRepositoryImpl();

    /**
     * Logger para trazabilidad de la ejecución del servicio.
     */
    private readonly logger: Logger = new Logger();

    /**
     * Procesa la solicitud de envío de mensaje validando los campos y llamando al repositorio.
     * 
     * @param model - Modelo de datos de contacto recibido del controlador.
     * @returns Promesa que resuelve con la respuesta del envío (`SendContactResponse`).
     */
    async sendMessage(model: ContactModel): Promise<SendContactResponse> {
        //Logger de información para saber que función se esta ejecutando
        this.logger.info({ message: "ContactServiceImpl sendMessage" });

        //Logger para debug del modelo recibido
        this.logger.debug({
            message: "sendMessage modelo recibido",
            data: JSON.stringify(model),
        });

        // Construye el request normalizando los campos del modelo
        const request = SendContactRequest.formModelToRequest(model);

        if (!request.name || !request.email || !request.message) {
            this.logger.error({ message: "Faltan campos requeridos" });
        }

        // Obtiene datos del repositorio
        const response: SendContactResponse = await this.contactRepository.sendMessage(request);

        this.logger.debug({
            message: "sendMessage response data",
            data: JSON.stringify(response),
        });

        return response;
    }
}

