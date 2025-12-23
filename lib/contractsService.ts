/**
 * Contratos API Service
 * 
 * Servicio para gestionar las llamadas al API de contratos
 * Patrón de diseño: Service Layer Pattern
 * - Abstrae la lógica de comunicación con el API
 * - Transforma datos del API al formato interno
 * - Manejo centralizado de errores
 * 
 * @module lib/contractsService
 */

import { ContractsApiResponse, ApiContract, Contract } from "@/types/contract";
import { apiConfig } from "@/lib/env";

/**
 * Convierte el nivel de riesgo de la API al formato interno
 */
function normalizeRiskLevel(apiLevel: "Alto" | "Medio" | "Bajo"): "high" | "medium" | "low" {
  switch (apiLevel) {
    case "Alto":
      return "high";
    case "Medio":
      return "medium";
    case "Bajo":
      return "low";
    default:
      return "low";
  }
}

/**
 * Transforma un contrato del API al formato interno
 */
function transformApiContract(apiContract: ApiContract): Contract {
  return {
    id: apiContract.Contrato.Codigo,
    nombreContrato: apiContract.Contrato.Descripcion,
    entidad: apiContract.Entidad,
    monto: parseInt(apiContract.Monto, 10),
    fecha: apiContract.FechaInicio ? new Date(apiContract.FechaInicio) : null,
    nivelRiesgo: normalizeRiskLevel(apiContract.NivelRiesgo),
    probabilidadAnomalia: apiContract.Anomalia,
  };
}

/**
 * Obtiene todos los contratos desde la API
 * 
 * @returns Promise con la respuesta completa de la API y contratos transformados
 * @throws Error si la llamada al API falla
 */
export async function fetchContracts(): Promise<{
  apiResponse: ContractsApiResponse;
  contracts: Contract[];
}> {
  try {
    const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.contratos}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Configuración para evitar problemas de CORS en desarrollo
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const apiResponse: ContractsApiResponse = await response.json();
    
    // Validación básica de la respuesta
    if (!apiResponse.contratos || !Array.isArray(apiResponse.contratos)) {
      throw new Error("Respuesta del API inválida: falta el array de contratos");
    }

    // Transforma los contratos al formato interno
    const contracts = apiResponse.contratos.map(transformApiContract);

    return {
      apiResponse,
      contracts,
    };
  } catch (error) {
    // Log del error para debugging
    console.error("Error fetching contracts:", error);
    
    // Re-lanza el error con mensaje más descriptivo
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(`🚫 No se puede conectar al servidor API en ${apiConfig.baseUrl}

📋 INSTRUCCIONES:
1️⃣ Verifica que el servidor API esté ejecutándose
2️⃣ Confirma que esté usando el puerto 8000
3️⃣ Prueba la URL manualmente: ${apiConfig.baseUrl}${apiConfig.endpoints.contratos}

💡 COMANDOS TÍPICOS:
• python -m uvicorn main:app --port 8000
• python app.py
• node server.js

🔧 Si el API usa otro puerto, configura NEXT_PUBLIC_API_BASE_URL en .env.local`);
    }
    
    if (error instanceof Error && error.message.includes("HTTP")) {
      throw new Error(`❌ Error del servidor API (${error.message})

El servidor está ejecutándose pero devolvió un error.
Verifica los logs del servidor API para más detalles.`);
    }
    
    throw error instanceof Error ? error : new Error("Error desconocido al obtener contratos");
  }
}

/**
 * Hook personalizado para obtener estadísticas del dashboard
 */
export function getDashboardStats(contracts: Contract[], apiResponse: ContractsApiResponse) {
  const total = contracts.length;
  const highRisk = contracts.filter((c) => c.nivelRiesgo === "high").length;
  const totalAmount = contracts.reduce((sum, c) => sum + c.monto, 0);
  const avgAnomaly = contracts.length > 0 
    ? contracts.reduce((sum, c) => sum + c.probabilidadAnomalia, 0) / contracts.length 
    : 0;

  return {
    total,
    highRisk,
    totalAmount,
    avgAnomaly: Math.round(avgAnomaly),
    // Estadísticas adicionales de la API
    totalContratosAnalizados: apiResponse.totalContratosAnalizados,
    contratosAltoRiesgo: apiResponse.contratosAltoRiesgo,
    montoTotalCOP: apiResponse.montoTotalCOP,
  };
}

/**
 * Formatea monto grande a billones/millones
 */
export function formatLargeAmount(amount: number): string {
  if (amount >= 1e12) {
    return `$${(amount / 1e12).toFixed(1)}T`;
  }
  if (amount >= 1e9) {
    return `$${(amount / 1e9).toFixed(1)}B`;
  }
  return `$${(amount / 1e6).toFixed(0)}M`;
}