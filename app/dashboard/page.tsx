/**
 * Dashboard Page - Vista principal de contratos analizados
 * 
 * Patrón de diseño: Container/Presentation Pattern
 * - Esta página actúa como Container, proveyendo datos
 * - ContractTable es Presentation, solo renderiza
 * 
 * Arquitectura: Server Component (Next.js)
 * - Datos se cargan en el servidor
 * - Solo componentes interactivos usan 'use client'
 * 
 * @page
 */

import { MainLayout } from "@/components/ui/MainLayout";
import { ContractTable } from "@/components/dashboard/ContractTable";
import { fetchContracts, getDashboardStats, formatLargeAmount } from "@/lib/contractsService";
import { Activity, TrendingUp, AlertTriangle, BarChart3, Percent } from "lucide-react";



/**
 * Página del Dashboard - Ahora con datos del API real
 */
export default async function DashboardPage() {
  try {
    // Obtener datos del API
    const { contracts, apiResponse } = await fetchContracts();
    const stats = getDashboardStats(contracts, apiResponse);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Dashboard de Análisis
          </h1>
          <p className="text-foreground-muted mb-2">
            Contratos públicos analizados por RadarCol
          </p>
          <div className="text-sm text-foreground-muted">
            Fuente: <span className="text-accent-cyan font-medium">{apiResponse.metadata.fuenteDatos}</span>
            {apiResponse.metadata.camposSimulados.length > 0 && (
              <span className="ml-4">
                • Campos simulados: {apiResponse.metadata.camposSimulados.join(', ')}
              </span>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Contratos */}
          <div className="p-6 bg-background-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-accent-cyan" />
              <span className="text-2xl md:text-3xl font-bold font-mono text-foreground">
                {stats.totalContratosAnalizados.toLocaleString('es-CO')}
              </span>
            </div>
            <div className="text-sm text-foreground-muted">
              Total Contratos Analizados
            </div>
          </div>

          {/* Alto Riesgo */}
          <div className="p-6 bg-background-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-alert-high" />
              <span className="text-2xl md:text-3xl font-bold font-mono text-alert-high">
                {stats.contratosAltoRiesgo.toLocaleString('es-CO')}
              </span>
            </div>
            <div className="text-sm text-foreground-muted">
              Contratos de Alto Riesgo
            </div>
          </div>

          {/* Monto Total */}
          <div className="p-6 bg-background-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-accent-violet" />
              <span className="text-2xl md:text-3xl font-bold font-mono text-foreground">
                {formatLargeAmount(stats.montoTotalCOP)}
              </span>
            </div>
            <div className="text-sm text-foreground-muted">
              Monto Total en COP
            </div>
          </div>

          {/* Porcentaje de Riesgo */}
          <div className="p-6 bg-background-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <Percent className="w-8 h-8 text-accent-cyan" />
              <span className="text-2xl md:text-3xl font-bold font-mono text-accent-cyan">
                {((stats.contratosAltoRiesgo / stats.totalContratosAnalizados) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="text-sm text-foreground-muted">
              Porcentaje Alto Riesgo
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-6 p-4 bg-background-card border border-border rounded-lg">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 text-sm text-foreground-muted">
              <BarChart3 className="w-4 h-4 text-accent-cyan" />
              Mostrando {stats.total.toLocaleString('es-CO')} contratos de {stats.totalContratosAnalizados.toLocaleString('es-CO')} analizados
            </span>
            <span className="text-sm text-foreground-muted">
              • Anomalía promedio: <span className="font-mono font-bold text-accent-cyan">{stats.avgAnomaly}%</span>
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-background-card border border-border rounded-xl overflow-hidden">
          <ContractTable contracts={contracts} />
        </div>
      </div>
    </MainLayout>
  );
  } catch (error) {
    // Manejo de errores - mostrar mensaje amigable al usuario
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-alert-high mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Error al cargar contratos
            </h2>
            <p className="text-foreground-muted mb-4">
              {error instanceof Error ? error.message : "Error desconocido"}
            </p>
            <p className="text-sm text-foreground-muted">
              Verifica que el servidor API esté ejecutándose en http://localhost:8000
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }
}
