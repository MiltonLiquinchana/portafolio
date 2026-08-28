# Referencia: herramientas MCP `sonarqube` (Frontend)

Carga este archivo solo cuando haya ambigüedad sobre el nombre o los parámetros de una herramienta. `code-reviewer/SKILL.md` y `rules/sonarqube-compliance.md` contienen el flujo normal.

Instancia: SonarQube Community Build v26.8.0.126808, modo MQR (self-hosted). Misma instancia que el backend — aplican las mismas limitaciones de Community Build.

## Quality Gates

- **`get_project_quality_gate_status`**: Estado del gate del proyecto. Parámetros: `projectKey` (recomendado), `branch`, `pullRequest`, `analysisId`, `projectId`. Retorna `OK`, `ERROR`, `WARN`, o `NONE`.
- **`list_quality_gates`**: Lista gates disponibles. Solo para diagnóstico.

## Issues

- **`search_sonar_issues_in_projects`**: Busca issues persistidos. Parámetros: `projectKeys` (array), `severities` (array: `INFO`, `LOW`, `MEDIUM`, `HIGH`, `BLOCKER`), `impactSoftwareQualities` (array: `MAINTAINABILITY`, `RELIABILITY`, `SECURITY`), `issueStatuses` (array: `OPEN`, `CONFIRMED`, `FALSE_POSITIVE`, `ACCEPTED`, `FIXED`, `IN_SANDBOX`), `branch`, `pullRequest`, `pageIndex`, `pageSize` (máx 500, default 100). Para frontend, filtrar por archivos `.ts`/`.tsx`.
- **`change_sonar_issue_status`**: Cambia estado de un issue (`accept`, `falsepositive`, `reopen`). Requiere `key` y `status`. No usar sin aprobación explícita del usuario.

## Rules

- **`show_rule`**: Detalle de regla (`key` requerido). Usar en cada issue bloqueante.

## Análisis de código

- **`analyze_code_snippet`**: Analiza archivo o snippet. Parámetros: `filePath` (recomendado, con workspace en `/app/mcp-workspace`), `fileContent` (alternativa sin workspace), `codeSnippet` (opcional), `language` (`ts` o `tsx`), `projectKey`, `scope` (`MAIN`/`TEST`).
- **`analyze_file_list`** *(requiere SonarQube for IDE activo)*: Analiza lista de archivos vía IDE local. Parámetro: `file_absolute_paths` (array). El contenedor Docker necesita `--network=host` para alcanzar `localhost:64120-64130`.
- **`run_advanced_code_analysis`** *(Cloud-only)*: No disponible en Community Build. No usar.

## Proyectos

- **`search_my_sonarqube_projects`**: Busca proyectos por nombre/key parcial. Parámetro `q`.

## Sistema

- **`get_system_status`**: Verifica estado (`UP`, `DOWN`, etc.). Usar en precondición del workflow.
- **`ping_system`**: Retorna `pong`. Fallback si `get_system_status` no responde.

## No disponibles en esta instancia

- `search_dependency_risks`: requiere Enterprise+ con Advanced Security.
- `list_branches`, `list_pull_requests`: Community Build no soporta branch analysis.
- Herramientas de context augmentation: requieren SonarQube Cloud. Graphify ya cubre ese rol de navegación semántica en este proyecto.