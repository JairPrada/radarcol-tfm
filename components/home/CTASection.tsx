/**
 * CTASection - Llamado a acción final
 * 
 * Patrón de diseño: Call-to-Action Pattern
 * - Sección destacada con fondo gradient
 * - Enfoque en transformación y eficiencia
 * - CTA claro y directo
 * 
 * Características:
 * - Gradient background cyan→violet
 * - Texto corporativo y confiable
 * - Botón principal con GlowButton
 * - Trust indicators
 * 
 * @component
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { GlowButton } from "@/components/ui/GlowButton";

/**
 * Variants para animaciones
 */
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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
 * CTASection - Llamado a acción final
 */
export function CTASection() {
  return (
    <section className="relative py-24 px-4 bg-background overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-r from-accent-cyan/20 via-accent-violet/20 to-accent-cyan/20 blur-3xl opacity-40" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30">
            <Shield className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-semibold text-accent-cyan">
              Transparencia Pública
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Transforma Datos Abiertos en{" "}
          <span className="bg-linear-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
            Alertas Tempranas
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-foreground-muted mb-10 max-w-2xl mx-auto"
        >
          Detecta anomalías operativas y riesgos de gestión en contratación
          pública con inteligencia artificial explicable. Prioriza auditorías
          con confianza.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link href="/dashboard">
            <GlowButton variant="cyan" size="lg">
              <span className="flex items-center gap-2">
                Comenzar Análisis
                <ArrowRight className="w-5 h-5" />
              </span>
            </GlowButton>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground-muted"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-cyan" />
            <span>API en tiempo real</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-violet" />
            <span>+5M contratos históricos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-cyan" />
            <span>Explicaciones en lenguaje natural</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
