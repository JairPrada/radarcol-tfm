# Sistema de Filtros - Dashboard RadarCol

## Descripción General

Este documento describe el sistema de filtros implementado para el dashboard de contratos de RadarCol. El sistema permite filtrar contratos basándose en los parámetros disponibles en la API REST del backend.

## Arquitectura del Sistema

### Patrones de Diseño Aplicados

1. **Controlled Component Pattern**: 
   - Los filtros son componentes controlados donde el estado vive en el componente padre (Dashboard)
   - Callback functions comunican cambios del hijo al padre

2. **Service Layer Pattern**:
   - `contractsService.ts` abstrae la lógica de llamadas a la API
   - Construcción automática de query parameters basada en filtros activos

3. **Single Responsibility Principle**:
   - Cada componente tiene una responsabilidad específica
   - Separación clara entre UI, lógica de negocio y llamadas a la API

## Componentes del Sistema

### 1. ContractFilters Component
**Ubicación**: `components/dashboard/ContractFilters.tsx`

**Responsabilidades**:
- Renderizar interfaz de filtros
- Manejar validación de entrada
- Formatear campos de moneda
- Proporcionar callbacks para cambios

**Props Interface**:
```typescript
interface ContractFiltersProps {
  filters: ContractFilters;
  onFiltersChange: (filters: ContractFilters) => void;
  isLoading?: boolean;
  className?: string;
}
```

**Características**:
- **Layout Responsivo**: Grid que se adapta a diferentes tamaños de pantalla
- **Validación de Entrada**: Según especificaciones de la API
- **Formato de Moneda**: Formato colombiano con separadores de miles
- **Estados Visuales**: Indicación de filtros activos y botón de limpieza

### 2. Service Layer - contractsService.ts
**Ubicación**: `lib/contractsService.ts`

**Funciones Clave**:

```typescript
// Interface de filtros basada en documentación de API
interface ContractFilters {
  limit?: number;           // 1-100, default 10
  fechaDesde?: string;     // YYYY-MM-DD
  fechaHasta?: string;     // YYYY-MM-DD  
  valorMinimo?: number;    // Valor numérico
  valorMaximo?: number;    // Valor numérico
  nombreContrato?: string; // Mínimo 3 caracteres
  idContrato?: string;     // ID exacto del contrato
}

// Construcción automática de query parameters
function buildQueryParams(filters: ContractFilters): string
```

**Ventajas del Diseño**:
- **Tipo Safety**: TypeScript garantiza tipos correctos
- **Validación Automática**: Parámetros inválidos se omiten
- **Extensibilidad**: Fácil agregar nuevos filtros

### 3. Dashboard Integration
**Ubicación**: `app/dashboard/page.tsx`

**State Management**:
```typescript
const [filters, setFilters] = useState<FilterTypes>({ limit: 25 });

// useEffect se ejecuta cuando cambian los filtros
useEffect(() => {
  async function loadContracts() {
    const { contracts, apiResponse } = await fetchContracts(filters);
    setContracts(contracts);
    setApiResponse(apiResponse);
  }
  loadContracts();
}, [filters]);
```

## Filtros Disponibles

### 1. Límite de Resultados
- **Campo API**: `limit`
- **Tipo**: Select dropdown
- **Valores**: 10, 25, 50, 100
- **Default**: 25
- **Validación**: Automática por opciones predefinidas

### 2. Nombre del Contrato
- **Campo API**: `nombre_contrato`
- **Tipo**: Input text
- **Validación**: Mínimo 3 caracteres
- **Comportamiento**: Búsqueda parcial (like)

### 3. ID del Contrato
- **Campo API**: `id_contrato`
- **Tipo**: Input text
- **Formato**: Monospace para mejor legibilidad
- **Ejemplo**: `CO1.PCCNTR.1370606`

### 4. Rango de Fechas
- **Campos API**: `fecha_desde`, `fecha_hasta`
- **Tipo**: Date inputs
- **Formato**: YYYY-MM-DD
- **Validación**: Formato de fecha HTML5

### 5. Rango de Valores
- **Campos API**: `valor_minimo`, `valor_maximo`
- **Tipo**: Formatted text inputs
- **Formato**: Separadores de miles colombianos
- **Ejemplo**: 1,000,000
- **Conversión**: Automática entre formato display y valor numérico

## Características de UI/UX

### Responsividad
- **Mobile**: 1 columna
- **Tablet**: 2 columnas  
- **Desktop**: 3 columnas

### Indicadores Visuales
- **Filtros Activos**: Contador en la parte inferior
- **Estados de Carga**: Inputs deshabilitados durante peticiones
- **Iconografía**: Iconos intuitivos para cada tipo de filtro

### Interacciones
- **Reseteo Individual**: Limpiar campo específico
- **Reseteo Global**: Botón "Limpiar Filtros"
- **Aplicación Automática**: Los filtros se aplican al cambiar valores

## Flujo de Datos

```
1. Usuario modifica filtro en ContractFilters
      ↓
2. onFiltersChange callback actualiza estado en Dashboard
      ↓  
3. useEffect detecta cambio y ejecuta nueva consulta
      ↓
4. fetchContracts construye URL con buildQueryParams
      ↓
5. API devuelve datos filtrados
      ↓
6. Estado se actualiza y tabla se re-renderiza
```

## Configuración de la API

El sistema está configurado para trabajar con la API REST en `http://localhost:8000/contratos`.

### Parámetros de Query Soportados:
- `limit`: Número de resultados (1-100)
- `fecha_desde`: Fecha inicio en formato YYYY-MM-DD
- `fecha_hasta`: Fecha fin en formato YYYY-MM-DD
- `valor_minimo`: Valor mínimo como número
- `valor_maximo`: Valor máximo como número  
- `nombre_contrato`: Búsqueda parcial por nombre (min 3 chars)
- `id_contrato`: Búsqueda exacta por ID

### Ejemplo de URL Generada:
```
http://localhost:8000/contratos?limit=25&fecha_desde=2024-01-01&valor_minimo=1000000&nombre_contrato=construccion
```

## Consideraciones de Rendimiento

1. **Debouncing**: Actualmente no implementado, se puede agregar para búsquedas de texto
2. **Caché**: Los resultados no se cachean, cada cambio de filtro genera nueva petición
3. **Loading States**: UI muestra estados de carga durante peticiones

## Mejoras Futuras

1. **Debouncing en Campos de Texto**: Evitar peticiones excesivas
2. **Persistencia de Filtros**: Guardar filtros en localStorage o URL
3. **Filtros Avanzados**: Rangos de anomalías, tipos de contrato
4. **Caché Inteligente**: Cachear resultados para filtros comunes
5. **Validación Avanzada**: Validaciones cruzadas (fecha_desde < fecha_hasta)

## Testing

Para probar el sistema de filtros:

1. **Iniciar el servidor API** en puerto 8000
2. **Iniciar Next.js**: `npm run dev`
3. **Navegar** a `http://localhost:3000/dashboard`
4. **Probar cada filtro individualmente**
5. **Verificar combinaciones de filtros**

## Conclusión

El sistema de filtros implementado sigue patrones de diseño establecidos, proporciona una experiencia de usuario intuitiva y está completamente tipado con TypeScript. La arquitectura permite extensión fácil para futuros filtros y mejoras de funcionalidad.