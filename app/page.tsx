/**
 * Home Page - Landing principal de RadarCol
 * 
 * Patrón de diseño: Composite Pattern
 * - Compone múltiples componentes independientes (HeroSection, futuras secciones)
 * - Cada sección es autocontenida y reutilizable
 * - Facilita agregar/remover secciones sin afectar otras
 * 
 * Arquitectura: Server Component (Next.js 14+)
 * - Por defecto es Server Component, pero HeroSection usa 'use client' internamente
 * - Optimiza el bundle: solo el código interactivo se envía al cliente
 * 
 * @page
 */

import {
  HeroSection,
  ProcessSection,
  MetricsSection,
  ExplainabilitySection,
  CTASection,
} from "@/components/home";
import { ParticlesBackground } from "@/components/ui";

/**
 * Página principal del landing
 * 
 * Estructura modular que facilita extensión:
 * - ParticlesBackground: Efecto visual cyberpunk de fondo
 * - HeroSection: Presentación principal con CTA
 * - FeaturesSection: (futuro) Detalles de funcionalidades
 * - StatsSection: (futuro) Estadísticas de impacto
 * - TestimonialsSection: (futuro) Casos de éxito
 */
export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>
      <div className="relative z-10">
        <HeroSection />
        <ProcessSection />
        <ExplainabilitySection />
        <MetricsSection />
        <CTASection />
      </div>
    </main>
  );
}
