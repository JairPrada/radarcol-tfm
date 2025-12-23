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
 * Modelo de respuesta del API para SHAP values
 */
export interface ApiShapValue {
  variable: string;
  value: number;
  description: string;
  actualValue: string;
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

/**
 * Modelo de análisis del API
 */
export interface ApiAnalysisModel {
  contractId: string;
  resumenEjecutivo: string;
  factoresPrincipales: string[];
  recomendaciones: string[];
  shapValues: ApiShapValue[];
  probabilidadBase: number;
  confianza: number;
  fechaAnalisis: string;
}

/**
 * Modelo de detalles del contrato en el análisis
 */
export interface ApiContractDetailModel {
  id: string;
  codigo: string;
  descripcion: string;
  entidad: string;
  monto: string;
  fechaInicio: string | null;
  nivelRiesgo: "Alto" | "Medio" | "Bajo";
  anomalia: number;
}

/**
 * Respuesta completa del API para análisis de contrato
 */
export interface ContratoAnalisisApiResponse {
  contract: ApiContractDetailModel;
  analysis: ApiAnalysisModel;
}
