import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Infinity, Rocket, Shield, Brain, Play, ChevronDown } from 'lucide-react';

const AnoAI = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

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
          vec2 shake = vec2(sin(iTime * 1.2) * 0.008, cos(iTime * 2.1) * 0.008);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(8.0, -5.0, 5.0, 8.0);
          vec2 v;
          vec4 o = vec4(0.0);

          // Deep space background with stars
          vec3 starField = vec3(0.01);
          for (float i = 0.0; i < 10.0; i++) {
            float star = rand(floor(p * 50.0 + i));
            starField += vec3(star * 0.3) * smoothstep(0.95, 1.0, star);
          }

          float f = 2.5 + fbm(p + vec2(iTime * 3.0, iTime * 1.5)) * 0.7;

          // More asteroids with enhanced movement
          for (float i = 0.0; i < 85.0; i++) {
            v = p + cos(i * i + (iTime + p.x * 0.15) * 0.04 + i * vec2(13.0, 11.0)) * 4.5
              + vec2(sin(iTime * 2.5 + i * 0.3) * 0.008, cos(iTime * 3.2 - i * 0.2) * 0.008)
              + vec2(sin(iTime * 1.3 + i) * 0.005, cos(iTime * 1.7 - i) * 0.005);

            float tailNoise = fbm(v + vec2(iTime * 0.7, i)) * 0.4 * (1.0 - (i / 85.0));
            float depthFactor = sin(i * 0.3 + iTime * 0.5) * 0.5 + 0.7;

            // Brand Pure Yellow/Gold asteroids with glow
            vec4 yellowAsteroid = vec4(
              1.0,                                            // R: Pure red
              0.75 + 0.2 * sin(i * 0.15 + iTime * 0.5),      // G: Yellow-gold variation
              0.0,                                            // B: Pure yellow (no blue)
              1.0
            );

            float distance = length(max(v, vec2(v.x * f * 0.012, v.y * 1.2)));
            vec4 currentContribution = yellowAsteroid * exp(sin(i * i + iTime * 1.2)) / (distance + 0.5);

            float thinnessFactor = smoothstep(0.0, 1.0, i / 85.0) * 0.75;
            float glowEffect = exp(-distance * 2.0) * depthFactor;

            o += currentContribution * (1.5 + tailNoise * 1.2) * thinnessFactor * (1.0 + glowEffect);
          }

          // Deep blue background (outer space)
          vec3 bgBlue = vec3(0.0, 0.04, 0.15) + starField;

          // Add depth with radial gradient
          vec2 centerDist = gl_FragCoord.xy / iResolution.xy - 0.5;
          float vignette = 1.0 - length(centerDist) * 0.3;
          bgBlue *= vignette;

          o = tanh(pow(o / 80.0, vec4(1.5)));

          // Composite: Glowing yellow asteroids on deep space background
          vec3 final = mix(bgBlue, o.rgb, min(o.a * 1.2, 1.0));
          gl_FragColor = vec4(final, 1.0);
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      <div className="relative z-10 divider" />
    </div>
  );
};

export default AnoAI;
