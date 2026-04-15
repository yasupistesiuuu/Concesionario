import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Intentar diferentes puertos
    let success = false;
    for (let port of [4173, 4174, 4175]) {
      try {
        await page.goto(`http://localhost:${port}/sobre-nosotros`, { waitUntil: 'networkidle', timeout: 5000 });
        success = true;
        console.log(`✓ Servidor en puerto ${port}`);
        break;
      } catch (e) {}
    }

    if (!success) throw new Error('No se pudo conectar a ningún puerto');

    // Esperar a que Framer Motion se renderice
    await page.waitForTimeout(2000);

    // Hacer screenshot
    await page.screenshot({ path: 'preview-screenshot.png', fullPage: true });
    console.log('✓ Screenshot capturado: preview-screenshot.png');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
