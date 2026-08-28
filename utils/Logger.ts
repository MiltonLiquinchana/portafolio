/**
 * Define los niveles de log soportados por el sistema de auditoría.
 */
type LogLevel = "INFO" | "DEBUG" | "ERROR";

/**
 * Servicio utilitario para el registro de logs formateados y etiquetados en consola.
 * 
 * Permite trazabilidad estandarizada agregando marcas de tiempo ISO a todas las llamadas.
 * 
 * // WHY: Garantiza un formato homogéneo de logs en controladores, servicios y repositorios sin depender directamente de console.log dispersos.
 * 
 * @class Logger
 * @layer Utils
 */
export class Logger {

    /**
     * Da formato al mensaje agregando timestamp e indicador de nivel.
     *
     * @param level - Nivel del log (INFO, DEBUG, ERROR).
     * @param message - Contenido descriptivo.
     * @returns String estandarizado.
     */
    private formatMessage(level: LogLevel, message: string) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }

    /**
     * Registra eventos informativos del ciclo de vida o ejecución normal.
     *
     * @param log Objeto con la propiedad `message`.
     */
    info(log: { message: string }) {
        console.info(this.formatMessage("INFO", log.message));
    }

    /**
     * Registra mensajes de depuración detallados con payload de datos opcional.
     *
     * @param log Objeto con el mensaje y datos arbitrarios para inspección.
     */
    debug(log: { message: string; data?: unknown }) {
        console.debug(this.formatMessage("DEBUG", log.message));
        if (log.data) console.debug(log.data);
    }

    /**
     * Registra excepciones y errores producidos en tiempo de ejecución.
     *
     * @param log Objeto con el mensaje de falla y el objeto de error opcional.
     */
    error(log: { message: string; error?: unknown }) {
        console.error(this.formatMessage("ERROR", log.message));
        if (log.error) console.error(log.error);
    }
}