---
description: Flujo estructurado para implementar cambios de código en Next.js siguiendo Clean Architecture, con soporte para todos los patrones de exposición.
---

# Implement Feature

Workflow para cambios de código en Next.js / TypeScript. Cubre features nuevas, correcciones y ajustes puntuales.

**Precondición**: Graphify instalado (`graphify install`) y MCP `sonarqube` operativo (`get_system_status` = `UP`). Ambas se verifican en el Paso 0/C0.

## Selección de Ruta

Clasifica la solicitud antes de ejecutar cualquier paso:

| Criterio | Ruta Completa | Ruta de Corrección |
|----------|---------------|---------------------|
| Archivos nuevos | ≥ 1 | 0 |
| Capas nuevas | ≥ 1 capa (Controller, Service, Repository) | Solo capas existentes |
| Contratos/interfaces nuevos en `domains/` | Sí | No |
| Componentes de UI nuevos o cambios visuales | Sí | No, o cosméticos menores |
| Ejemplo típico | "Crear CRUD de usuarios", "Agregar módulo de reportes" | "Corregir import incorrecto", "Cambiar patrón de ref", "Optimizar query" |

Si cumple **≥ 1 criterio** de Ruta Completa → Ruta Completa.
Si cumple **todos** los de Ruta de Corrección → Ruta de Corrección.
En caso de duda, pregunta: "¿Esto es un ajuste puntual o involucra estructura nueva?"

> Nota: "Optimizar query" es un ejemplo típico de Ruta de Corrección, pero si el diff toca `services/` o `controllers/` dispara igualmente el Paso C5 (pruebas) — la ruta ligera exime de arquitectura, UX y documentación, pero no de testing cuando `rules.md` lo exige.

---

## Ruta Completa

0. **Verificar precondiciones** (orquestador):
   - **Graphify**: Verifica que la skill está registrada. Si no, detén el workflow. Si `graphify-out/graph.json` no existe, invoca `/graphify .`.
   - **SonarQube MCP**: Invoca `get_system_status`. Si `status != UP` o no responde, detén el workflow. Informa: "El MCP de SonarQube no está operativo. Verifica la conexión y reintenta."
   - Solo si ambas pasan, continúa.

1. **Analizar contexto**: Usa `context-analyzer`. **Obligatorio**: esta skill debe resolver el contexto vía `graphify query` antes de leer archivos. No abras archivos individuales para mapear capas o dependencias mientras el grafo pueda responder.

2. **Definir contratos de datos**: Usa `api-integration-architect` para definir los contratos de `domains/models`, `domains/request` y `domains/responses`. Este paso no depende del diseño visual, por eso se ejecuta antes de la arquitectura de componentes.

3. **Diseñar UX/UI** *(solo si la feature incluye cambios visuales o nuevos componentes de UI)*: Usa `ux-designer`. Se ejecuta antes de la arquitectura de componentes (Paso 4) porque `frontend-architect` integra esta especificación en sus borradores — no al revés.

4. **Definir arquitectura de componentes**: Usa `frontend-architect`. Consume los contratos del Paso 2 y, cuando aplicó, la especificación visual del Paso 3 (tokens, estados, motion) para construir jerarquía de componentes, estrategia de renderizado y los borradores de código.

5. **Generar Plan de Implementación** y esperar aprobación:

   La sección **"Código propuesto"** es **obligatoria** y no puede quedar vacía. Se alimenta de:
   - Capa UI: borradores de `frontend-architect` (esqueleto de componentes).
   - Capas Controller/Service/Repository/Domains: borradores de `api-integration-architect`.
   - Especificación visual de `ux-designer`, cuando el Paso 3 aplicó.

````markdown
# Plan de Implementación

### ¿Qué se quiere realizar?
...

### Archivos / Componentes
□ Crear: ruta/archivo.ext — capa: X — razón
□ Modificar: ruta/archivo.ext — capa: X — razón

### Reutilización de Componentes Base (vía Graphify)
- Componente(s) base reutilizado(s): ruta/componente.tsx (o "Ninguno aplica — justificación")
- Cómo se usa: ...
- Query del grafo usada para esta verificación: ...

### Especificación de Diseño (UX) — solo si el Paso 3 aplicó
- Tokens de diseño (Tailwind, HSL, radii, spacing): ...
- Estados (éxito, carga, vacío, error): ...
- Motion (`framer-motion`): staggers, transiciones, backdrop-blur: ...
- (Si el Paso 3 no aplicó — sin cambios visuales — omite esta sección)

### ¿Qué puede romperse?
  - Impacto en otras rutas: ...
  - Contratos afectados: ...
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
Para cada archivo a crear o modificar, incluir un borrador con:
- Firma del componente/función/clase
- Props/interfaces con tipos
- Estructura JSX de alto nivel (para componentes UI)
- Hooks planificados y patrón de Controller (para UI)
- Firma de métodos y constructor (para Controller/Service/Repository)

Formato:
// archivo: ruta/archivo.ext | capa: X | acción: Crear/Modificar
<borrador de código>

⏸️ ESPERANDO APROBACIÓN — Responde "aprobado" para continuar o indica los cambios necesarios.
````


6. **Implementar código**: Usa `frontend-developer` (capa UI) y `api-integration-architect` (capas de integración) según corresponda. Los borradores del Paso 2 (contratos) y Paso 4 (arquitectura de componentes) son la base — junto con la especificación de `ux-designer` (Paso 3, cuando aplicó) para motion, estados y accesibilidad. El código final incluye el detalle completo (validaciones, estilos).

