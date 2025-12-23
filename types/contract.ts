/**
 * Contract Type Definitions
 * 
 * Define la estructura de datos para contratos públicos
 * Principio: Type Safety - TypeScript previene errores en tiempo de compilación
 * 
 * @module types/contract
 */

/**
 * Nivel de riesgo de anomalía detectado por el modelo de IA
 */
export type RiskLevel = "Alto" | "Medio" | "Bajo";

/**
 * Metadata de la respuesta del API
 */
export interface ApiMetadata {
  fuenteDatos: string;
  camposSimulados: string[];
}

/**
 * Información del contrato anidada en la respuesta del API
 */
export interface ContratoInfo {
  Codigo: string;
  Descripcion: string;
}

/**
 * Contrato público desde la API
 */
export interface ApiContract {
  Contrato: ContratoInfo;
  Entidad: string;
  Monto: string;
  FechaInicio: string | null;
  NivelRiesgo: RiskLevel;
  Anomalia: number;
}

/**
 * Respuesta completa del API de contratos
 */
export interface ContractsApiResponse {
  metadata: ApiMetadata;
  totalContratosAnalizados: number;
  contratosAltoRiesgo: number;
  montoTotalCOP: number;
  contratos: ApiContract[];
}

/**
 * Contrato público normalizado para uso interno
 * 
 * @interface Contract
 */
export interface Contract {
  /** Identificador único del contrato */
  id: string;
  
  /** Nombre descriptivo del contrato */
  nombreContrato: string;
  
  /** Entidad pública contratante */
  entidad: string;
  
  /** Monto del contrato en COP (pesos colombianos) */
  monto: number;
  
  /** Fecha de firma del contrato */
  fecha: Date | null;
  
  /** Nivel de riesgo calculado por el modelo */
  nivelRiesgo: "high" | "medium" | "low";
  
  /** Probabilidad de anomalía (0-100%) */
  probabilidadAnomalia: number;
  
  /** Contratista ganador */
  contratista?: string;
  
  /** Objeto del contrato (opcional) */
  objeto?: string;
}
