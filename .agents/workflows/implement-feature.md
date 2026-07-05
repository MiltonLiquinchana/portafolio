---
description: Flujo estructurado para implementar una feature completa (UI → Controller → Service → Repository) siguiendo la Clean Architecture del proyecto.
---

# Implement Feature

Workflow para implementar features completas en Next.js bajo Clean Architecture. **Precondición de entorno**: Graphify debe estar instalado y su skill registrada en el sistema (`graphify install`). Si esto no está cumplido, ningún paso de este workflow puede ejecutarse correctamente.

## Steps

0. **Verificar/Generar Grafo de Conocimiento** *(orquestador — no delegar a otras skills)*:

   - Verificar existencia de la skill `graphify` registrada (ej. `.agents/skills/graphify/SKILL.md`).
     - Si NO está registrada → **DETENER el workflow**. Informar al usuario:
       > "Graphify no está instalado/registrado en este sistema. Ejecuta `graphify install` (y `pip install graphifyy` si aún no lo tienes) antes de continuar — este workflow depende de él en todos sus pasos."
   - Verificar existencia de `graphify-out/graph.json`.
     - Si NO existe → invocar la skill `graphify` para generar el grafo inicial (`/graphify .`). Informar brevemente al usuario que esto puede tardar y usar la API configurada para docs/imágenes (el código se analiza localmente vía Tree-sitter, sin costo de API).
     - Si existe → continuar directamente al Paso 1.
   - Este paso solo se detiene de forma indefinida en el caso "skill no registrada" (precondición de entorno). La generación del grafo (`/graphify .`) se ejecuta directamente, sin requerir confirmación adicional — es parte obligatoria del flujo, no una sugerencia.

1. **Analizar contexto**: Usa `context-analyzer`. Esta skill consulta el grafo (`graphify query`, `graphify path`, `GRAPH_REPORT.md`) como fuente primaria.

2. **Definir arquitectura**: Usa `api-integration-architect` primero y luego `frontend-architect`. El orden importa: `api-integration-architect` define los contratos de `domains/` y `frontend-architect` los consume. Ambas skills consultan el grafo para localizar contratos y componentes existentes.

3. **Diseñar UX/UI** *(solo si la feature incluye cambios visuales o nuevos componentes de UI)*: Usa `ux-designer`.

4. **Generar Plan de Implementación y esperar aprobación**: Usando los outputs de los pasos anteriores, generar el plan con el siguiente formato y detenerse. No continuar al paso 5 hasta recibir "aprobado" de forma explícita.

   ```
   ## Plan de Implementación

   ### ¿Qué se quiere realizar?
   ...

   ### Capas involucradas (UI → Controller → Service → Repository)
   ...

   ### Archivos / Componentes
   - [ ] Crear: `ruta/archivo.ext` — capa: X — razón
   - [ ] Modificar: `ruta/archivo.ext` — capa: X — razón

   ### Reutilización de Componentes Base (vía Graphify)
   - Componente(s) base reutilizado(s): `ruta/componente.tsx` (o "Ninguno aplica — justificación")
   - Cómo se usa
   - Query del grafo usada para esta verificación

   ### ¿Qué puede romperse?
   ...

   ### ¿Por qué esta solución y no una alternativa?
   ...

   ### ¿Cómo se verifica que funcionó?
   ...

   ### ¿Se reutiliza lógica existente o se duplica?
   ...

   ### ¿Genera o resuelve deuda técnica?
   ...

   ### Código propuesto
   // archivo: ruta/archivo.ext | capa: X
   ...

   ---
   ⏸️ ESPERANDO APROBACIÓN — Responde "aprobado" para continuar o indica los cambios necesarios.
   ```

5. **Implementar código**: Usa `frontend-developer` y `api-integration-architect` según corresponda para escribir el código aprobado en cada capa.

6. **Revisión de calidad**: Usa `code-reviewer`. Esta skill consulta `GRAPH_REPORT.md` para detectar surprising connections que violen capas. Si el veredicto es "Requiere Cambios", volver al paso 5 con las correcciones indicadas antes de continuar.

7. **Persistir cambios**: Usa `file-writer` para escribir los archivos aprobados y revisados.

8. **Pruebas unitarias**: Usa `test-engineer` sobre los `services/` y `controllers/` creados o modificados.

9. **Documentación**: Usa `tech-writer` para JSDoc y README. Los comentarios `# WHY:`/JSDoc generados aquí son insumo directo del grafo en el siguiente paso.

10. **Actualizar Grafo de Conocimiento** *(orquestador — no delegar)*:

    - Ejecutar `graphify --update` (incremental, AST local para código — sin costo de API).
    - **Manejo de error**: si `--update` falla, registrar el error en el output final como advertencia de baja severidad. NO bloquear ni revertir los pasos anteriores — la feature ya fue aprobada, revisada y persistida; el grafo se corrige en la próxima actualización o vía `graphify hook install` en el siguiente commit.

## Notas operativas

- `graphify hook install` (configuración de proyecto, una sola vez) complementa el Paso 10: garantiza que el grafo también se actualice ante commits que ocurran fuera de este workflow.