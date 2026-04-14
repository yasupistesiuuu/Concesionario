import { chromium } from '@playwright/test';

async function check() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    const info = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      const body = document.body;

      return {
        canvasExists: !!canvas,
        canvasId: canvas?.id || 'no id',
        canvasParent: canvas?.parentElement?.tagName,
        canvasParentId: canvas?.parentElement?.id || 'no id',
        canvasRect: canvas ? {
          width: canvas.width,
          height: canvas.height,
          clientWidth: canvas.clientWidth,
          clientHeight: canvas.clientHeight
        } : null,
        firstDivChild: body.firstElementChild?.tagName,
        firstDivId: body.firstElementChild?.id || 'no id',
        bodyChildren: Array.from(body.children).map(el => ({
          tag: el.tagName,
          id: el.id || 'no id'
        }))
      };
    });

    console.log('🔍 Detailed DOM Check:');
    console.log(`Canvas exists: ${info.canvasExists}`);
    console.log(`Canvas ID: ${info.canvasId}`);
    console.log(`Canvas parent: <${info.canvasParent}> id="${info.canvasParentId}"`);

    if (info.canvasRect) {
      console.log(`\nCanvas dimensions:  `);
      console.log(`  Actual: ${info.canvasRect.width}x${info.canvasRect.height}px`);
      console.log(`  Display: ${info.canvasRect.clientWidth}x${info.canvasRect.clientHeight}px`);
    }

    console.log(`\nBody children:`);
    info.bodyChildren.forEach((child, i) => {
      console.log(`  ${i}: <${child.tag}> id="${child.id}"`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

check();
