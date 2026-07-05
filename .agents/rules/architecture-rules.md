# Arquitectura (Aqua San Isidro)

- **Clean Architecture**: `UI -> Controller -> Service -> Repository -> API`.
  - Prohibido saltar capas (UI nunca llama a Repository/API).
  - Los Controllers exponen un `onError` inyectado por la UI en su constructor para el `ExceptionHandler`.
- **Modelos**: Uso estricto de `domains/models`, `domains/request` y `domains/responses`. Prohibido usar `any`.
- **Next.js**: Server Components por defecto en `app/`. Usar `"use client"` solo en hojas (leaf) que requieran estado, efectos o interactividad.
- **Estado**: Preferir estado local en componentes usando Controllers. Redux (`store.ts`) reservado para flujos globales complejos multi-paso.
- **Estética & Motion (Framer)**: Customizar componentes. Usar design tokens de Tailwind. Requerido: `staggered reveals`, transiciones, `backdrop-blur`, sombras complejas. Cumplir WCAG 2.1 (AA).
- **SCSS**: `app/ui/css/Global.css` es autogenerado. Editar o crear parciales `_Nombre.scss` en `app/ui/sass/` e importarlos en `Global.scss`. Prohibido editar `.css` directamente.
- **Calidad (SonarQube)**: Cobertura > 80%, Complejidad Ciclomática <= 10. Prohibido duplicar código (usar hooks/servicios comunes). Pruebas unitarias antes del push.
