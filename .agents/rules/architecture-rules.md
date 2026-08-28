---
trigger: always_on
---

# Reglas de Arquitectura (Next.js / TypeScript)

Reglas obligatorias para mantener consistencia y calidad en el proyecto frontend.

## 1. Clean Architecture

- **Flujo estricto**: UI → Controller → Service → Repository → API.
- UI nunca llama a Repository ni a `apiClient` directamente.
- Controller recibe `onError` en su constructor y lo registra en `ExceptionHandler`.
- Service orquesta la lógica de negocio.
- Repository centraliza las llamadas a API usando `apiClient`.
- **Estructura de carpetas**: TODO el código visual (componentes, layouts, vistas) y hooks DEBE estar dentro de `app/ui/`.
- **PROHIBIDO** crear carpetas genéricas como `components/`, `hooks/` o `styles/` en la raíz o dentro de `src/`.

## 2. TypeScript y Modelos

- Usa `interface` para objetos públicos. Prohíbe `any`.
- Modelos en `domains/models`, requests en `domains/request`, responses en `domains/responses`.
- `api-integration-architect` define los contratos de `domains/`. `frontend-architect` y `frontend-developer` los consumen, no los redefinen.

## 3. Next.js y Renderizado

- Server Components por defecto en `app/`. Usa `"use client"` solo en componentes que requieran estado, efectos, event handlers o interactividad del navegador.
- `next/image` para todas las imágenes. `dynamic imports` para componentes pesados.

## 4. Estado

| Estrategia | Cuándo usar |
|------------|-------------|
| `useState` / `useRef` local | Estado de un solo componente o formulario simple |
| Controller Pattern (`useRef` + `useEffect`) | Lógica de negocio que orquesta servicios |
| Zustand / Context | Estado compartido entre múltiples componentes no emparentados |
| Redux (`store.ts`) | Flujos globales multi-paso con acciones y reducers (ej. wizard, onboarding) |

## 5. Estilos

- Tailwind CSS con design tokens del proyecto. SCSS para estilos globales.
- Archivos `.scss` solo en `app/ui/sass/`. Parciales `_Nombre.scss` se importan en `Global.scss`.
- `app/ui/css/Global.css` es autogenerado. **PROHIBIDO** editar `.css` directamente.
- Motion y animaciones con `framer-motion`. Requerido: staggered reveals, transiciones, `backdrop-blur`.

## 6. Accesibilidad

- Cumplir WCAG 2.1 (AA). Contraste mínimo 4.5:1.
- Roles ARIA, focus management, etiquetas semánticas en formularios.

## 7. Calidad

- Cobertura > 80%. Complejidad ciclomática ≤ 10. Prohíbe duplicar lógica.
- `code-reviewer` verifica el cumplimiento antes del commit.