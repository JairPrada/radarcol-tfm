/**
 * Loading Component - Mostrado mientras se carga el análisis del contrato
 * 
 * Next.js muestra automáticamente este componente durante la carga
 * de la página de análisis (Server Component con async data fetching)
 * 
 * @component
 */

"use client";

import { motion } from "framer-motion";
import { MainLayout } from "@/components/ui/MainLayout";
import { ArrowLeft, Activity, TrendingUp, Brain } from "lucide-react";

export default function AnalysisLoading() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-foreground-muted">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver al Dashboard</span>
          </div>
        </div>

        {/* Title skeleton */}
        <div className="mb-8">
          <div className="h-10 w-64 bg-background-card rounded-lg mb-2 animate-pulse" />
          <div className="h-5 w-96 bg-background-card rounded-lg animate-pulse" />
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda: Skeleton del contrato */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Header con ID */}
              <div className="space-y-3">
                <div className="h-4 w-24 bg-background-card rounded animate-pulse" />
                <div className="h-6 w-32 bg-background-card rounded animate-pulse" />
                <div className="h-8 w-40 bg-background-card rounded-lg animate-pulse" />
              </div>

              {/* Probabilidad de Anomalía */}
              <motion.div
                className="p-6 bg-background-light rounded-xl border border-border"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-40 bg-background-card rounded animate-pulse" />
                  <TrendingUp className="w-5 h-5 text-accent-cyan animate-pulse" />
                </div>
                <div className="h-12 w-32 bg-background-card rounded-lg mb-2 animate-pulse" />
                <div className="w-full bg-background-card rounded-full h-3 animate-pulse" />
              </motion.div>

              {/* Información del Contrato */}
              <div className="space-y-4">
                <div className="h-5 w-48 bg-background-card rounded animate-pulse" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Activity className="w-5 h-5 text-accent-cyan animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-24 bg-background-card rounded animate-pulse" />
                        <div className="h-5 w-full bg-background-card rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Skeleton del análisis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Explicación de IA */}
            <motion.div
              className="bg-background-card border border-border rounded-xl p-6"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-accent-cyan animate-pulse" />
                <div className="h-6 w-48 bg-background-light rounded animate-pulse" />
              </div>

              {/* Resumen Ejecutivo skeleton */}
              <div className="space-y-4 mb-6">
                <div className="h-4 w-32 bg-background-light rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-background-light rounded animate-pulse" />
                  <div className="h-4 w-full bg-background-light rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-background-light rounded animate-pulse" />
                </div>
              </div>

              {/* Factores Principales skeleton */}
              <div className="space-y-4 mb-6">
                <div className="h-4 w-40 bg-background-light rounded animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-2">
                      <div className="h-4 w-4 bg-background-light rounded-full animate-pulse mt-0.5" />
                      <div className="h-4 flex-1 bg-background-light rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendaciones skeleton */}
              <div className="space-y-4">
                <div className="h-4 w-36 bg-background-light rounded animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-2">
                      <div className="h-4 w-4 bg-background-light rounded-full animate-pulse mt-0.5" />
                      <div className="h-4 flex-1 bg-background-light rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Gráfico SHAP skeleton */}
            <motion.div
              className="bg-background-card border border-border rounded-xl p-6"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              <div className="h-6 w-56 bg-background-light rounded mb-6 animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-4 w-32 bg-background-light rounded animate-pulse" />
                    <div className="flex-1 h-8 bg-background-light rounded-lg animate-pulse" />
                    <div className="h-4 w-16 bg-background-light rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Nota SHAP skeleton */}
            <div className="p-4 bg-accent-cyan/5 border border-accent-cyan/20 rounded-lg">
              <div className="h-4 w-48 bg-accent-cyan/10 rounded mb-2 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-accent-cyan/10 rounded animate-pulse" />
                <div className="h-3 w-full bg-accent-cyan/10 rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-accent-cyan/10 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Texto de carga central */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-background-card/95 backdrop-blur-sm border border-border rounded-xl p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-8 h-8 border-4 border-accent-cyan border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Analizando Contrato
                </h3>
                <p className="text-sm text-foreground-muted">
                  Obteniendo análisis detallado del modelo de IA...
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
