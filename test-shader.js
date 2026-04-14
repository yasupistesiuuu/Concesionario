import { chromium } from '@playwright/test';

async function testShader() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  const logs = [];
  const errors = [];

  page.on('console', msg => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', error => {
    errors.push(error.toString());
  });

  try {
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);

    const result = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return { error: 'No canvas found' };

      const ctx = canvas.getContext('webgl') || canvas.getContext('webgl2');
      if (!ctx) return { error: 'No WebGL context' };

      const pixels = new Uint8Array(canvas.width * canvas.height * 4);
      ctx.readPixels(0, 0, canvas.width, canvas.height, ctx.RGBA, ctx.UNSIGNED_BYTE, pixels);

      let nonBlack = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i] > 10 || pixels[i+1] > 10 || pixels[i+2] > 10) {
          nonBlack++;
        }
      }

      return {
        canvasSize: `${canvas.width}x${canvas.height}`,
        webglActive: true,
        pixelsRendered: nonBlack,
        totalPixels: pixels.length / 4
      };
    });

    console.log('📊 Canvas Analysis:');
    console.log(JSON.stringify(result, null, 2));

    if (logs.length > 0) {
      console.log('\n📝 Console logs:');
      logs.forEach(log => console.log(log));
    }

    if (errors.length > 0) {
      console.log('\n❌ Errors:');
      errors.forEach(err => console.log(err));
    }

  } catch (error) {
    console.error('Fatal:', error.message);
  } finally {
    await browser.close();
  }
}

testShader();
