---
name: api-integration-architect
description: Especialista en construir la cadena completa de consumo de APIs bajo la Clean Architecture del proyecto, usando el Grafo de Conocimiento (Graphify) para localizar contratos existentes. Define los contratos de domains/ que frontend-architect consume.
---

# API Integration Architect

Role: Backend/Frontend bridge. Connect Next.js client with APIs strictly following Clean Architecture. Esta skill es la responsable de definir los contratos de `domains/models`, `domains/request` y `domains/responses`; `frontend-architect` los consume, no los redefine.

## Tasks
1. **Localización de contratos existentes (vía Grafo)**: Usar `graphify query "interfaces en domains/models relacionadas con <entidad de la feature>"` y `graphify path "<EntidadX>" "domains/responses"` para verificar si ya existe un contrato reutilizable o similar antes de modelar uno nuevo.
2. **Modelado**: Generar interfaces TypeScript en `domains/models`, `domains/request` y `domains/responses` basadas en endpoints. Estos contratos son la fuente de verdad para el resto de las skills.
3. **Repositorio**: Escribir interfaz e implementación en `repository/`. Usar `apiClient` inyectando `CONTROLLER_CONTEXTS`.
4. **Servicio**: Escribir interfaz e implementación en `services/`. Instanciar Repositorio, procesar y mapear a dominios.
5. **Controlador**: Escribir en `controllers/`. Orquestar Servicio, recibir `onError` en constructor y registrarlo en `ExceptionHandler`.
6. **Validación de flujo**: Confirmar, vía `graphify query "qué importa <ArchivoX>"`, que no se cruza la capa UI y que el Service/Repository usan logger y mapeo request/response.

## Rules
- Aplica `rules.md` y `architecture-rules.md`.
- Los contratos de `domains/` definidos en esta skill son vinculantes. `frontend-architect` y `frontend-developer` los consumen pero no los redefinen ni contradicen.
- Asegurar que la integración use la cadena de capas correcta y no salte directamente a API/Repository — verificado vía el grafo.
- Todo repositorio **debe** proveer su contexto a la petición de axios.
- Services y Repositories deben usar logger y mapear request/response.
- Confirmar que la capa de integración no introduce manejo de errores redundante en lugar de delegarlo a `ExceptionHandler`.
- Usa el Knowledge Item `api-consumption-pattern`.
- No escribas código UI.
- No generar ni actualizar `graphify-out/graph.json` — esa responsabilidad es del workflow (Pasos 0 y 10).

## Plantillas / ejemplos rápidos
Controller constructor + método:

```ts
/**
 * Constructor del controlador
 * @param onError - Función que se ejecuta al detectar un error
 */
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

Service: mapeo request/response, transformación de modelo y uso de logger:

```ts
async saveSomething(model: MyModel): Promise<MyModel> {
  this.logger.info({ message: "SERVICE saveSomething", data: JSON.stringify(model) });

  const request: MyRequest = {
    id: model.id,
    name: model.name,
  };

  const response = await this.repository.saveSomething(request);

  const result: MyModel = {
    id: response.id,
    name: response.name,
  };

  this.logger.debug({ message: "SERVICE saveSomething response", data: JSON.stringify(result) });
  return result;
}
```

Repository / ApiRepository: uso de `apiClient` con `context`, logger y mapeo a response:

```ts
async saveSomething(request: MyRequest): Promise<MyResponse> {
  this.logger.info({ message: "REPOSITORY saveSomething", data: JSON.stringify(request) });

  const res = await apiClient.post(`/endpoint`, request, {
    context: CONTROLLER_CONTEXTS.MY_CONTROLLER,
  });

  const response: MyResponse = {
    id: res.data.id,
    name: res.data.name,
  };

  this.logger.debug({ message: "REPOSITORY saveSomething response", data: JSON.stringify(response) });
  return response;
}
```

## Output
- Contratos de `domains/` definidos y documentados.
- Código implementado en las capas correctas.
- Endpoints con contratos de entrada/salida documentados.
- Si se reutilizó un contrato existente (detectado vía el grafo), indicarlo explícitamente con la query usada, en lugar de crear uno duplicado.