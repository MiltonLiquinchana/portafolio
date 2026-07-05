# Arquitectura (Aqua San Isidro)

- **Clean Architecture**: `UI -> Controller -> Service -> Repository -> API`.
  - Prohibido saltar capas (UI nunca llama a Repository/API).
  - Los Controllers exponen un `onError` inyectado por la UI en su constructor para el `ExceptionHandler`.
- **Estructura Estricta de UI**: TODO el código visual (componentes, layouts, vistas) y hooks DEBE estar contenido dentro de `app/ui/`.
  - **PROHIBIDO** crear carpetas genéricas como `components/`, `hooks/` o `styles/` en la raíz del proyecto o dentro de `src/`.
- **Modelos**: Uso estricto de `domains/models`, `domains/request` y `domains/responses`. Prohibido usar `any`.
- **Next.js**: Server Components por defecto en `app/`. Usar `"use client"` solo en hojas (leaf) que requieran estado, efectos o interactividad.
- **Estado**: Preferir estado local en componentes usando Controllers. Redux (`store.ts`) reservado para flujos globales complejos multi-paso.
- **Estética & Motion (Framer)**: Customizar componentes. Usar design tokens de Tailwind. Requerido: `staggered reveals`, transiciones, `backdrop-blur`, sombras complejas. Cumplir WCAG 2.1 (AA).
- **SCSS y Estilos**:
  - TODOS los archivos fuente de estilos (`.scss` / `.sass`) DEBEN crearse estrictamente dentro de `app/ui/sass/`. 
  - Los parciales `_Nombre.scss` se importan en `Global.scss`.
  - El archivo `app/ui/css/Global.css` es autogenerado (los compilados van en `app/ui/css/`).
  - **PROHIBIDO** editar `.css` directamente o crear archivos `.css` / `.scss` sueltos en otras carpetas.
- **Calidad (SonarQube)**: Cobertura > 80%, Complejidad Ciclomática <= 10. Prohibido duplicar código (usar hooks/servicios comunes). Pruebas unitarias antes del push.

