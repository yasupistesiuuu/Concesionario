import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Ir a la página sobre-nosotros en local
    await page.goto('http://localhost:4321/sobre-nosotros', { waitUntil: 'networkidle' });

    // Tomar una captura de pantalla
    await page.screenshot({
      path: 'sobre-nosotros-screenshot.png',
      fullPage: true
    });

    console.log('✅ Screenshot tomado: sobre-nosotros-screenshot.png');

    // Verificar la estructura del DOM
    const mainContent = await page.locator('main, [role="main"]').count();
    const sections = await page.locator('section').count();
    const containers = await page.locator('.container').count();

    console.log(`\n📊 Análisis del layout:`);
    console.log(`   - Main/content: ${mainContent}`);
    console.log(`   - Sections: ${sections}`);
    console.log(`   - Containers: ${containers}`);

    // Verificar si el layout está roto
    const bodyWidth = await page.evaluate(() => document.body.offsetWidth);
    const htmlWidth = await page.evaluate(() => document.documentElement.offsetWidth);

    console.log(`\n📏 Dimensiones:`);
    console.log(`   - Body width: ${bodyWidth}px`);
    console.log(`   - HTML width: ${htmlWidth}px`);
    console.log(`   - Overflow: ${bodyWidth !== htmlWidth ? '⚠️ DETECTADO' : '✅ OK'}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
