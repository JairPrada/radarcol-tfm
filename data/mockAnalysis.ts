/**
 * Mock Analysis Data
 * 
 * Análisis de IA simulados para cada contrato con SHAP values realistas
 * 
 * @module data/mockAnalysis
 */

import { ContractAnalysis } from "@/types/analysis";

/**
 * Mapa de análisis por ID de contrato
 */
export const mockAnalyses: Record<string, ContractAnalysis> = {
  "CONT-2024-001": {
    contractId: "CONT-2024-001",
    resumenEjecutivo:
      "El análisis identifica una **alta probabilidad de anomalía (87%)** en este contrato de equipos médicos. Los factores más relevantes incluyen un monto significativamente superior al promedio del sector, tiempo reducido entre publicación y adjudicación, y concentración de contratos con el mismo proveedor.",
    factoresPrincipales: [
      "Monto 340% superior al promedio de contratos similares",
      "Solo 2 oferentes presentaron propuestas (esperado: 5-8)",
      "Proveedor tiene 85% de contratos con la misma entidad en últimos 12 meses",
      "Tiempo de adjudicación: 7 días (promedio sector: 21 días)",
    ],
    recomendaciones: [
      "Revisar justificación del monto con benchmarking de mercado",
      "Verificar cumplimiento de requisitos de publicidad y convocatoria",
      "Auditar historial de relaciones comerciales entre entidad y contratista",
      "Evaluar especificaciones técnicas que pudieran limitar competencia",
    ],
    shapValues: [
      {
        variable: "monto_vs_promedio",
        value: 18.5,
        description: "Desviación del monto respecto al promedio",
        actualValue: "+340%",
      },
      {
        variable: "numero_oferentes",
        value: 12.3,
        description: "Cantidad de oferentes",
        actualValue: "2",
      },
      {
        variable: "concentracion_proveedor",
        value: 15.7,
        description: "% contratos con mismo proveedor",
        actualValue: "85%",
      },
      {
        variable: "tiempo_adjudicacion",
        value: 9.8,
        description: "Días entre publicación y adjudicación",
        actualValue: "7 días",
      },
      {
        variable: "especificaciones_tecnicas",
        value: 8.2,
        description: "Especificidad de requisitos técnicos",
        actualValue: "Alta",
      },
      {
        variable: "tipo_contrato",
        value: -2.1,
        description: "Categoría del contrato",
        actualValue: "Suministro",
      },
      {
        variable: "experiencia_entidad",
        value: -3.5,
        description: "Años de experiencia de la entidad",
        actualValue: "15 años",
      },
      {
        variable: "publicidad",
        value: 6.4,
        description: "Cumplimiento de publicidad",
        actualValue: "Parcial",
      },
    ],
    probabilidadBase: 35,
    confianza: 89,
    fechaAnalisis: new Date("2024-12-18"),
  },

  "CONT-2024-004": {
    contractId: "CONT-2024-004",
    resumenEjecutivo:
      "Se detecta **alta probabilidad de irregularidades (91%)** en el contrato de alimentación escolar. Destaca la ausencia de proceso competitivo efectivo, especificaciones que favorecen a un proveedor específico, y antecedentes de sanciones del contratista.",
    factoresPrincipales: [
      "Contratista tiene 3 sanciones por incumplimiento en últimos 24 meses",
      "Especificaciones geográficas limitan participación a 1-2 proveedores",
      "Precio por ración 45% superior al promedio departamental",
      "Modificaciones al pliego durante convocatoria favorecen oferente ganador",
    ],
    recomendaciones: [
      "Verificar cumplimiento de requisitos de inhabilidades del contratista",
      "Revisar justificación de especificaciones geográficas restrictivas",
      "Auditoría de precios unitarios vs mercado",
      "Investigar proceso de modificaciones al pliego",
    ],
    shapValues: [
      {
        variable: "historial_contratista",
        value: 22.1,
        description: "Antecedentes y sanciones del contratista",
        actualValue: "3 sanciones",
      },
      {
        variable: "especificaciones_geograficas",
        value: 16.8,
        description: "Restricciones geográficas",
        actualValue: "1-2 proveedores",
      },
      {
        variable: "precio_unitario",
        value: 14.3,
        description: "Precio vs promedio",
        actualValue: "+45%",
      },
      {
        variable: "modificaciones_pliego",
        value: 11.7,
        description: "Cambios durante convocatoria",
        actualValue: "4 modificaciones",
      },
      {
        variable: "oferentes_participantes",
        value: 9.5,
        description: "Número de oferentes",
        actualValue: "1",
      },
      {
        variable: "tiempo_ejecucion",
        value: 5.2,
        description: "Plazo de ejecución",
        actualValue: "6 meses",
      },
      {
        variable: "publicidad_cumplida",
        value: -1.8,
        description: "Cumplimiento publicidad",
        actualValue: "Sí",
      },
      {
        variable: "tipo_contrato",
        value: -2.3,
        description: "Categoría del contrato",
        actualValue: "Suministro",
      },
    ],
    probabilidadBase: 32,
    confianza: 93,
    fechaAnalisis: new Date("2024-12-17"),
  },

  "CONT-2024-007": {
    contractId: "CONT-2024-007",
    resumenEjecutivo:
      "El contrato de mobiliario escolar presenta **alta probabilidad de anomalía (79%)**. Los indicadores principales son precio elevado por unidad, concentración de contratos con el proveedor, y ubicación geográfica del proveedor no óptima para cobertura.",
    factoresPrincipales: [
      "Precio por pupitre $187.000 (promedio regional: $125.000)",
      "Proveedor ubicado en región diferente, costos logísticos elevados",
      "60% de contratos de mobiliario escolar adjudicados al mismo proveedor",
      "Garantías y certificaciones de calidad básicas vs competidores",
    ],
    recomendaciones: [
      "Estudio de mercado comparativo de precios por región",
      "Evaluar justificación de selección de proveedor no local",
      "Revisar proceso de evaluación técnica de ofertas",
      "Verificar existencia de proveedores locales con capacidad",
    ],
    shapValues: [
      {
        variable: "precio_unitario",
        value: 16.2,
        description: "Precio por unidad vs promedio",
        actualValue: "+50%",
      },
      {
        variable: "concentracion_proveedor",
        value: 13.8,
        description: "% contratos con mismo proveedor",
        actualValue: "60%",
      },
      {
        variable: "distancia_proveedor",
        value: 10.5,
        description: "Distancia geográfica proveedor",
        actualValue: "450 km",
      },
      {
        variable: "calidad_certificaciones",
        value: 8.9,
        description: "Nivel de certificaciones",
        actualValue: "Básico",
      },
      {
        variable: "numero_oferentes",
        value: 7.3,
        description: "Cantidad de oferentes",
        actualValue: "3",
      },
      {
        variable: "tiempo_adjudicacion",
        value: 5.1,
        description: "Días de adjudicación",
        actualValue: "12 días",
      },
      {
        variable: "publicidad",
        value: -3.2,
        description: "Cumplimiento publicidad",
        actualValue: "Completo",
      },
      {
        variable: "experiencia_entidad",
        value: -4.5,
        description: "Experiencia de la entidad",
        actualValue: "22 años",
      },
    ],
    probabilidadBase: 28,
    confianza: 85,
    fechaAnalisis: new Date("2024-12-16"),
  },

  "CONT-2024-010": {
    contractId: "CONT-2024-010",
    resumenEjecutivo:
      "Análisis identifica **alta probabilidad de irregularidades (85%)** en contrato de medicamentos. Factores críticos: proveedor con historial de entregas incompletas, precios superiores al mercado, y especificaciones que limitan competencia.",
    factoresPrincipales: [
      "Proveedor tiene 2 contratos previos con entregas incompletas (65% y 78%)",
      "Precios 38% superiores a últimas compras de la entidad",
      "Especificaciones de marca favorecen a un único distribuidor",
      "Proceso de selección no incluyó evaluación de antecedentes completa",
    ],
    recomendaciones: [
      "Verificar cumplimiento de verificación de antecedentes del proveedor",
      "Comparar precios con compras históricas y mercado",
      "Revisar justificación de especificaciones de marca",
      "Implementar medidas de supervisión de cumplimiento contractual",
    ],
    shapValues: [
      {
        variable: "historial_cumplimiento",
        value: 19.4,
        description: "Tasa de cumplimiento del proveedor",
        actualValue: "72%",
      },
      {
        variable: "precio_vs_historico",
        value: 15.6,
        description: "Precio vs compras previas",
        actualValue: "+38%",
      },
      {
        variable: "especificaciones_marca",
        value: 12.9,
        description: "Restricciones de marca",
        actualValue: "Única marca",
      },
      {
        variable: "verificacion_antecedentes",
        value: 11.2,
        description: "Profundidad verificación",
        actualValue: "Básica",
      },
      {
        variable: "numero_oferentes",
        value: 8.7,
        description: "Cantidad de oferentes",
        actualValue: "2",
      },
      {
        variable: "monto_contrato",
        value: 6.4,
        description: "Valor total del contrato",
        actualValue: "$6.8B",
      },
      {
        variable: "tipo_medicamento",
        value: -2.8,
        description: "Clasificación de medicamentos",
        actualValue: "Esenciales",
      },
      {
        variable: "urgencia_compra",
        value: 4.1,
        description: "Nivel de urgencia",
        actualValue: "Alta",
      },
    ],
    probabilidadBase: 30,
    confianza: 87,
    fechaAnalisis: new Date("2024-12-19"),
  },

  // Contratos de riesgo medio
  "CONT-2024-002": {
    contractId: "CONT-2024-002",
    resumenEjecutivo:
      "El contrato de construcción vial muestra **riesgo moderado (64%)**. Aunque cumple requisitos formales, presenta algunas irregularidades menores en el proceso de evaluación técnica y precio ligeramente elevado.",
    factoresPrincipales: [
      "Precio 18% superior al presupuesto oficial inicial",
      "Puntajes de evaluación técnica muy ajustados entre oferentes",
      "Experiencia específica del contratista en zona geográfica limitada",
      "Tiempo de ejecución propuesto menor al promedio del sector",
    ],
    recomendaciones: [
      "Monitorear cumplimiento de cronograma propuesto",
      "Verificar capacidad técnica y financiera durante ejecución",
      "Revisar justificación de ajuste presupuestal",
      "Supervisión técnica reforzada en fases críticas",
    ],
    shapValues: [
      {
        variable: "precio_vs_presupuesto",
        value: 9.8,
        description: "Desviación vs presupuesto oficial",
        actualValue: "+18%",
      },
      {
        variable: "puntajes_tecnicos",
        value: 7.2,
        description: "Diferencia en evaluación técnica",
        actualValue: "3.5 pts",
      },
      {
        variable: "experiencia_zona",
        value: 5.6,
        description: "Proyectos previos en la zona",
        actualValue: "1 proyecto",
      },
      {
        variable: "tiempo_ejecucion",
        value: 6.4,
        description: "Plazo propuesto vs promedio",
        actualValue: "-25%",
      },
      {
        variable: "oferentes_participantes",
        value: 4.3,
        description: "Número de oferentes",
        actualValue: "4",
      },
      {
        variable: "publicidad",
        value: -8.5,
        description: "Cumplimiento publicidad",
        actualValue: "Completo",
      },
      {
        variable: "experiencia_entidad",
        value: -6.2,
        description: "Experiencia de la entidad",
        actualValue: "18 años",
      },
      {
        variable: "tipo_contrato",
        value: -3.1,
        description: "Categoría del contrato",
        actualValue: "Obra pública",
      },
    ],
    probabilidadBase: 25,
    confianza: 78,
    fechaAnalisis: new Date("2024-12-15"),
  },

  // Contratos de bajo riesgo
  "CONT-2024-003": {
    contractId: "CONT-2024-003",
    resumenEjecutivo:
      "El contrato de consultoría en transformación digital presenta **bajo riesgo (23%)**. El proceso cumple con todos los requisitos normativos, participación competitiva adecuada, y precios alineados con el mercado.",
    factoresPrincipales: [
      "Proceso de selección transparente con 8 oferentes calificados",
      "Precio dentro del rango esperado (-3% vs promedio del mercado)",
      "Contratista con experiencia comprobada y certificaciones internacionales",
      "Cumplimiento total de requisitos de publicidad y plazos",
    ],
    recomendaciones: [
      "Seguimiento estándar del cumplimiento contractual",
      "Verificar entregables según cronograma",
      "Mantener comunicación fluida con supervisor técnico",
    ],
    shapValues: [
      {
        variable: "numero_oferentes",
        value: -12.3,
        description: "Cantidad de oferentes calificados",
        actualValue: "8",
      },
      {
        variable: "precio_mercado",
        value: -8.7,
        description: "Precio vs promedio mercado",
        actualValue: "-3%",
      },
      {
        variable: "certificaciones",
        value: -9.5,
        description: "Certificaciones del contratista",
        actualValue: "ISO 27001, CMMI-5",
      },
      {
        variable: "publicidad",
        value: -6.4,
        description: "Cumplimiento publicidad",
        actualValue: "100%",
      },
      {
        variable: "experiencia_contratista",
        value: -7.8,
        description: "Años de experiencia",
        actualValue: "12 años",
      },
      {
        variable: "evaluacion_tecnica",
        value: -5.1,
        description: "Puntaje técnico",
        actualValue: "95/100",
      },
      {
        variable: "tiempo_adjudicacion",
        value: 3.2,
        description: "Días de adjudicación",
        actualValue: "18 días",
      },
      {
        variable: "monto_contrato",
        value: 2.8,
        description: "Valor del contrato",
        actualValue: "$1.2B",
      },
    ],
    probabilidadBase: 35,
    confianza: 82,
    fechaAnalisis: new Date("2024-12-14"),
  },
};

/**
 * Obtiene el análisis de un contrato por su ID
 */
export function getAnalysisById(contractId: string): ContractAnalysis | undefined {
  return mockAnalyses[contractId];
}
