import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://concesionario-luxury-8kcdu90on-yasupistesiuuus-projects.vercel.app/sobre-nosotros', { waitUntil: 'networkidle' });

    // Tomar screenshot de la sección de testimonios
    const testimonialsSection = await page.locator('section').all();
    console.log(`\n📋 Total secciones encontradas: ${testimonialsSection.length}`);

    // Buscar específicamente la sección de testimonios
    const testSection = await page.locator('section').filter({ has: page.locator('[role="presentation"], motion') }).first();

    // Verificar si hay motion.div dentro de TestimonialsColumn
    const motionDivs = await page.locator('div [style*="transform"]').count();
    console.log(`\n🎬 Motion divs encontrados: ${motionDivs}`);

    // Verificar las columnas de testimonios
    const testimonialCards = await page.locator('[class*="border-yellow"], [class*="shadow-yellow"]').count();
    console.log(`\n💬 Tarjetas de testimonios: ${testimonialCards}`);

    // Buscar elementos con translateY
    const animated = await page.evaluate(() => {
      const elements = document.querySelectorAll('[style*="translateY"], [style*="translate"]');
      return elements.length;
    });
    console.log(`\n✨ Elementos con animación translateY: ${animated}`);

    // Captura de la sección de testimonios
    const firstSection = page.locator('section').nth(5); // Testimonials suele estar en la sección 5 o 6
    await firstSection.screenshot({ path: 'testimonials-detail.png' });
    console.log(`\n📸 Screenshot de testimonios guardado: testimonials-detail.png`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
