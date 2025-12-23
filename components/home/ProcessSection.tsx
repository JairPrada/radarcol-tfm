/**
 * ProcessSection - El proceso de detección de anomalías en 3 pasos
 * 
 * Patrón de diseño: Timeline Pattern
 * - Muestra proceso secuencial simplificado
 * - Enfoque en la explicabilidad y transparencia
 * 
 * Características:
 * - 3 pasos del proceso de análisis inteligente
 * - Layout responsivo con numeración clara
 * - Animaciones de entrada escalonadas
 * - Iconos contextuales sin revelar arquitectura
 * 
 * @component
 */

"use client";

import { motion } from "framer-motion";
import { Database, Scan, MessageSquare } from "lucide-react";

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

/**
 * Proceso simplificado en 3 pasos
 */
const steps = [
  {
    number: "01",
    icon: Database,
    title: "Ingesta Inteligente",
    description:
      "Procesamiento masivo de más de 5 millones de registros históricos de SECOP. Consolidamos datos abiertos en tiempo real para un análisis exhaustivo.",
    highlight: "+5M contratos",
  },
  {
    number: "02",
    icon: Scan,
    title: "Detección Multidimensional",
    description:
      "Nuestros algoritmos identifican patrones fuera de la norma en más de 50 indicadores clave. Detectamos desviaciones de comportamiento y anomalías operativas en milisegundos.",
    highlight: "+50 indicadores",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "IA Explicable",
    description:
      "No solo decimos \"es anómalo\". Explicamos el porqué en lenguaje natural. Combinamos análisis interpretable con inteligencia generativa para que auditores tomen decisiones informadas.",
    highlight: "Lenguaje natural",
  },
];

/**
 * ProcessSection - Proceso de detección
 */
export function ProcessSection() {
  return (
    <section className="relative py-24 px-4 bg-background-light">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Cómo Detectamos{" "}
            <span className="bg-linear-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
              Riesgos de Gestión
            </span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Proceso automatizado que convierte datos abiertos en alertas
            tempranas, con explicaciones comprensibles para decisiones rápidas.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex flex-col group"
              >
                {/* Number Badge */}
                <div className="absolute -top-6 left-0 w-14 h-14 rounded-full bg-accent-cyan/10 border-2 border-accent-cyan flex items-center justify-center font-mono font-bold text-accent-cyan text-lg z-10">
                  {step.number}
                </div>

                {/* Card */}
                <div className="h-full pt-12 p-8 rounded-2xl bg-background-card border border-border hover:border-accent-violet/50 transition-all duration-300 group-hover:shadow-xl">
                  {/* Icon */}
                  <div className="mb-6 inline-flex p-4 rounded-xl bg-accent-violet/10 group-hover:bg-accent-violet/20 transition-colors">
                    <Icon className="w-8 h-8 text-accent-violet" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground-muted leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Highlight Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30">
                    <span className="text-sm font-semibold text-accent-cyan">
                      {step.highlight}
                    </span>
                  </div>
                </div>

                {/* Connector Arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-0 left-full w-8 h-1 bg-linear-to-r from-accent-cyan to-accent-violet opacity-50 translate-y-6" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
