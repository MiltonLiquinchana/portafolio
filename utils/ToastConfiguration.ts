import { Bounce } from "react-toastify";

/**
 * Interface para la configuración de notificaciones Toast (React Toastify)
 */
interface ToastConfigurationType {
    position?:
        | "bottom-right"
        | "top-right"
        | "top-center"
        | "top-left"
        | "bottom-center"
        | "bottom-left";
    autoClose?: number | false;
    hideProgressBar?: boolean;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean | "mouse" | "touch";
    progress?: number;
    theme?: "light" | "dark" | "colored";
    transition?: typeof Bounce;
}

/** Configuración por defecto para las notificaciones */
const DEFAULT_TOAST_CONFIG: ToastConfigurationType = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
};

/** Configuración para notificaciones de éxito */
export const SUCCESS_TOAST_CONFIG: ToastConfigurationType = {
    ...DEFAULT_TOAST_CONFIG,
    theme: "light",
};

/** Configuración para notificaciones de advertencia */
export const WARNING_TOAST_CONFIG: ToastConfigurationType = {
    ...DEFAULT_TOAST_CONFIG,
    theme: "light",
};

/** Configuración para notificaciones de error */
export const ERROR_TOAST_CONFIG: ToastConfigurationType = {
    ...DEFAULT_TOAST_CONFIG,
    theme: "colored",
};
