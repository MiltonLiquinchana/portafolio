import apiClient from "@/utils/apiClient";
import { CONTROLLER_CONTEXTS } from "@/utils/constant/ControllerContexts";
import { SendContactRequest } from "@/domains/request/SendContactRequest";
import { SendContactResponse } from "@/domains/responses/SendContactResponse";
import { ResendContactRepository } from "./ResendContactRepository";
import { Logger } from "@/utils/Logger";
import { AxiosRequestConfig } from "axios";

/**
 * Extensión del tipo AxiosRequestConfig para inyectar un contexto de ejecución en la petición.
 * 
 * // WHY: Permite a ExceptionHandler e interceptores identificar la clase/componente origen del fallo.
 */
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    context?: string;
}

/**
 * Implementación del repositorio de contacto que realiza la llamada HTTP POST a la ruta API `/api/contact`.
 * 
 * Utiliza el cliente HTTP centralizado `apiClient` configurado con interceptores de captura de errores Axios.
 * 
 * // WHY: Garantiza que cualquier fallo HTTP pase por la canalización centralizada de ExceptionHandler.
 * 
 * @class ResendContactRepositoryImpl
 * @implements {ResendContactRepository}
 * @layer Repository
 */
export class ResendContactRepositoryImpl implements ResendContactRepository {
    /**
     * Logger para registrar trazas de llamadas HTTP.
     */
    private readonly logger: Logger = new Logger();

    /**
     * Ejecuta la petición POST a `/api/contact` enviando los datos del DTO.
     * 
     * @param request Payload de contacto con formato de envío (SendContactRequest).
     * @returns Respuesta procesada por la API serverless (SendContactResponse).
     */
    async sendMessage(
        request: SendContactRequest
    ): Promise<SendContactResponse> {
        this.logger.info({ message: "ResendContactRepositoryImpl sendMessage" });

        const response = await apiClient.post<SendContactResponse>(
            "/api/contact",
            request,
            {
                context: CONTROLLER_CONTEXTS.CONTACT_CONTROLLER,
                headers: { "Content-Type": "application/json" },
            }
        ) as CustomAxiosRequestConfig;

        if (!response) {
            this.logger.debug({
                message: "ResendContactRepositoryImpl No se pudo enviar el mensaje"
            });
        }

        this.logger.info({ message: "ResendContactRepositoryImpl sendMessage - finalizado exitosamente" });
        return response.data;
    }
}

