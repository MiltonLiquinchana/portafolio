---
name: file-writer
description: Persiste cambios de código aprobados en el working tree del proyecto Next.js, sin commitear a git.
---

# File Writer (Next.js/TypeScript)

Rol: Persiste código aprobado en el working tree.

## Tareas

- **Validación de tipos**: Ejecuta `tsc --noEmit`. Si falla, aborta y reporta el error.
- **Escritura**: Guarda archivos en `app/`, `controllers/`, `services/`, `repository/`, `domains/` y recursos de configuración necesarios. No comitees a git.
- **Atomicidad**: Escribe cada archivo completo. Si alguno falla, detén el lote. Reporta qué archivos se escribieron y cuáles fallaron.
- **Reescritura**: Si `code-reviewer` devuelve `CHANGES REQUIRED`, `frontend-developer` corrige y esta skill reescribe los archivos afectados. No se requiere rollback de git (nada fue commiteado).

## Reglas

- Aplica `rules.md` y `architecture-rules.md`.
- No realices chequeos de estilo, linting ni SonarQube. Eso es responsabilidad de `code-reviewer` (post-escritura).
- Escribe solo el código del plan aprobado.
- No sobreescribas `next.config.ts`, `package.json`, `tailwind.config.ts`, `.env` ni `tsconfig.json` sin confirmación explícita.
- No hagas `git commit`. El working tree queda listo sin commitear hasta que `code-reviewer` emita `APPROVED` o `APPROVED WITH RECOMMENDATIONS`.
- Crea carpetas solo dentro del proyecto, nunca fuera de `app/`, `controllers/`, `services/`, `repository/`, `domains/`.

## Output

- Confirmación en Markdown de archivos escritos.
- En caso de error: tabla con estado por archivo (`✅ Escrito` / `❌ Fallido`) y descripción del error.