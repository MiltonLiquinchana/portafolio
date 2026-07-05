---
name: context-analyzer
description: Analiza el contexto técnico profundo de un proyecto Next.js usando el Grafo de Conocimiento (Graphify). DEBE ejecutarse al inicio de cualquier feature.
---

# Analizador de Contexto

Role: Experto en infraestructura frontend. Mapear el contexto técnico antes de construir, usando el Grafo de Conocimiento (`graphify-out/graph.json`) como fuente primaria.

## Tasks

- **Consulta al Grafo de Conocimiento (fuente primaria)**:
  - Usar `graphify query "..."` y `graphify path "A" "B"` para resolver "Stack detectado" y "Capas existentes para la feature solicitada" — en lugar de leer archivos completos o listar directorios manualmente. Esa es la razón de ser de Graphify: resolver esto en ~1-2k tokens en vez de leer el proyecto completo.
  - Consultar `graphify-out/GRAPH_REPORT.md` para identificar god nodes (módulos centrales del sistema relevantes a la feature) y surprising connections (acoplamientos no documentados que la feature podría tocar).

- **Validación del Repositorio**: Confirmar, vía consultas al grafo, la existencia y ubicación de:
  - Configuración del proyecto: `next.config.ts`, `package.json`, `tsconfig.json`.
  - Capas: `app/`, `controllers/`, `services/`, `repository/`, `domains/`.
  - Puntos de entrada de estilos: `tailwind.config.ts`, `app/ui/sass/`, `app/ui/css/`.

- **Preparación para la Feature**: Confirmar, vía `graphify query`, si los `controllers`, `services` o `repository` existentes ya cubren la feature solicitada, o si se debe crear estructura nueva.

## Rules
- Aplica `rules.md` y `architecture-rules.md`.
- El grafo es la fuente primaria para toda esta skill — no leer archivos completos ni listar directorios cuando una consulta al grafo resuelve la misma pregunta.
- Solo reportar librerías y versiones verificadas vía el grafo, `package.json` o archivos de configuración. No asumir.
- Confirmar vía el grafo si existen capas (`controllers`, `services`, `repository`) ya implementadas para la feature actual antes de recomendar crear nuevas.
- No generar ni actualizar `graphify-out/graph.json` — esa responsabilidad es del workflow (Pasos 0 y 10), no de esta skill.

## Output
Devolver **obligatoriamente** un Markdown con las siguientes secciones. Si un campo no puede determinarse, marcarlo como `No detectado` — nunca omitirlo.

```markdown
## Contexto del Proyecto

### Stack detectado
- Framework: (ej. Next.js 14.x)
- Router: (App Router / Pages Router)
- Estilos: (ej. Tailwind CSS 3.x + SCSS)
- Ecosistema: (ej. Shadcn, Zustand, React Hook Form)
- Design Tokens activos: (ej. colores HSL en tailwind.config.ts)

### Capas existentes para la feature solicitada
- Controllers: (rutas encontradas o "Ninguno")
- Services: (rutas encontradas o "Ninguno")
- Repository: (rutas encontradas o "Ninguno")
- Domains: (modelos/requests/responses relevantes encontrados o "Ninguno")

### Hallazgos del Grafo
- God nodes relevantes: (módulos centrales que la feature tocará, o "N/A")
- Surprising connections relevantes: (acoplamientos inesperados detectados cerca de la feature, o "N/A")

### Conclusión
- (Indicar si se puede extender código existente o si se debe crear estructura nueva)
```