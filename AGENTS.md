## Flujos de Trabajo
- Para implementar cualquier nueva funcionalidad, correccion, edicion, sigue estrictamente los pasos descritos en el workflow [.agents/workflows/implement-feature.md](.agents/workflows/implement-feature.md).

## graphify
This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:
- For **any codebase or architecture question**, the first action is `graphify query "<question>"` when graphify-out/graph.json exists — **do not read individual files first**. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, invoke the `graphify` skill with `--update` to keep the graph current (not a bare `graphify update .` shell command — AST-only and no API cost when only code changed; dispatches semantic-extraction subagents too if docs or images also changed).

## clerk-authentication
This project uses Clerk for user management and authentication.
Rules:
- When implementing auth flows, setting up components, or modifying Clerk configurations, invoke the `skill` tool with `skill: "clerk"` or `@clerk` to trigger the appropriate sub-skill.
- After updating Clerk logic or routes, always invoke the `graphify` skill with `--update` to ensure the new authentication files and cross-file relationships are correctly indexed in the knowledge graph.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->