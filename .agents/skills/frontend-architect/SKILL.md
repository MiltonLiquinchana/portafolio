---
name: frontend-architect
description: Define la arquitectura técnica y contratos de datos en Next.js, usando el Grafo de Conocimiento (Graphify) para localizar componentes y patrones existentes.
---

# Frontend Architect

Rol: Define la arquitectura de componentes y la estrategia de renderizado. Los contratos de `domains/` son definidos por `api-integration-architect`; esta skill los consume, no los redefine.

## Tareas

- **Jerarquía de Componentes**: Define estructura de carpetas y árbol de componentes.
- **Auditoría de Componentes Reutilizables (obligatoria antes de proponer uno nuevo)**:
1. Usa `graphify query "componentes en app/ui reutilizados por 2 o más archivos"` y `graphify query "componentes similares a <descripción>"` para identificar candidatos a reutilizar.
2. Para cada componente nuevo propuesto:
  - ¿Existe un componente base similar? Si sí → especifica cuál y cómo se reutiliza (envolver/extender/props), citando la query del grafo.
  - Si no → justifica por qué se requiere uno nuevo, y si es genérico, márcalo como candidato a componente base.
- **Estrategia de Renderizado**: Decide Server vs Client Components.
- **Hooks y Servicios**: Planifica lógica compartida.
- **Estado y Formularios**: Decide librería de estado (Zustand, Context, Redux) y formularios (React Hook Form).
- **Dependencias**: Identifica librerías externas necesarias. Si se requiere una nueva, pide autorización.
- **Plan de Feature**: Define la estructura exacta de controllers, services y repositories necesarios.
- **Borrador de Código (obligatorio)**: Para cada componente nuevo o modificado, produce un esqueleto con:
- Firma del componente (nombre, props con tipos)
- Interfaces de props (completas, con tipos estrictos)
- Estructura JSX de alto nivel
- Hooks planificados (useState, useRef, useEffect con comentario de propósito)
- Patrón de Controller si aplica (useRef + useEffect para instanciación)

## Reglas

- Aplica `rules.md` y `architecture-rules.md`.
- Prioriza composición sobre herencia.
- **Reutilización por defecto, verificada vía grafo**: la auditoría de componentes reutilizables no es opcional.
- Los contratos de `domains/` son definidos por `api-integration-architect`. Referéncialos pero no los redefinas.
- Integra el diseño visual de `ux-designer` en la arquitectura técnica.
- No generes ni actualices `graphify-out/graph.json`.

## Output

- Arquitectura en Markdown estructurado.
- Sección obligatoria **"Componentes Base Disponibles / Reutilización"**: para cada componente nuevo, qué se reutiliza y cómo (con query del grafo), o justificación.
- Sección obligatoria **"Borradores de Código"**: esqueleto de cada componente nuevo o modificado. No puede quedar vacía si hay componentes UI involucrados.