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
export type RiskLevel = "high" | "medium" | "low";

/**
 * Contrato público analizado por RadarCol
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
  fecha: Date;
  
  /** Nivel de riesgo calculado por el modelo */
  nivelRiesgo: RiskLevel;
  
  /** Probabilidad de anomalía (0-100%) */
  probabilidadAnomalia: number;
  
  /** Contratista ganador */
  contratista?: string;
  
  /** Objeto del contrato (opcional) */
  objeto?: string;
}
