import { chromium } from '@playwright/test';

async function inspectDOM() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    const html = await page.evaluate(() => {
      return {
        bodyHTML: document.body.innerHTML.substring(0, 2000),
        allIds: Array.from(document.querySelectorAll('[id]')).map(el => ({
          id: el.id,
          tag: el.tagName
        })),
        allCanvases: Array.from(document.querySelectorAll('canvas')).map(el => ({
          parent: el.parentElement?.id || el.parentElement?.tagName,
          width: el.width,
          height: el.height
        }))
      };
    });

    console.log('📋 IDs en el DOM:');
    html.allIds.forEach(el => console.log(`   <${el.tag}> id="${el.id}"`));

    console.log('\n🎬 Canvas elements:');
    html.allCanvases.forEach((c, i) => {
      console.log(`   Canvas ${i}: ${c.width}x${c.height}, parent: ${c.parent}`);
    });

    console.log('\n📄 Body HTML (primeros 2000 chars):');
    console.log(html.bodyHTML);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

inspectDOM();
