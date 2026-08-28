# Graph Report - portafolio  (2026-08-27)

## Corpus Check
- 80 files · ~41,148 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 355 nodes · 463 edges · 40 communities (28 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d6b5531d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_devDependencies|devDependencies]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_What You Must Do When Invoked|What You Must Do When Invoked]]
- [[_COMMUNITY_graphify|/graphify]]
- [[_COMMUNITY_graphify reference extra exports and benchmark|graphify reference: extra exports and benchmark]]
- [[_COMMUNITY_API Integration Architect|API Integration Architect]]
- [[_COMMUNITY_Code Reviewer Senior|Code Reviewer Senior]]
- [[_COMMUNITY_Frontend Developer|Frontend Developer]]
- [[_COMMUNITY_graphify reference query, path, explain|graphify reference: query, path, explain]]
- [[_COMMUNITY_Analizador de Contexto|Analizador de Contexto]]
- [[_COMMUNITY_File Writer Senior|File Writer Senior]]
- [[_COMMUNITY_Frontend Architect|Frontend Architect]]
- [[_COMMUNITY_Technical Writer Senior|Technical Writer Senior]]
- [[_COMMUNITY_Test Engineer|Test Engineer]]
- [[_COMMUNITY_UX Designer (Pro Max)|UX Designer (Pro Max)]]
- [[_COMMUNITY_graphify reference add a URL and watch a folder|graphify reference: add a URL and watch a folder]]
- [[_COMMUNITY_graphify reference commit hook and native CLAUDE.md integration|graphify reference: commit hook and native CLAUDE.md integration]]
- [[_COMMUNITY_graphify reference incremental update and cluster-only|graphify reference: incremental update and cluster-only]]
- [[_COMMUNITY_Implement Feature|Implement Feature]]
- [[_COMMUNITY_layout.tsx|layout.tsx]]
- [[_COMMUNITY_README|README.md]]
- [[_COMMUNITY_AGENTS|AGENTS.md]]
- [[_COMMUNITY_graphify reference GitHub clone and cross-repo merge|graphify reference: GitHub clone and cross-repo merge]]
- [[_COMMUNITY_graphify reference transcribe video and audio|graphify reference: transcribe video and audio]]
- [[_COMMUNITY_Referencia herramientas MCP `sonarqube` (Frontend)|Referencia: herramientas MCP `sonarqube` (Frontend)]]
- [[_COMMUNITY_architecture-rules|architecture-rules.md]]
- [[_COMMUNITY_graphify|graphify.md]]
- [[_COMMUNITY_rules|rules.md]]
- [[_COMMUNITY_extraction-spec|extraction-spec.md]]
- [[_COMMUNITY_graphify|graphify.md]]
- [[_COMMUNITY_eslint.config.mjs|eslint.config.mjs]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_postcss.config.mjs|postcss.config.mjs]]
- [[_COMMUNITY_ToastConfiguration.ts|ToastConfiguration.ts]]
- [[_COMMUNITY_Performance Budget (Frontend)|Performance Budget (Frontend)]]
- [[_COMMUNITY_ControllerContexts.ts|ControllerContexts.ts]]
- [[_COMMUNITY_sonarqube-compliance|sonarqube-compliance.md]]

## God Nodes (most connected - your core abstractions)
1. `CustomError` - 24 edges
2. `compilerOptions` - 16 edges
3. `SendContactResponse` - 14 edges
4. `Logger` - 11 edges
5. `What You Must Do When Invoked` - 11 edges
6. `/graphify` - 10 edges
7. `ContactModel` - 9 edges
8. `SendContactRequest` - 8 edges
9. `systemMessageConstructor()` - 8 edges
10. `Reglas de Arquitectura (Next.js / TypeScript)` - 8 edges

## Surprising Connections (you probably didn't know these)
- `useContactController()` --calls--> `createContactController()`  [EXTRACTED]
  app/ui/hooks/useContactController.ts → controllers/contact/createContactController.ts
- `ContactSection()` --calls--> `useContactController()`  [EXTRACTED]
  app/ui/components/ContactSection.tsx → app/ui/hooks/useContactController.ts
- `CustomConflictError` --inherits--> `CustomError`  [EXTRACTED]
  utils/errors/axios/CustomConflictError.ts → utils/errors/CustomError.ts
- `CustomGenericError` --inherits--> `CustomError`  [EXTRACTED]
  utils/errors/axios/CustomGenericError.ts → utils/errors/CustomError.ts
