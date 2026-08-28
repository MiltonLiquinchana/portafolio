/**
 * Constantes para los contextos de manejo de errores
 * Centraliza todos los contextos disponibles para evitar errores de tipeo
 * y facilitar el mantenimiento
 */
export const CONTROLLER_CONTEXTS = {
  // Contextos de controladores
  CONTACT_CONTROLLER: "contact-controller",

} as const;

// Tipo derivado para TypeScript
export type ErrorContext = (typeof CONTROLLER_CONTEXTS)[keyof typeof CONTROLLER_CONTEXTS];