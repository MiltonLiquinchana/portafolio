/**
 * @file route.ts
 * @description Controlador de API para procesar envíos de formulario de contacto.
 * Forma parte de la capa "Controller" dentro de Clean Architecture.
 */
import { NextResponse } from 'next/server';
import { ContactService, ContactData } from '@/app/domains/contact/ContactService';

/**
 * @function POST
 * @description Recibe la solicitud HTTP del formulario de contacto y orquesta el envío del email a través del ContactService.
 * @param {Request} request - El objeto Request de Next.js
 * @returns {Promise<NextResponse>} Respuesta JSON con el estado de la operación (éxito o error HTTP).
 * 
 * WHY: Este controlador valida y transforma los datos básicos para enviarlos a la capa de servicio (Service Layer),
 * evitando mezclar la lógica de red (HTTP/Next.js) con la lógica de negocio (Resend).
 */
export async function POST(request: Request) {
  try {
    const body: ContactData = await request.json();
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos.' },
        { status: 400 }
      );
    }

    const data = await ContactService.sendMessage(body);
    
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error('API Contact Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error enviando el mensaje.';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
