import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://concesionario-luxury-8kcdu90on-yasupistesiuuus-projects.vercel.app/sobre-nosotros', { waitUntil: 'networkidle' });

    // Verificar si TestimonialsSection está cargada
    const testimonialText = await page.textContent('[class*="flex"][class*="justify-center"]');
    console.log(`\n📄 Contenido en flex justify-center:\n${testimonialText?.substring(0, 200) || 'No encontrado'}`);

    // Obtener todas las tarjetas de testimonios
    const cards = await page.locator('[class*="rounded-2xl"][class*="border"]').all();
    console.log(`\n📇 Tarjetas encontradas: ${cards.length}`);

    // Verificar el HTML de una columna
    const firstColumn = await page.locator('div > div > div').nth(0).innerHTML();
    console.log(`\n🔍 Primeros 300 caracteres del HTML de columna:\n${firstColumn?.substring(0, 300)}`);

    // Tomar screenshot completo de la página
    await page.screenshot({ path: 'preview-full.png', fullPage: true });
    console.log(`\n📸 Screenshot completo guardado: preview-full.png`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
