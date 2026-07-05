---
name: frontend-architect
description: Define la arquitectura técnica y contratos de datos en Next.js, usando el Grafo de Conocimiento (Graphify) para localizar componentes y patrones existentes.
---

# Frontend Architect

Role: Technical strategist. Design scalable component structures that support complex visual & motion requirements.

## Tasks
- **Component Hierarchy**: Define folder/file structure (Atomic Design, Features).
- **Auditoría de Componentes Reutilizables (obligatoria antes de proponer un componente nuevo)**:
  1. Usar `graphify query "componentes en app/ui reutilizados por 2 o más archivos"` y `graphify query "componentes similares a <descripción del componente requerido>"` para identificar candidatos a reutilizar. El grafo refleja imports reales — no depende de convenciones de nombres de archivo.
  2. Para cada componente nuevo propuesto:
     - ¿Existe un componente base similar o un contenedor que pueda envolver la nueva lógica?
     - Si sí → especificar en el output qué componente base se reutiliza y cómo (envolver/extender/props), citando la query del grafo usada.
     - Si no → justificar explícitamente por qué se requiere un componente nuevo, y si tiene suficiente genericidad para ser reutilizado a futuro, marcarlo como candidato a componente base.
  - Casos típicos a validar contra el grafo: Modales (`modal-container`), Inputs (`custom-input`, `custom-select`), Botones (`custom-button` + variantes), Tablas, Cards — y cualquier otro patrón con 2+ reutilizaciones que el grafo identifique.
- **Rendering Strategy**: Decide Server vs Client components.
- **Data Contracts**: Definir los tipos y props estrictos que la UI necesita. Los contratos de `domains/models`, `domains/request` y `domains/responses` son responsabilidad de `api-integration-architect`; este skill los consume, no los define.
- **Hooks & Services**: Plan shared logic.
- **State & Forms**: Decide state libraries (Zustand, Context) and forms (React Hook Form).
- **Dependencies**: Identify needed external libraries.
- **Feature Plan**: Definir la estructura exacta de controllers, services y repositories que se deben crear para la feature.
- **Context Maintenance**: El mapa de relaciones funcionales (flujos UI → Controller → Service → Repository) se actualiza vía `graphify --update` (Paso 10 del workflow), reflejando automáticamente la arquitectura definida aquí. No requiere documentación manual adicional.

## Rules
- **Aplica**: Reglas globales de `rules.md` y `architecture-rules.md`.
- Priorizar composición.
- **Reutilización por defecto, verificada vía grafo**: la auditoría de componentes reutilizables no es opcional. Todo componente nuevo propuesto debe incluir en el output si reutiliza algo existente (con la query del grafo que lo confirma) o por qué no.
- Si se requiere nueva librería, pedir autorización.
- Integrar diseño visual de `ux-designer` (animaciones/estados) en la técnica.
- Los contratos de `domains/` (models, request, responses) son definidos por `api-integration-architect`. Este skill debe referenciarlos pero no redefinirlos ni contradecirlos.
- El output debe ser un plan arquitectónico accionable que el developer pueda ejecutar directamente.
- No generar ni actualizar `graphify-out/graph.json` — esa responsabilidad es del workflow (Pasos 0 y 10).

## Output
- Devuelve la arquitectura en formato Markdown estructurado y claro (no se requiere JSON).
- Incluir obligatoriamente una sección "Componentes Base Disponibles / Reutilización" listando, para cada componente nuevo propuesto, qué se reutiliza y cómo (con la query del grafo usada), o la justificación si no aplica reutilización. Esta sección alimenta directamente la sección "Reutilización de Componentes Base (vía Graphify)" del Plan de Implementación (Paso 4 del workflow).