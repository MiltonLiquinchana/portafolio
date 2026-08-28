---
trigger: always_on
---

# SonarQube Compliance (Frontend)

- **Instancia**: SonarQube Community Build v26.8.0.126808, modo MQR ("Clean Code"). Si la instancia cambia de modo (visible en el pie de página de SonarQube), actualiza este archivo antes de confiar de nuevo en el gate — no asumas que el modelo de severidad sigue vigente sin verificarlo.

- **Dos niveles de gate, no redundantes**:
  1. **Nivel agente (pre-commit)**: `code-reviewer` verifica los archivos recién escritos en el working tree con el MCP `sonarqube`.
  2. **Nivel CI/CD (autoritativo, si existe)**: el pipeline de CI/CD ejecuta el análisis de proyecto completo (contexto cruzado, cobertura, duplicación, hotspots) y aplica el Quality Gate configurado en SonarQube. Este nivel no se duplica ni se reemplaza desde el agente.

- **Precondición de disponibilidad**: el Paso 0 (Ruta Completa) / C0 (Ruta de Corrección) del workflow `implement-feature.md` verifica, antes de iniciar arquitectura o implementación, que el MCP `sonarqube` esté operativo (`get_system_status` = `UP`). Evita gastar tokens si el gate va a bloquear al final por falta de conexión. Si el MCP falla después de pasar esta precondición, trátalo como fallo transitorio — aplica igual la política de bloqueo (notifica y detén el avance al commit).

- **Modelo de severidad (MQR)**: esta instancia no usa la escala legada `BLOCKER`/`CRITICAL`/`MAJOR`/`MINOR`/`INFO`. Las herramientas del MCP exponen:
  - `severity`: `INFO`, `LOW`, `MEDIUM`, `HIGH` o `BLOCKER`.
  - `impactSoftwareQualities`: uno o más de `MAINTAINABILITY`, `RELIABILITY`, `SECURITY`.

- **Regla de bloqueo** (sustituye cualquier referencia previa a "MAJOR o superior"), aplicada a los archivos `.ts`/`.tsx` tocados por el cambio actual:
  - Bloqueante: `severity` `HIGH` o `BLOCKER`.
  - Bloqueante: `severity` `MEDIUM` con `impactSoftwareQualities` incluyendo `SECURITY` — un hallazgo de seguridad media no pasa solo por no llegar a `HIGH`.
  - No bloqueante (documenta como recomendación, no detiene el flujo): `LOW`, `INFO`, o `MEDIUM` sin `SECURITY`.

- **Limitación de Community Build**: sin branch analysis ni pull request decoration.
  - Nunca compares incidencias contra una rama base ni asumas "incidencia nueva vs. preexistente".
  - Aplica la regla de bloqueo por igual a todos los archivos `.ts`/`.tsx` tocados en esta sesión, sin distinguir nueva de preexistente.

- **Resolución de `projectKey` (obligatoria si hay más de un proyecto en la instancia)**: nunca asumas un `projectKey` global ni omitas el parámetro confiando en el default de organización. Cada proyecto frontend (app principal, landing, dashboard, etc.) tiene su propio proyecto en SonarQube — omitir `projectKey` hace que herramientas como `analyze_code_snippet` usen los perfiles de calidad por defecto de la organización, no los del proyecto real.
  - Resuelve el `projectKey` con `search_my_sonarqube_projects` (parámetro `q` = nombre del proyecto, derivado de `package.json`).
  - Si existe `SONARQUBE_PROJECT_KEY` fijado en el entorno del MCP para ese proyecto, úsalo — documenta en el output cuál usaste, nunca lo dejes implícito.

- **Momento de ejecución**: después de que `file-writer` escribe los archivos al working tree (sin commitear) y antes de cerrar el paso de revisión de calidad.

- **Herramientas, en orden de uso**:
  1. `get_project_quality_gate_status` (con `projectKey` resuelto) — señal autoritativa: un `ERROR` bloquea por sí solo, sin importar lo que encuentren las demás herramientas, porque refleja las condiciones reales del servidor (cobertura, duplicación, etc.).
  2. `search_sonar_issues_in_projects`, filtrando por `projectKeys` y `severities: [HIGH, BLOCKER]`, sobre los archivos `.ts`/`.tsx` tocados en esta sesión — más barato que analizar snippet por snippet porque refleja lo que el servidor ya procesó.
  3. `show_rule` sobre cada issue bloqueante, para que el reporte de `code-reviewer` explique el porqué de la regla, no solo que se disparó.
  4. `analyze_code_snippet` (complemento), sobre archivos de esta sesión sin análisis persistido en el servidor. Dos modos:
     - `filePath` (workspace montado en `/app/mcp-workspace`): modo por defecto, no gasta tokens del prompt.
     - `fileContent` (chequeo pre-escritura, antes de que `file-writer` persista el borrador): úsalo solo cuando el plan aprobado o el usuario señalen explícitamente el cambio como alto riesgo — cuesta más tokens porque envía el archivo completo en el prompt.
  5. `analyze_file_list`, si `SonarQube for IDE` está activo y conectado (puerto 64120–64130; en Docker sobre Linux requiere `--network=host` para alcanzar `localhost`) — alternativa válida sobre el mismo motor.
  - `run_advanced_code_analysis` **no aplica**: exclusivo de Sonar Vortex en SonarQube Cloud (add-on de pago). Community Build/Server no lo tiene bajo ningún plan — no lo uses ni asumas su disponibilidad.
  - Para el detalle de parámetros de cada herramienta, consulta `skills/code-reviewer/references/sonarqube-tools.md` — cárgalo solo si hay ambigüedad sobre un parámetro específico.

- **Resultado normalizado obligatorio** (`code-reviewer` lo incluye en su output):

  | Campo | Contenido |
  |-------|-----------|
  | `projectKey` resuelto | El key usado, y cómo se resolvió (`search_my_sonarqube_projects` con query `X`, o `SONARQUBE_PROJECT_KEY` fijo del entorno) |
  | Quality Gate | `OK` / `ERROR` / `WARN` |
  | Issues `HIGH`/`BLOCKER` en archivos `.ts`/`.tsx` tocados | Lista con severidad, `impactSoftwareQualities`, archivo:línea, regla (usa `show_rule` para explicar el porqué) |
  | Issues `MEDIUM` con impacto `SECURITY` | Lista aparte — también bloqueante |
  | Veredicto SonarQube | `PASA` / `BLOQUEA` |