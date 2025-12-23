/**
 * Dashboard Page - Vista principal de contratos analizados
 *
 * Patrón de diseño: Container/Presentation Pattern
 * - Esta página actúa como Container, proveyendo datos
 * - ContractTable es Presentation, solo renderiza
 *
 * Arquitectura: Client Component con animaciones
 * - Datos se cargan desde API usando useEffect
 * - Componentes animados con Framer Motion
 *
 * @page
 */

"use client";

import { useEffect, useState } from "react";
import { MainLayout } from "@/components/ui/MainLayout";
import { ContractTable } from "@/components/dashboard/ContractTable";
import { AnimatedNumber, AnimatedProgressBar } from "@/components/ui";
import {
  fetchContracts,
  getDashboardStats,
  formatLargeAmount,
} from "@/lib/contractsService";
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Percent,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Contract, ContractsApiResponse } from "@/types/contract";

/**
 * Página del Dashboard - Ahora como Client Component con animaciones
 */
export default function DashboardPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [apiResponse, setApiResponse] = useState<ContractsApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContracts() {
      try {
        setLoading(true);
        setError(null);
        const { contracts: fetchedContracts, apiResponse: fetchedApiResponse } =
          await fetchContracts();
        setContracts(fetchedContracts);
        setApiResponse(fetchedApiResponse);
      } catch (error) {
        console.error("Error loading contracts:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    loadContracts();
  }, []);

  // Estado de carga
  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <motion.div
              className="inline-block w-8 h-8 border-4 border-accent-cyan border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <h2 className="text-2xl font-bold text-foreground mt-4 mb-2">
              Cargando Dashboard...
            </h2>
            <p className="text-foreground-muted">
              Obteniendo datos del API de contratos
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Estado de error
  if (error || !apiResponse) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <AlertTriangle className="w-20 h-20 text-alert-high mx-auto mb-6" />
            </motion.div>

            <h2 className="text-3xl font-bold text-foreground mb-4">
              ⚠️ API No Disponible
            </h2>

            <div className="bg-background-card border border-border rounded-xl p-6 text-left mb-6">
              <pre className="text-sm text-foreground-muted whitespace-pre-wrap font-mono bg-background-light p-4 rounded-lg mb-4">
                {error || "Error desconocido"}
              </pre>

              <div className="space-y-3 text-sm text-foreground-muted">
                <p className="font-semibold text-accent-cyan">
                  🔧 Pasos para solucionar:
                </p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Verifica que el servidor API esté ejecutándose</li>
                  <li>
                    Confirma que use el puerto{" "}
                    <code className="bg-background-light px-1 rounded">
                      8000
                    </code>
                  </li>
                  <li>
                    Prueba la URL:{" "}
                    <a
                      href="http://localhost:8000/contratos"
                      target="_blank"
                      className="text-accent-cyan hover:text-accent-cyan-glow underline"
                    >
                      http://localhost:8000/contratos
                    </a>
                  </li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-accent-cyan text-white rounded-lg hover:bg-accent-cyan-glow transition-colors font-medium"
              >
                🔄 Reintentar
              </button>

              <a
                href="/"
                className="px-6 py-3 bg-background-light border border-border text-foreground rounded-lg hover:bg-background-card transition-colors font-medium"
              >
                🏠 Ir al Inicio
              </a>
            </div>

            <p className="text-xs text-foreground-muted mt-8">
              💡 Tip: Ejecuta{" "}
              <code className="bg-background-light px-1 rounded">
                .\scripts\check-api.ps1
              </code>{" "}
              para verificar el estado del API
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const stats = getDashboardStats(contracts, apiResponse);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Dashboard de Análisis
          </h1>
          <p className="text-foreground-muted mb-2">
            Contratos públicos analizados por RadarCol
          </p>
          <motion.div
            className="text-sm text-foreground-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Fuente:{" "}
            <span className="text-accent-cyan font-medium">
              {apiResponse.metadata.fuenteDatos}
            </span>
            {apiResponse.metadata.camposSimulados.length > 0 && (
              <span className="ml-4">
                • Campos simulados:{" "}
                {apiResponse.metadata.camposSimulados.join(", ")}
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {/* Total Contratos */}
          <motion.div
            className="p-6 bg-background-card border border-border rounded-xl hover:bg-background-card/80 transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-accent-cyan" />
              <AnimatedNumber
                value={stats.totalContratosAnalizados}
                duration={2}
                delay={0.2}
                className="text-2xl md:text-3xl font-bold font-mono text-foreground"
              />
            </div>
            <div className="text-sm text-foreground-muted">
              Total Contratos Analizados
            </div>
          </motion.div>

          {/* Alto Riesgo */}
          <motion.div
            className="p-6 bg-background-card border border-border rounded-xl hover:bg-background-card/80 transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-alert-high" />
              <AnimatedNumber
                value={stats.contratosAltoRiesgo}
                duration={2}
                delay={0.4}
                className="text-2xl md:text-3xl font-bold font-mono text-alert-high"
              />
            </div>
            <div className="text-sm text-foreground-muted mb-3">
              Contratos de Alto Riesgo
            </div>
            <AnimatedProgressBar
              value={
                (stats.contratosAltoRiesgo / stats.totalContratosAnalizados) *
                100
              }
              color="red"
              height="sm"
              duration={2}
              delay={0.6}
            />
          </motion.div>

          {/* Monto Total */}
          <motion.div
            className="p-6 bg-background-card border border-border rounded-xl hover:bg-background-card/80 transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-accent-violet" />
              <AnimatedNumber
                value={stats.montoTotalCOP}
                duration={2.5}
                delay={0.6}
                formatter={(val) => formatLargeAmount(val)}
                className="text-2xl md:text-3xl font-bold font-mono text-foreground"
              />
            </div>
            <div className="text-sm text-foreground-muted">
              Monto Total en COP
            </div>
          </motion.div>

          {/* Porcentaje de Riesgo */}
          <motion.div
            className="p-6 bg-background-card border border-border rounded-xl hover:bg-background-card/80 transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Percent className="w-8 h-8 text-accent-cyan" />
              <AnimatedNumber
                value={
                  (stats.contratosAltoRiesgo / stats.totalContratosAnalizados) *
                  100
                }
                duration={2.5}
                delay={0.8}
                formatter={(val) => `${val.toFixed(1)}%`}
                className="text-2xl md:text-3xl font-bold font-mono text-accent-cyan"
              />
            </div>
            <div className="text-sm text-foreground-muted mb-3">
              Porcentaje Alto Riesgo
            </div>
            <AnimatedProgressBar
              value={
                (stats.contratosAltoRiesgo / stats.totalContratosAnalizados) *
                100
              }
              color="cyan"
              height="sm"
              duration={2.5}
              delay={1.0}
            />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <div className="mb-6 p-4 bg-background-card border border-border rounded-lg hover:bg-background-card/80 transition-all duration-300">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 text-sm text-foreground-muted">
              <BarChart3 className="w-4 h-4 text-accent-cyan" />
              Mostrando{" "}
              <AnimatedNumber
                value={stats.total}
                duration={1.5}
                delay={1}
                className="font-mono font-bold text-accent-cyan"
              />{" "}
              contratos de{" "}
              <AnimatedNumber
                value={stats.totalContratosAnalizados}
                duration={2}
                delay={1.2}
                className="font-mono font-bold text-accent-cyan"
              />{" "}
              analizados
            </span>
            <span className="text-sm text-foreground-muted">
              • Anomalía promedio:{" "}
              <AnimatedNumber
                value={stats.avgAnomaly}
                duration={1.5}
                delay={1.4}
                formatter={(val) => `${val}%`}
                className="font-mono font-bold text-accent-cyan"
              />
            </span>
          </div>
        </div>

        {/* Table */}
        <motion.div
          className="bg-background-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <ContractTable contracts={contracts} />
        </motion.div>
      </div>
    </MainLayout>
  );
}