7. **Persistir cambios (working tree, sin commit)**: Usa `file-writer`.

8. **Documentar**: Usa `tech-writer` (JSDoc + README) sobre el working tree, antes del commit.

9. **Pruebas**: Usa `test-engineer`. Si fallan, vuelve al paso 6 (o directamente a `frontend-developer` para el fix puntual) y repite 7 y 8 antes de reintentar. Límite: 3 ciclos (6→7→8→9).

10. **Revisión de calidad y SonarQube Gate**: Usa `code-reviewer` — ahora también revisa que el JSDoc generado en el Paso 8 no contradiga la implementación, y corre sobre código que ya pasó pruebas (Paso 9). Si `CHANGES REQUIRED`, vuelve al paso 6 y repite 7, 8 y 9. Si `APPROVED` / `APPROVED WITH RECOMMENDATIONS`, avanza — **sin commitear todavía**. **Límite de ciclos**: mismo tope de 3 iteraciones, acumulado con el del Paso 9 — si entre pruebas y revisión de calidad se superan 3 vueltas completas sin converger, detener y escalar al usuario.

11. **Confirmar cambios** (orquestador): Ejecuta `git commit` — código y documentación entran en el mismo commit.

12. **Actualizar Grafo**: Invoca el skill `graphify` con `--update` (no es un comando de shell suelto: dispara detección incremental y, si hay docs o imágenes cambiadas, extracción semántica vía subagentes; si el cambio es solo código, corre AST-only sin costo de API). Si falla, registra advertencia (no bloquea).

---

## Ruta de Corrección

C0. **Verificar precondiciones**: Igual que Paso 0 de Ruta Completa — incluye tanto Graphify como la precondición de SonarQube MCP. No omitas la verificación de SonarQube solo porque la Ruta de Corrección es más liviana: C6 sigue dependiendo del mismo gate.

C1. **Consulta al Grafo (obligatorio)**: Ejecuta `graphify query` / `graphify path` para localizar archivos afectados y sus dependencias **antes de abrir cualquier archivo**. Solo si el grafo no existe o no responde, lee los archivos directamente.
   - Qué archivo(s) se ven afectados y qué dependencias tienen.
   - Que el cambio propuesto no rompe el flujo UI → Controller → Service → Repository.

C2. **Generar Plan de Corrección** y esperar aprobación:

````markdown
# Plan de Corrección

### ¿Qué se corrige?
(Descripción concisa del ajuste solicitado)

### Archivos afectados
□ Modificar: ruta/archivo.ext — qué cambia exactamente

### Código actual vs. Código propuesto

```diff
ruta/archivo.ext
- // código actual que se reemplaza
+ // código nuevo propuesto
```

### ¿Puede romper algo?
(Dependencias afectadas según el grafo, o "No — cambio aislado")

### Verificación con reglas del proyecto
- ExceptionHandler: (¿el cambio respeta el manejo centralizado de errores?)
- Capas: (¿el cambio mantiene el flujo UI → Controller → Service → Repository?)
- Patrones: (¿el cambio es consistente con otros archivos similares?)
- Testing: (¿el cambio toca lógica en `services/` o `controllers/`? Si sí, dispara C5)

⏸️ ESPERANDO APROBACIÓN — Responde "aprobado" para continuar o indica los cambios necesarios.
````

C3. **Implementar corrección**: Usa `frontend-developer` (capa UI) o `api-integration-architect` (capas de integración) según corresponda, con el diff aprobado.

C4. **Persistir cambios (working tree, sin commit)**: Usa `file-writer`.

C5. **Pruebas (condicional)**: Si el diff aprobado en C2 modifica lógica en `services/` o `controllers/`, usa `test-engineer` antes de la revisión de calidad — la regla "Testing Obligatorio" de `rules.md` (`always_on`) aplica también a la Ruta de Corrección, no solo a features nuevas. Si el diff no toca esas capas (ej. import incorrecto, cambio de patrón de ref en UI), omite este paso. Si las pruebas fallan, vuelve a C3 (o directamente al fix puntual) y repite C4 antes de reintentar. Límite: 3 ciclos (C3→C4→C5).

C6. **Revisión de calidad y SonarQube Gate**: Usa `code-reviewer`. Si `CHANGES REQUIRED`, vuelve a C3 y repite C4 (y C5, si aplicó). Límite: mismo tope de 3 iteraciones, acumulado con el de C5 — si entre pruebas y revisión se superan 3 vueltas completas sin converger, detener y escalar al usuario.

C7. **Confirmar cambios** (orquestador): Ejecuta `git commit`.

C8. **Actualizar Grafo**: Invoca el skill `graphify` con `--update`, igual que en el Paso 12 de la Ruta Completa. Misma política de manejo de error: si falla, registra advertencia (no bloquea).

---

## Notas operativas

- Aplica `rules.md` y `architecture-rules.md` globalmente.
- `graphify hook install` (configuración de proyecto, una sola vez) complementa el Paso 11 / C7: garantiza que el grafo también se actualice ante commits que ocurran fuera de este workflow.
- Aprobación: "aprobado", "dale", "sí, procede", "ok" cuentan como confirmación. Si la respuesta incluye condiciones, aplica el cambio, muestra el plan actualizado y espera confirmación final.
- Ciclos de corrección: 3 iteraciones máximo. Si no converge, escala al usuario con resumen del desacuerdo.