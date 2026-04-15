'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AnimatedShaderBackgroundProps {
  opacity?: number;
  intensity?: number;
}

const AnimatedShaderBackground: React.FC<AnimatedShaderBackgroundProps> = ({
  opacity = 0.6,
  intensity = 1.0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: 'highp'
    });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Shader Material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uOpacity: { value: opacity },
        uIntensity: { value: intensity }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        uniform float uOpacity;
        uniform float uIntensity;

        #define NUM_OCTAVES 3

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);

          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.3;
          vec2 shift = vec2(100);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          vec2 shake = vec2(sin(iTime * 0.8) * 0.003, cos(iTime * 1.3) * 0.003);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec2 v;
          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 3.0, 0.0)) * 0.5;

          for (float i = 0.0; i < 28.0; i++) {
            v = p + cos(i * i + (iTime + p.x * 0.08) * 0.02 + i * vec2(13.0, 11.0)) * 3.0 + vec2(sin(iTime * 2.0 + i) * 0.002, cos(iTime * 2.5 - i) * 0.002);
            float tailNoise = fbm(v + vec2(iTime * 0.3, i)) * 0.25 * (1.0 - (i / 28.0));

            // Luxury Gold & Amber Colors (AUTOS VELACRUZ palette)
            vec4 luxuryColors = vec4(
              0.8 + 0.2 * sin(i * 0.1 + iTime * 0.3),        // High R for gold
              0.5 + 0.3 * cos(i * 0.2 + iTime * 0.4),        // Mid G for warmth
              0.1 + 0.1 * sin(i * 0.3 + iTime * 0.2),        // Low B for elegance
              1.0
            );

            vec4 currentContribution = luxuryColors * exp(sin(i * i + iTime * 0.6)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
            float thinnessFactor = smoothstep(0.0, 1.0, i / 28.0) * 0.5;
            o += currentContribution * (1.0 + tailNoise * 0.6) * thinnessFactor;
          }

          o = tanh(pow(o / 80.0, vec4(1.5)));
          gl_FragColor = vec4(o.rgb, o.a * uOpacity) * uIntensity;
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });

    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.iTime.value += 0.016;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!rendererRef.current || !materialRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      rendererRef.current.setSize(width, height);
      materialRef.current.uniforms.iResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && rendererRef.current?.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      geometry.dispose();
      material.dispose();
      rendererRef.current?.dispose();
    };
  }, [opacity, intensity]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -20
      }}
    />
  );
};

export default AnimatedShaderBackground;