- `CustomInternalServerError` --inherits--> `CustomError`  [EXTRACTED]
  utils/errors/axios/CustomInternalServerError.ts → utils/errors/CustomError.ts

## Import Cycles
- None detected.

## Communities (40 total, 12 thin omitted)

### Community 0 - "page.tsx"
Cohesion: 0.07
Nodes (14): HIGHLIGHTS, COURSES, EDUCATION, EXPERIENCE, ExperienceItem, NAV_LINKS, LinkDef, Project (+6 more)

### Community 1 - "devDependencies"
Cohesion: 0.07
Nodes (27): dependencies, axios, next, react, react-dom, react-toastify, resend, devDependencies (+19 more)

### Community 2 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 3 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (23): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+15 more)

### Community 4 - "/graphify"
Cohesion: 0.11
Nodes (13): cameraSystemMessageConstructor(), CustomConflictError, CustomGenericError, CustomInternalServerError, CustomNotFoundError, CustomTimeoutError, CustomCameraNotFoundError, CustomNotAllowedError (+5 more)

### Community 5 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 6 - "API Integration Architect"
Cohesion: 0.22
Nodes (8): API Integration Architect, Controller, Output, Plantillas, Reglas, Repository, Service, Tareas

### Community 7 - "Code Reviewer Senior"
Cohesion: 0.33
Nodes (5): Anti-Patrones Bloqueantes, Output, Reglas, Senior Code Reviewer (Frontend), Tareas

### Community 8 - "Frontend Developer"
Cohesion: 0.33
Nodes (5): Ejemplo de Controller Pattern, Frontend Developer, Output, Reglas, Tareas

### Community 9 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 10 - "Analizador de Contexto"
Cohesion: 0.40
Nodes (4): Analizador de Contexto, Output, Reglas, Tareas

### Community 11 - "File Writer Senior"
Cohesion: 0.40
Nodes (4): File Writer (Next.js/TypeScript), Output, Reglas, Tareas

### Community 12 - "Frontend Architect"
Cohesion: 0.40
Nodes (4): Frontend Architect, Output, Reglas, Tareas

### Community 13 - "Technical Writer Senior"
Cohesion: 0.40
Nodes (4): Output, Reglas, Tareas, Technical Writer

### Community 14 - "Test Engineer"
Cohesion: 0.40
Nodes (4): Output, Reglas, Tareas, Test Engineer

### Community 15 - "UX Designer (Pro Max)"
Cohesion: 0.40
Nodes (4): Output, Reglas, Tareas, UX Designer

### Community 16 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 17 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 18 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 19 - "Implement Feature"
Cohesion: 0.33
Nodes (5): Implement Feature, Notas operativas, Ruta Completa, Ruta de Corrección, Selección de Ruta

### Community 21 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 25 - "Referencia: herramientas MCP `sonarqube` (Frontend)"
Cohesion: 0.22
Nodes (8): Análisis de código, Issues, No disponibles en esta instancia, Proyectos, Quality Gates, Referencia: herramientas MCP `sonarqube` (Frontend), Rules, Sistema

### Community 26 - "architecture-rules.md"
Cohesion: 0.22
Nodes (8): 1. Clean Architecture, 2. TypeScript y Modelos, 3. Next.js y Renderizado, 4. Estado, 5. Estilos, 6. Accesibilidad, 7. Calidad, Reglas de Arquitectura (Next.js / TypeScript)

### Community 37 - "ToastConfiguration.ts"
Cohesion: 0.33
Nodes (5): DEFAULT_TOAST_CONFIG, ERROR_TOAST_CONFIG, SUCCESS_TOAST_CONFIG, TOASTCONFIGURATIONTYPE, WARNING_TOAST_CONFIG

### Community 38 - "Performance Budget (Frontend)"
Cohesion: 0.50
Nodes (3): Métricas objetivo por página (Lighthouse, simulación Móvil 4G), Performance Budget (Frontend), Reglas de rendimiento

### Community 39 - "ControllerContexts.ts"
Cohesion: 0.07
Nodes (30): isContactModel(), logger, POST(), ContactSection(), FormState, SOCIAL_LINKS, useContactController(), ContactController (+22 more)

## Knowledge Gaps
- **173 isolated node(s):** `logger`, `inter`, `metadata`, `HIGHLIGHTS`, `FormState` (+168 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CustomError` connect `/graphify` to `ControllerContexts.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `ScrollReveal()` connect `page.tsx` to `ControllerContexts.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `logger`, `inter`, `metadata` to the rest of the system?**
  _173 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0748663101604278 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `What You Must Do When Invoked` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._