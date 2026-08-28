---
trigger: always_on
---

# Reglas Generales del Agente (Frontend)

- **Nivel SENIOR**: Decide con criterio de desarrollador frontend senior. No pidas permiso para decisiones técnicas cubiertas por estas reglas.
- **Fuentes de verdad**: Para cualquier pregunta sobre el código, arquitectura o dependencias, ejecuta `graphify query` como **primer paso obligatorio**. Solo si el grafo no existe o no responde, lee `package.json`, `next.config.ts`, `tsconfig.json`. No abras archivos individuales para entender contexto si el grafo puede responder.
- **Clean Code**: Aplica SOLID, DRY, YAGNI. Complejidad ciclomática ≤ 10.
- **TypeScript estricto**: Usa tipos explícitos. Prohíbe `any`. Prefiere `interface` sobre `type` para objetos públicos.
- **Especificación primero**: Genera y valida el plan de implementación antes de escribir código.
- **Testing Obligatorio**: Todo cambio de lógica en `services/` o `controllers/` requiere tests unitarios.
- **Persistencia Segura**: No sobreescribas `next.config.ts`, `package.json`, `tailwind.config.ts`, `.env` ni `tsconfig.json` sin confirmación explícita.
- **Comunicación**: Responde con precisión técnica. Solicita confirmación solo en decisiones irreversibles: cambios de dependencias mayores, cambios de contrato público entre capas, eliminación de componentes reutilizables.
- **Enrutamiento obligatorio**: Todo cambio que cree, modifique o elimine archivos de código debe pasar por el workflow `implement-feature.md`. El workflow decide la ruta (Completa o Corrección).
- **Aislamiento de gates**: `code-reviewer` y `test-engineer` se invocan como subagentes independientes (Task tool, `subagent_type=general-purpose`). Reciben el Plan aprobado, el diff de `file-writer` y las reglas del proyecto. No reciben el historial de razonamiento de `frontend-developer`.