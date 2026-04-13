'use client';
import React, { useEffect, useRef } from 'react';

export const LightTrailsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        vec3 color = vec3(0.04, 0.04, 0.05); // Base zinc-950 background
        
        float t = u_time * 0.8;
        float a = atan(p.y, p.x);
        float r = length(p);
        
        // Generar destellos simulando túnel de velocidad nocturna
        for(float i = 0.0; i < 50.0; i++) {
            float rndA = hash(vec2(i, 0.0)) * 6.2831;
            float speed = 0.5 + hash(vec2(i, 1.0)) * 1.5;
            float pos = fract(hash(vec2(i, 2.0)) - t * speed);
            
            float dAngle = abs(a - rndA);
            dAngle = min(dAngle, 6.2831 - dAngle);
            
            if (dAngle < 0.015) {
                float dist = pos - r;
                // Efecto de cauda de luz de los coches
                float intensity = smoothstep(0.2, 0.0, dist) * smoothstep(0.0, 0.05, -dist);
                
                // Variación de verdes y blancos
                vec3 trailC = mix(vec3(0.133, 0.773, 0.369), vec3(0.8, 1.0, 0.9), hash(vec2(i,3.0)));
                
                // Opacidad en los bordes y el centro
                color += trailC * intensity * smoothstep(0.05, 0.3, r) * smoothstep(1.5, 0.5, r);
            }
        }
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');

    let animationFrameId: number;
    const render = (time: number) => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.uniform1f(timeLoc, time * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#09090b' }}
      id="speed-lines-bg"
    />
  );
};
