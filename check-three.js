import { chromium } from '@playwright/test';

async function checkThree() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  try {
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Check for canvas
    const canvasInfo = await page.evaluate(() => {
      const canvas = document.getElementById('three-canvas');
      if (!canvas) return { exists: false };

      return {
        exists: true,
        width: canvas.width,
        height: canvas.height,
        hasContext: canvas.getContext('webgl') !== null
      };
    });

    console.log('\n📊 Three.js Canvas Status:');
    if (canvasInfo.exists) {
      console.log(`✅ Canvas encontrado: ${canvasInfo.width}x${canvasInfo.height}`);
      console.log(`🖥️ WebGL Context: ${canvasInfo.hasContext ? '✅' : '❌'}`);
    } else {
      console.log('❌ Canvas #three-canvas no encontrado');
    }

    // Check for errors
    const errors = await page.evaluate(() => {
      const logs = [];
      const originalError = console.error;
      const originalWarn = console.warn;

      return {
        canvasId: document.getElementById('three-canvas') ? 'found' : 'not found',
        scripts: Array.from(document.scripts).length,
      };
    });

    console.log(`\n📄 Elementos:`);
    console.log(`   Canvas: ${errors.canvasId}`);
    console.log(`   Scripts cargados: ${errors.scripts}`);

    // Take screenshot
    await page.screenshot({ path: 'three-check.png', fullPage: false });
    console.log('\n📸 Screenshot: three-check.png');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

checkThree();
