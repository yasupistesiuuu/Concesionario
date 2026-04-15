import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('🔗 Verificando Vercel en vivo...');
    await page.goto('https://concesionario-luxury.vercel.app/sobre-nosotros', { 
      waitUntil: 'networkidle' 
    });

    console.log('⏳ Esperando carrusel...');
    // Capturar 3 screenshots en intervalos para ver el movimiento
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'carousel-t0.png', fullPage: false, clip: { x: 0, y: 650, width: 1280, height: 200 } });

    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'carousel-t4.png', fullPage: false, clip: { x: 0, y: 650, width: 1280, height: 200 } });

    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'carousel-t8.png', fullPage: false, clip: { x: 0, y: 650, width: 1280, height: 200 } });

    console.log('✅ Screenshots capturados');
    console.log('   - carousel-t0.png (inicio)');
    console.log('   - carousel-t4.png (4 segundos después)');
    console.log('   - carousel-t8.png (8 segundos después)');
    console.log('\nCompara las imágenes para ver el movimiento del carrusel 🎠');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
