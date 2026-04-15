import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:4328/sobre-nosotros', { waitUntil: 'networkidle' });
    
    await page.waitForTimeout(3000);

    console.log('📸 Capturando screenshot del carrusel...');
    await page.screenshot({ path: 'carousel-animated.png', fullPage: true });
    console.log('✅ Screenshot guardado');

    // Tomar múltiples screenshots para verificar movimiento
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'carousel-animated-2.png', fullPage: true });
    console.log('✅ Segundo screenshot para verificar animación');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
