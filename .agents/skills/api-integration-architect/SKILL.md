---
name: api-integration-architect
description: Construye la cadena completa de consumo de APIs bajo Clean Architecture, usando el Grafo de Conocimiento (Graphify) para localizar contratos existentes. Define los contratos de domains/ que frontend-architect consume.
---

# API Integration Architect

Rol: Conecta Next.js con APIs siguiendo Clean Architecture. Esta skill define los contratos de `domains/models`, `domains/request` y `domains/responses`; `frontend-architect` los consume, no los redefine.

## Tareas

1. **Localizar contratos existentes**: Usa `graphify query "interfaces en domains/models relacionadas con <entidad>"` y `graphify path "<EntidadX>" "domains/responses"` para verificar si ya existe un contrato reutilizable. Si existe, reutilízalo.
2. **Modelado**: Genera interfaces TypeScript en `domains/models`, `domains/request` y `domains/responses`. Estos contratos son vinculantes para el resto de las skills.
3. **Repositorio**: Escribe interfaz e implementación en `repository/`. Usa `apiClient` inyectando `CONTROLLER_CONTEXTS`.
4. **Servicio**: Escribe interfaz e implementación en `services/`. Mapea request/response y usa logger.
5. **Controlador**: Escribe en `controllers/`. Orquesta Servicio, recibe `onError` en constructor y lo registra en `ExceptionHandler`.
6. **Validación de flujo**: Confirma vía `graphify query "qué importa <ArchivoX>"` que no se cruza la capa UI y que Service/Repository usan logger y mapeo request/response.

## Reglas

- Aplica `rules.md` y `architecture-rules.md`.
- Los contratos de `domains/` definidos aquí son vinculantes. `frontend-architect` y `frontend-developer` los consumen pero no los redefinen.
- Todo repositorio provee su contexto a la petición de axios.
- Services y Repositories usan logger y mapean request/response.
- No escribas código UI.
- No generes ni actualices `graphify-out/graph.json`.

## Plantillas

### Controller

```ts
constructor(onError: (errorMessage: string) => void) {
ExceptionHandler.defineOnErrorDetect(CONTROLLER_CONTEXTS.MY_CONTROLLER, onError);
this.logger.info({ message: "se creo la instancia para el controlador MY_CONTROLLER" });
}

async myMethod(param: string): Promise<MyResponseModel> {
this.logger.info({ message: `${CONTROLLER_CONTEXTS.MY_CONTROLLER} myMethod` });
const response = await this.service.myMethod(param);
this.logger.debug({ message: "myMethod response", data: JSON.stringify(response) });
return response;
}
```

### Service

```ts
async saveSomething(model: MyModel): Promise<MyModel> {
this.logger.info({ message: "SERVICE saveSomething", data: JSON.stringify(model) });
const request: MyRequest = { id: model.id, name: model.name };
const response = await this.repository.saveSomething(request);
const result: MyModel = { id: response.id, name: response.name };
this.logger.debug({ message: "SERVICE saveSomething response", data: JSON.stringify(result) });
return result;
}
```

### Repository

```ts
async saveSomething(request: MyRequest): Promise<MyResponse> {
this.logger.info({ message: "REPOSITORY saveSomething", data: JSON.stringify(request) });
const res = await apiClient.post(`/endpoint`, request, {
 context: CONTROLLER_CONTEXTS.MY_CONTROLLER,
});
const response: MyResponse = { id: res.data.id, name: res.data.name };
this.logger.debug({ message: "REPOSITORY saveSomething response", data: JSON.stringify(response) });
return response;
}
```

## Output

- Contratos de `domains/` definidos y documentados.
- Código implementado en las capas correctas.
- Si se reutilizó un contrato existente, indicarlo con la query del grafo usada.