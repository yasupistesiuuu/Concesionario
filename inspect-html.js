import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:4321/sobre-nosotros', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const html = await page.evaluate(() => {
      // Buscar todos los divs con clase flex justify-center
      const divs = document.querySelectorAll('div.flex.justify-center');
      console.log(`Encontrados ${divs.length} divs con flex justify-center`);

      for (let i = 0; i < divs.length; i++) {
        const div = divs[i];
        const classes = div.className;
        const childrenCount = div.children.length;
        const html = div.outerHTML.substring(0, 300);

        console.log(`\n--- Div ${i} ---`);
        console.log(`Classes: ${classes}`);
        console.log(`Children: ${childrenCount}`);
        console.log(`HTML: ${html}...`);
      }

      return '';
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
