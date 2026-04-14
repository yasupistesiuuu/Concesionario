import { chromium } from '@playwright/test';

async function investigate() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    const elements = await page.evaluate(() => {
      const result = {
        allDivs: [],
        elementsWithRed: [],
        allElements: []
      };

      // Get all elements with red colors
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.backgroundColor;
        const borderColor = style.borderColor;
        
        if (color.includes('255, 0, 0') || borderColor.includes('255, 0, 0') ||
            color === 'rgb(255, 0, 0)' || borderColor === 'rgb(255, 0, 0)' ||
            color.includes('red') || borderColor.includes('red')) {
          result.elementsWithRed.push({
            tag: el.tagName,
            class: el.className,
            id: el.id,
            text: el.textContent.substring(0, 50)
          });
        }
      });

      return result;
    });

    console.log('🔍 Elementos encontrados:');
    if (elements.elementsWithRed.length > 0) {
      console.log('\n⚠️ Elementos con color rojo:');
      elements.elementsWithRed.forEach((el, i) => {
        console.log(`  ${i+1}. <${el.tag}> class="${el.class}" id="${el.id}"`);
        if (el.text) console.log(`     Texto: "${el.text}"`);
      });
    } else {
      console.log('✅ No hay elementos rojos en el DOM');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

investigate();
