---
trigger: always_on
---

# Performance Budget (Frontend)

## Métricas objetivo por página (Lighthouse, simulación Móvil 4G)

- **LCP** < 2.5s
- **TBT** < 200ms
- **JavaScript inicial (comprimido)** < 150 KB

## Reglas de rendimiento

- Todo componente nuevo que use imágenes, listas largas o animaciones pesadas debe justificar su impacto en estas métricas en el Plan de Implementación.
- `code-reviewer` verifica: uso de `next/image` (sin `<img>` nativo), `dynamic imports` para componentes pesados, virtualización en listas > 50 elementos, ausencia de animaciones que bloqueen el main thread.
- Se recomienda ejecutar `next build --analyze` para detectar regresiones en el tamaño del bundle.