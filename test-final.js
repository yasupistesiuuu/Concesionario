import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('🌐 Abriendo preview...');
    await page.goto('http://localhost:4327/sobre-nosotros', { waitUntil: 'networkidle' });

    console.log('⏳ Esperando Framer Motion...');
    await page.waitForTimeout(3000);

    console.log('📸 Capturando screenshot...');
    await page.screenshot({ path: 'final-preview.png', fullPage: true });

    console.log('✅ Screenshot guardado: final-preview.png');
    console.log('\n📊 Analizando carousel...');

    // Inspect carousel
    const info = await page.evaluate(() => {
      const container = document.querySelector('[style*="height:500px"]');
      if (!container) {
        return { error: 'Contenedor no encontrado' };
      }
      const rect = container.getBoundingClientRect();
      return {
        height: rect.height,
        width: rect.width,
        display: window.getComputedStyle(container).display,
        overflow: window.getComputedStyle(container).overflow,
      };
    });

    console.log(JSON.stringify(info, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
