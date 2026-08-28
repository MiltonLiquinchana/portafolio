import { NextResponse } from "next/server";
import { Resend } from "resend";

// NOTE: Instancia del cliente de Resend. Requiere RESEND_API_KEY en variables de entorno (.env.local).
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Endpoint de la API para procesar envíos del formulario de contacto.
 * 
 * Se ejecuta exclusivamente en el entorno Node.js del servidor (Next.js Serverless Function),
 * protegiendo las credenciales `RESEND_API_KEY` frente al cliente navegador.
 * 
 * // WHY: Evita la exposición de claves API privadas de proveedores de e-mail y sanitiza la entrada HTML.
 * 
 * @param request Objeto Request con el JSON body ({ name, email, message }).
 * @returns Response JSON con estado de éxito o mensaje de error.
 * @layer API Route / Infrastructure
 */
export async function POST(request: Request) {
    try {
        // Parsea el cuerpo JSON de la petición entrante desde el cliente
        const body = await request.json();
        const { name, email, message } = body;

        // Validaciones estrictas de campos obligatorios en el servidor
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: "Faltan campos requeridos." },
                { status: 400 }
            );
        }

        // NOTE: "onboarding@resend.dev" es el remitente de prueba por defecto de Resend.
        // replyTo asegura que responder directamente al correo envíe la respuesta al remitente real.
        const result = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "liquinchana@hotmail.es",
            subject: `Nuevo mensaje de ${name} desde tu Portafolio`,
            replyTo: email,
            // HTML estructurado sanitizando cada campo con escapeHtml para prevenir inyección de código
            html: `<h3>Nuevo mensaje de contacto</h3><p><strong>Nombre:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Mensaje:</strong></p><p>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>`,
        });

        // Si el SDK de Resend retorna un error (ej. API Key inválida o límite de correos excedido)
        if (result.error) {
            return NextResponse.json(
                { success: false, message: result.error.message },
                { status: 400 }
            );
        }

        // Respuesta exitosa enviando el ID de seguimiento generado por Resend
        return NextResponse.json({ success: true, data: { id: result.data?.id } });
    } catch (error: unknown) {
        // Manejo de errores no controlados (fallo de red o parsing JSON malformado)
        const errorMessage = error instanceof Error ? error.message : "Error interno del servidor.";
        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: 500 }
        );
    }
}

/**
 * Escapa caracteres HTML especiales para mitigar ataques XSS en plantillas de correo.
 * 
 * @param value Cadena de texto de entrada a sanitizar.
 * @returns Cadena sanitizada con entidades HTML escapadas.
 */
function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
        };
        return entities[character];
    });
}

