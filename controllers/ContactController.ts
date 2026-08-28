import { ContactControllerInterface } from "./ContactControllerInterface";
import { Logger } from "@/utils/Logger";
import { ContactService } from "@/services/ContactService";
import { ContactServiceImpl } from "@/services/ContactServiceImpl";
import { ExceptionHandler } from "@/utils/ExceptionHandler";
import { CONTROLLER_CONTEXTS } from "@/utils/constant/ControllerContexts";
import { ContactModel } from "@/domains/models/ContactModel";
import { SendContactResponse } from "@/domains/responses/SendContactResponse";
/**
 * Controlador para la gestión del formulario de contacto.
 * 
 * Implementa ContactControllerInterface. Orquesta el flujo entre la vista de React (ContactSection)
 * y el servicio de negocio (ContactServiceImpl), registrando además callbacks de errores centralizados.
 * 
 * // WHY: Se utiliza el patrón Controller para evitar que la UI realice llamadas directas a APIs o servicios,
 * centralizando la suscripción a ExceptionHandler para manejar fallos HTTP/Axios sin duplicar lógica en componentes.
 * 
 * @class ContactController
 * @implements {ContactControllerInterface}
 * @layer Controller
 */
export class ContactController implements ContactControllerInterface {

    /**
     * Logger dedicado para trazas de auditoría y depuración en el controlador.
     */
    private readonly logger = new Logger();

    /**
     * Instancia del servicio de contacto que procesa la lógica de negocio.
     * // WHY: Se inicializa la implementación concreta por defecto resguardando la interfaz ContactService.
     */
    private readonly service: ContactService = new ContactServiceImpl();

    /**
     * Inicializa el controlador y registra la función de manejo de errores en el contexto global ExceptionHandler.
     * 
     * @param onError - Función callback de la UI para notificar estados de error al usuario.
     */
    constructor(onError: (errorMessage: string) => void) {
        // Configura la función de actualización de estado en el manejador de excepciones
        ExceptionHandler.defineOnErrorDetect(
            CONTROLLER_CONTEXTS.CONTACT_CONTROLLER,
            onError
        );

        // Log de inicialización
        this.logger.info({
            message: "se creo la instancia para el controlador ContactController",
        });
    }

    /**
     * Transmite el modelo de datos de contacto hacia el servicio de negocio.
     * 
     * @param model - Objeto ContactModel con los datos del formulario ingresados por el usuario.
     * @returns Promesa que resuelve a SendContactResponse con el resultado del envío.
     */
    async sendMessage(model: ContactModel): Promise<SendContactResponse> {
        this.logger.info({
            message: `${CONTROLLER_CONTEXTS.CONTACT_CONTROLLER} sendMessage`,
        });

        const response: SendContactResponse = await this.service.sendMessage(model);

        this.logger.debug({
            message: "sendMessage response",
            data: JSON.stringify(response),
        });
        return response;
    }
}

