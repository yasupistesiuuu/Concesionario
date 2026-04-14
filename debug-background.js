import { chromium } from '@playwright/test';

async function debugBackground() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    console.log('🔍 Debugueando fondo...\n');
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(4000);

    const debug = await page.evaluate(() => {
      const info = {
        canvases: [],
        containers: [],
        errors: [],
        rendering: false
      };

      // Check all canvases
      document.querySelectorAll('canvas').forEach((canvas, i) => {
        const rect = canvas.getBoundingClientRect();
        const style = window.getComputedStyle(canvas);
        const ctx = canvas.getContext('webgl') || canvas.getContext('webgl2');
        
        info.canvases.push({
          index: i,
          id: canvas.id,
          size: `${canvas.width}x${canvas.height}`,
          position: `${Math.round(rect.top)}, ${Math.round(rect.left)}`,
          displaySize: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
          zIndex: style.zIndex,
          visibility: style.visibility,
          display: style.display,
          webglContext: !!ctx,
          opacity: style.opacity
        });
      });

      // Check fixed divs
      document.querySelectorAll('div.fixed').forEach((div, i) => {
        const style = window.getComputedStyle(div);
        const rect = div.getBoundingClientRect();
        
        info.containers.push({
          index: i,
          id: div.id,
          class: div.className,
          zIndex: style.zIndex,
          position: `${Math.round(rect.top)}, ${Math.round(rect.left)}`,
          size: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
          hasChildren: div.children.length
        });
      });

      return info;
    });

    console.log('📊 Canvases encontrados:', debug.canvases.length);
    debug.canvases.forEach(canvas => {
      console.log(`\n  Canvas ${canvas.index}:`);
      console.log(`    Tamaño: ${canvas.size}px`);
      console.log(`    Pantalla: ${canvas.displaySize}px`);
      console.log(`    Posición: (${canvas.position})`);
      console.log(`    Z-Index: ${canvas.zIndex}`);
      console.log(`    WebGL: ${canvas.webglContext ? '✅' : '❌'}`);
      console.log(`    Opacity: ${canvas.opacity}`);
      console.log(`    Visibility: ${canvas.visibility}`);
      console.log(`    Display: ${canvas.display}`);
    });

    console.log(`\n📦 Contenedores fixed: ${debug.containers.length}`);
    debug.containers.forEach(container => {
      console.log(`\n  Container ${container.index}:`);
      console.log(`    Class: ${container.class}`);
      console.log(`    Z-Index: ${container.zIndex}`);
      console.log(`    Tamaño: ${container.size}px`);
      console.log(`    Hijos: ${container.hasChildren}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

debugBackground();
