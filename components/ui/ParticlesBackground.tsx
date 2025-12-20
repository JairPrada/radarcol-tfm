"use client";

/**
 * ParticlesBackground - Animación de partículas para fondo
 * 
 * Implementa efecto visual cyberpunk con tsParticles.
 * Usa colores del tema (cyan/violet) con movimiento fluido y enlaces sutiles.
 * 
 * Patrón de diseño: Strategy Pattern
 * - Configuración de partículas encapsulada en options
 * - Fácilmente intercambiable con diferentes configuraciones
 * 
 * Rendimiento:
 * - Usa @tsparticles/slim (versión optimizada)
 * - FPS limit 60 para evitar overhead
 * - Pocas partículas (50) para mantener fluidez
 * 
 * @component
 */

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export function ParticlesBackground() {
  /**
   * Inicializa el engine de tsParticles
   * loadSlim carga solo las características esenciales
   */
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10 pointer-events-none"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ["#06b6d4", "#8b5cf6", "#22d3ee"], // cyan, violet, cyan-glow
          },
          links: {
            enable: true,
            distance: 150,
            color: "#06b6d4",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "bounce",
            },
          },
          size: {
            value: { min: 1, max: 3 },
          },
          opacity: {
            value: { min: 0.3, max: 0.7 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
