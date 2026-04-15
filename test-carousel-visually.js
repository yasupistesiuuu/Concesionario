import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false }); // Abre navegador visible
  const page = await browser.newPage();

  try {
    console.log('🌐 Abriendo página...');
    await page.goto('http://localhost:4321/sobre-nosotros', { waitUntil: 'networkidle' });

    console.log('⏳ Esperando a que Framer Motion se renderice...');
    await page.waitForTimeout(3000);

    // Hacer screenshot
    await page.screenshot({ path: 'carousel-test.png', fullPage: true });
    console.log('📸 Screenshot guardado: carousel-test.png');

    console.log('\n⏳ Página abierta en navegador. Usa F12 para inspeccionar el carrusel.');
    console.log('💡 Busca el div con class="flex justify-center" que contiene los testimonios.');
    console.log('🔍 Verifica la altura (debe ser 500px) y el overflow:hidden.');

    // Mantener navegador abierto
    await page.waitForTimeout(30000); // 30 segundos

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
