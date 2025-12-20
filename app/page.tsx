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

import { HeroSection } from "@/components/home/HeroSection";

/**
 * Página principal del landing
 * 
 * Estructura modular que facilita extensión:
 * - HeroSection: Presentación principal con CTA
 * - FeaturesSection: (futuro) Detalles de funcionalidades
 * - StatsSection: (futuro) Estadísticas de impacto
 * - TestimonialsSection: (futuro) Casos de éxito
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Futuras secciones se agregarán aquí en pasos posteriores */}
    </main>
  );
}
