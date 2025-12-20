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

import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  /**
   * Inicializa el engine de tsParticles
   * Solo renderiza las partículas cuando el engine esté listo
   */
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async () => {
    console.log("Particles loaded successfully");
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      particlesLoaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
            },
          },
          color: {
            value: ["#06b6d4", "#8b5cf6", "#22d3ee"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.8,
          },
          size: {
            value: 3,
          },
          links: {
            enable: true,
            distance: 150,
            color: "#06b6d4",
            opacity: 0.6,
            width: 2,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "bounce",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 1,
              },
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
