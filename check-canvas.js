import { chromium } from '@playwright/test';

async function checkCanvas() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  try {
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const canvasData = await page.evaluate(() => {
      const canvas = document.getElementById('shader-canvas');
      if (!canvas) return { exists: false };

      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Check if any pixel has been drawn (not all black)
      let pixelsDrawn = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 0 || data[i+1] > 0 || data[i+2] > 0) {
          pixelsDrawn++;
        }
      }

      return {
        exists: true,
        width: canvas.width,
        height: canvas.height,
        pixelsDrawn: pixelsDrawn,
        totalPixels: (canvas.width * canvas.height),
        percentDrawn: ((pixelsDrawn / (canvas.width * canvas.height)) * 100).toFixed(2)
      };
    });

    console.log('\n📊 Canvas Status:');
    if (canvasData.exists) {
      console.log(`✅ Canvas encontrado: ${canvasData.width}x${canvasData.height}`);
      console.log(`📐 Píxeles dibujados: ${canvasData.pixelsDrawn} / ${canvasData.totalPixels}`);
      console.log(`📈 Porcentaje dibujado: ${canvasData.percentDrawn}%`);

      if (canvasData.percentDrawn > 10) {
        console.log(`\n✅ El fondo ESTÁ animando correctamente`);
      } else {
        console.log(`\n⚠️ Canvas no tiene contenido visible`);
      }
    } else {
      console.log('❌ Canvas no encontrado');
    }

    // Take screenshot
    await page.screenshot({ path: 'canvas-check.png' });
    console.log('\n📸 Screenshot guardado: canvas-check.png');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

checkCanvas();
