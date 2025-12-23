/**
 * MetricsSection - Métricas generales de la plataforma
 * 
 * Patrón de diseño: Metrics Dashboard Pattern
 * - Enfoque en volumen, velocidad y capacidad
 * - Sin comprometer detalles técnicos internos
 * 
 * Características:
 * - Métricas de impacto sin revelar arquitectura
 * - Animaciones de contador progresivo
 * - Grid responsivo
 * - Énfasis en eficiencia y transparencia
 * 
 * @component
 */

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Database, Zap, Target, Activity } from "lucide-react";

/**
 * Variants para animaciones orquestadas
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

/**
 * Custom hook para animar contadores
 */
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * end);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [hasAnimated, end, duration]);

  return { count, setHasAnimated };
}

/**
 * Métricas generales (sin compromiso)
 */
const metrics = [
  {
    icon: Database,
    value: 5,
    suffix: "M+",
    label: "Contratos Analizados",
    description: "Datos históricos de SECOP procesados",
    color: "cyan" as const,
  },
  {
    icon: Zap,
    value: 100,
    suffix: "ms",
    label: "Respuesta en Tiempo Real",
    description: "Análisis completo vía API",
    color: "violet" as const,
  },
  {
    icon: Target,
    value: 50,
    suffix: "+",
    label: "Indicadores Clave",
    description: "Variables de riesgo monitoreadas",
    color: "cyan" as const,
  },
  {
    icon: Activity,
    value: 247,
    suffix: "",
    label: "Monitoreo Continuo",
    description: "Alertas tempranas automatizadas",
    color: "violet" as const,
  },
];

/**
 * MetricCard - Componente individual de métrica
 */
function MetricCard({
  icon: Icon,
  value,
  suffix,
  label,
  description,
  color,
}: {
  icon: any;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: "cyan" | "violet";
}) {
  const { count, setHasAnimated } = useCountUp(value);

  return (
    <motion.div
      variants={itemVariants}
      onViewportEnter={() => setHasAnimated(true)}
      viewport={{ once: true }}
      className="flex flex-col p-8 rounded-2xl bg-background-card border border-border hover:border-accent-cyan/50 transition-all duration-300 group"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Icon */}
      <div
        className={`mb-4 inline-flex p-3 rounded-xl transition-colors w-fit ${
          color === "cyan"
            ? "bg-accent-cyan/10 group-hover:bg-accent-cyan/20"
            : "bg-accent-violet/10 group-hover:bg-accent-violet/20"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            color === "cyan" ? "text-accent-cyan" : "text-accent-violet"
          }`}
        />
      </div>

      {/* Counter */}
      <div className="mb-2">
        <span className="text-4xl md:text-5xl font-bold text-foreground">
          {count}
        </span>
        <span
          className={`text-3xl md:text-4xl font-bold ml-1 ${
            color === "cyan" ? "text-accent-cyan" : "text-accent-violet"
          }`}
        >
          {suffix}
        </span>
      </div>

      {/* Label */}
      <h3 className="text-lg font-semibold text-foreground mb-2">{label}</h3>

      {/* Description */}
      <p className="text-sm text-foreground-muted">{description}</p>
    </motion.div>
  );
}

/**
 * MetricsSection - Métricas de capacidad
 */
export function MetricsSection() {
  return (
    <section className="relative py-24 px-4 bg-background">
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
            Capacidad y{" "}
            <span className="bg-linear-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
              Eficiencia
            </span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Métricas que demuestran nuestro enfoque en procesamiento masivo,
            respuesta inmediata y análisis exhaustivo.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
