import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:4321/sobre-nosotros', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const content = await page.content();

    // Extrae la sección de testimonios
    const testStart = content.indexOf('Lo que nuestros');
    if (testStart > -1) {
      const snippet = content.substring(testStart - 500, testStart + 2000);
      fs.writeFileSync('testimonials-html.txt', snippet);
      console.log('✅ HTML guardado en testimonials-html.txt');
    } else {
      console.log('❌ No se encontró la sección de testimonios');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
