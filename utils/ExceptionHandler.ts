import { CustomError } from "./errors/CustomError";

/**
 * Propiedades requeridas para la captura y procesamiento de una excepción.
 */
interface ExceptionHandlerProps {
    /** Instancia del error capturado (AxiosError, CustomError o unknown). */
    error: unknown;
    /** Identificador del contexto del controlador o módulo donde se originó el error. */
    context: string;
}

/**
 * Mapeo interno de handlers registrados para la notificación de errores a la UI.
 */
type ErrorHandler = {
    onErrorDetect: (errorMessage: string) => void;
};

/**
 * Gestor estático de manejo centralizado de excepciones de la aplicación.
 * 
 * Permite a los controladores suscribir callbacks de error y a los interceptores/servicios delegar
 * el procesamiento de fallos HTTP y CustomError sin acoplar la UI con la infraestructura.
 * 
 * // WHY: Centraliza la transformación de errores técnicos (CustomError) en mensajes amigables para el usuario.
 * 
 * @class ExceptionHandler
 * @layer Utils
 */
export class ExceptionHandler {
    /** Registro en memoria de handlers suscritos por contexto. */
    private static handlers: Record<string, ErrorHandler> = {};

    /**
     * Registra el callback de notificación de error para un contexto específico (ej. CONTROLLER_CONTEXTS.CONTACT_CONTROLLER).
     * 
     * // WHY: Asocia cada controlador React con su propio manejador de UI (toast/modal), permitiendo que
     * // llamadas asíncronas de Axios o servicios notifiquen fallos al usuario sin conocer componentes React.
     * 
     * @param controllerContext - Identificador único del controlador origen.
     * @param onErrorDetect - Callback a ejecutar cuando se capture un error en dicho contexto.
     */
    static defineOnErrorDetect(
        controllerContext: string,
        onErrorDetect: (errorMessage: string) => void
    ) {
        // Almacena el handler en el registro global indexado por el string del contexto
        ExceptionHandler.handlers[controllerContext] = { onErrorDetect };
    }

    /**
     * Procesa una excepción capturada, enviando el mensaje amigable a la UI si existe un handler registrado.
     * 
     * // WHY: Extrae el mensaje de usuario (userMessage) si es un CustomError tipado y busca en el mapa
     * // `handlers[context]` para gatillar la función `onErrorDetect` del componente que inició la petición.
     * 
     * @param props Objeto con la instancia de error y el contexto origen.
     */
    static handle({ error, context }: ExceptionHandlerProps) {
        // NOTE: Si el error proviene de HandleAxiosError, ya es una subclase de CustomError con context tipado
        if (error instanceof CustomError) {
            // Log de advertencia para inspección en consola de desarrollador
            console.warn(`[${error.context}] ${error.name}:`, {
                code: error.errorCode,
                message: error.systemMessage,
            });

            // Si el componente suscribió un callback de error para este contexto, se notifica inmediatamente
            if (ExceptionHandler.handlers[context]) {
                ExceptionHandler.handlers[context].onErrorDetect(error.message);
            }
            return;
        }

        // Fallback: Si el error no es CustomError pero el contexto está suscrito, emite un mensaje genérico de seguridad
        if (ExceptionHandler.handlers[context]) {
            ExceptionHandler.handlers[context].onErrorDetect(
                "No se pudo completar la operación. Intenta nuevamente."
            );
        }
    }
}

