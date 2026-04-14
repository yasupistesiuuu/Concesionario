import { chromium } from '@playwright/test';

async function check() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    const info = await page.evaluate(() => {
      const bgDiv = document.querySelector('[id*="gradient"]') || 
                   document.querySelector('[style*="z-index"]') ||
                   document.body.firstElementChild;
      
      if (!bgDiv) return { error: 'No bg div found' };

      const style = window.getComputedStyle(bgDiv);
      
      return {
        element: bgDiv.tagName + (bgDiv.id ? '#' + bgDiv.id : ''),
        position: style.position,
        zIndex: style.zIndex,
        background: style.background,
        backgroundColor: style.backgroundColor,
        width: style.width,
        height: style.height,
        display: style.display
      };
    });

    console.log('Element found:', info.element);
    console.log('Position:', info.position);
    console.log('Z-Index:', info.zIndex);
    console.log('Background:', info.background);
    console.log('Background-color:', info.backgroundColor);
    console.log('Display:', info.display);

  } finally {
    await browser.close();
  }
}

check();
