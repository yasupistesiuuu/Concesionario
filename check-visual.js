import { chromium } from '@playwright/test';

async function checkVisual() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  try {
    console.log('📸 Capturando pantalla de https://concesionario-luxury.vercel.app...\n');
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });

    // Wait for animations
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({ path: 'screenshot-hero.png', fullPage: false });
    console.log('✅ Screenshot guardado como: screenshot-hero.png');

    // Check if canvas exists
    const canvasExists = await page.evaluate(() => {
      return document.getElementById('shader-canvas') !== null;
    });

    console.log(`\n🎨 Estado del Canvas:`);
    console.log(`   Canvas elemento: ${canvasExists ? '✅ Encontrado' : '❌ NO encontrado'}`);

    // Check canvas dimensions
    const canvasInfo = await page.evaluate(() => {
      const canvas = document.getElementById('shader-canvas');
      if (!canvas) return null;
      return {
        width: canvas.width,
        height: canvas.height,
        display: window.getComputedStyle(canvas).display,
        zIndex: window.getComputedStyle(canvas).zIndex,
        position: window.getComputedStyle(canvas).position,
      };
    });

    if (canvasInfo) {
      console.log(`   Dimensiones: ${canvasInfo.width}x${canvasInfo.height}`);
      console.log(`   Display: ${canvasInfo.display}`);
      console.log(`   Z-Index: ${canvasInfo.zIndex}`);
      console.log(`   Position: ${canvasInfo.position}`);
    }

    // Check if script ran
    const scriptRan = await page.evaluate(() => {
      return typeof window.AnimatedShaderBg !== 'undefined';
    });

    console.log(`\n⚙️ Script:`);
    console.log(`   Ejecutado: ${scriptRan ? '✅ Sí' : '❌ No'}`);

    console.log('\n💾 Abre la imagen "screenshot-hero.png" para ver cómo se ve');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

checkVisual();
