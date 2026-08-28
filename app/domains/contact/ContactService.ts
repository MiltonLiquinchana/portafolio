/**
 * @file ContactService.ts
 * @description Servicio de dominio que encapsula la lógica para interactuar con proveedores de correo.
 * Forma parte de la capa "Service" dentro de Clean Architecture.
 */
import { Resend } from 'resend';

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

/**
 * @class ContactService
 * @description Encargado de enviar los correos de la plataforma utilizando la API de Resend.
 * 
 * WHY: Aislar esta lógica asegura que si el proveedor cambia en el futuro (ej. a SendGrid o Nodemailer),
 * solo este archivo debe cambiar, manteniendo intacta la lógica del controlador (route.ts).
 */
export class ContactService {
  private static readonly resend = new Resend(process.env.RESEND_API_KEY);

  /**
   * Envia un correo de contacto usando Resend.
   * @param {ContactData} data - Objeto con los datos enviados por el usuario.
   * @returns {Promise<any>} Promesa que resuelve a los datos de confirmación de envío.
   * @throws {Error} Error si fallan los parámetros obligatorios o si falla la API de Resend.
   */
  public static async sendMessage(data: ContactData) {
    try {
      const { name, email, message } = data;

      if (!name || !email || !message) {
        throw new Error('Missing required fields');
      }

      // Envia correo a ti mismo con los datos del usuario.
      // Ya que no tienes dominio verificado, el from DEBE ser onboarding@resend.dev
      const result = await this.resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'liquinchana@hotmail.es',
        subject: `Nuevo mensaje de ${name} desde tu Portafolio`,
        replyTo: email,
        html: `
          <h3>Nuevo mensaje de contacto</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replaceAll('\n', '<br/>')}</p>
        `,
      });

      if (result.error) {
        console.error('Error from Resend:', result.error);
        throw new Error(result.error.message);
      }

      return result.data;
    } catch (error) {
      console.error('ContactService error:', error);
      throw error;
    }
  }
}
