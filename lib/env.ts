/**
 * Environment Configuration
 * 
 * Configuración centralizada de variables de entorno
 * Patrón: Configuration Pattern
 * - Centraliza la configuración del sistema
 * - Proporciona valores por defecto seguros
 * - Validación de configuración en tiempo de compilación
 * 
 * @module lib/env
 */

/**
 * Configuración del API
 */
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://radarcol-model-api.onrender.com",
  endpoints: {
    contratos: "/contratos",
    analisisContrato: (id: string) => `/contratos/${id}/analisis`,
  },
  timeout: 10000, // 10 segundos
} as const;

/**
 * Configuración de desarrollo
 */
export const devConfig = {
  enableMocks: process.env.NODE_ENV === "development" && process.env.USE_MOCKS === "true",
  apiLogging: process.env.NODE_ENV === "development",
} as const;

/**
 * Validación de configuración requerida
 */
function validateConfig() {
  const requiredEnvVars: string[] = [];
  
  // Agregar validaciones aquí si hay variables requeridas
  // Por ejemplo: if (!process.env.REQUIRED_VAR) requiredEnvVars.push('REQUIRED_VAR');
  
  if (requiredEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${requiredEnvVars.join(', ')}`);
  }
}

// Ejecutar validación al importar el módulo
validateConfig();