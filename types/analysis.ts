/**
 * Analysis Type Definitions
 * 
 * Define la estructura de análisis de IA y SHAP values
 * 
 * SHAP (SHapley Additive exPlanations):
 * - Técnica de explicabilidad de ML
 * - Muestra la contribución de cada feature a la predicción
 * - Valores positivos aumentan la probabilidad de anomalía
 * - Valores negativos la disminuyen
 * 
 * @module types/analysis
 */

/**
 * Valor SHAP para una variable específica del modelo
 */
export interface ShapValue {
  /** Nombre de la variable/feature */
  variable: string;
  
  /** Impacto en puntos porcentuales sobre la probabilidad de anomalía */
  value: number;
  
  /** Descripción legible de la variable */
  description: string;
  
  /** Valor real de la variable en el contrato */
  actualValue?: string | number;
}

/**
 * Análisis completo generado por IA para un contrato
 */
export interface ContractAnalysis {
  /** ID del contrato analizado */
  contractId: string;
  
  /** Resumen ejecutivo del análisis */
  resumenEjecutivo: string;
  
  /** Factores principales identificados */
  factoresPrincipales: string[];
  
  /** Recomendaciones de acción */
  recomendaciones: string[];
  
  /** SHAP values ordenados por impacto absoluto */
  shapValues: ShapValue[];
  
  /** Probabilidad base del modelo (sin considerar features específicos) */
  probabilidadBase: number;
  
  /** Confianza del modelo en la predicción (0-100) */
  confianza: number;
  
  /** Fecha del análisis */
  fechaAnalisis: Date;
}
