/**
 * ExplainabilitySection - Sección de IA Explicable
 *
 * Patrón de diseño: Feature Highlight Pattern
 * - Enfoque en la explicabilidad como diferenciador
 * - Muestra el valor de combinar análisis interpretable + LLM
 *
 * Características:
 * - Explicación visual del proceso de razonamiento
 * - Cards con ejemplos de explicaciones
 * - Layout asimétrico para destacar contenido
 * - Énfasis en toma de decisiones informadas
 *
 * @component
 */

"use client";

import { motion } from "framer-motion";
import { Brain, FileText, CheckCircle, ArrowRight } from "lucide-react";

/**
 * Variants para animaciones orquestadas
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const rightItemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

/**
 * Beneficios de la explicabilidad
 */
const benefits = [
  {
    icon: Brain,
    title: "Razonamiento Transparente",
    description:
      "Cada predicción viene acompañada de su explicación. Sabes exactamente qué variables influyeron y por qué.",
  },
  {
    icon: FileText,
    title: "Lenguaje Natural",
    description:
      "No necesitas ser científico de datos. Las explicaciones están en español claro y comprensible para auditores.",
  },
  {
    icon: CheckCircle,
    title: "Decisiones Informadas",
    description:
      "Combina el criterio humano con insights de IA. Prioriza auditorías con confianza y evidencia.",
  },
];

/**
 * ExplainabilitySection - IA Explicable
 */
export function ExplainabilitySection() {
  return (
    <section className="relative py-24 px-4 bg-background-light overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-accent-cyan/10 via-transparent to-accent-violet/10" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              IA que{" "}
              <span className="bg-linear-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
                Explica sus Conclusiones
              </span>
            </h2>

            <p className="text-lg text-foreground-muted mb-8">
              No basta con decir "este contrato es anómalo". RadarCol utiliza
              técnicas de interpretabilidad avanzada combinadas con inteligencia
              generativa para explicar el porqué en términos que un auditor
              humano puede entender y actuar.
            </p>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex gap-4 p-4 rounded-xl bg-background-card/50 border border-border/50 hover:border-accent-cyan/30 transition-colors"
                  >
                    <div className="shrink-0 p-2 rounded-lg bg-accent-cyan/10">
                      <Icon className="w-5 h-5 text-accent-cyan" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-foreground-muted">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Visual Example */}
          <motion.div variants={rightItemVariants} className="relative">
            {/* Example Card */}
            <div className="p-8 rounded-2xl bg-background-card border border-border shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent-violet/10">
                  <Brain className="w-6 h-6 text-accent-violet" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Ejemplo de Explicación
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    Análisis de Contrato #12345
                  </p>
                </div>
              </div>

              {/* Mock Explanation */}
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-alert-high-bg border border-alert-high/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-alert-high" />
                    <span className="font-semibold text-alert-high text-sm">
                      Riesgo Alto Detectado
                    </span>
                  </div>
                  <p className="text-sm text-foreground-muted">
                    Este contrato presenta desviaciones significativas en 3
                    factores clave:
                  </p>
                </div>

                <div className="space-y-2 pl-4 border-l-2 border-accent-cyan/30">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground">
                      <strong>Duración inusual:</strong> 480 días excede el
                      promedio histórico en 320%
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground">
                      <strong>Valor atípico:</strong> Monto fuera del rango
                      esperado para esta categoría
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground">
                      <strong>Patrón de adjudicación:</strong> Proceso sin
                      competencia efectiva
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-foreground-muted italic">
                    💡 Recomendación: Priorizar auditoría detallada de este
                    contrato
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-accent-violet border border-accent-violet/30 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-sm font-semibold text-white">
                Lenguaje Natural
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
