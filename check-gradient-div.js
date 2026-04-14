import { chromium } from '@playwright/test';

async function check() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });

    const info = await page.evaluate(() => {
      const divs = Array.from(document.querySelectorAll('div'));
      return {
        totalDivs: divs.length,
        hasGradientBg: !!document.getElementById('gradient-bg'),
        allDivIds: divs.filter(d => d.id).map(d => d.id).slice(0, 10),
        bodyHTML: document.body.innerHTML.substring(0, 500)
      };
    });

    console.log('Total divs:', info.totalDivs);
    console.log('Has #gradient-bg:', info.hasGradientBg);
    console.log('Div IDs:', info.allDivIds);
    console.log('\nBody HTML snippet:');
    console.log(info.bodyHTML);

  } finally {
    await browser.close();
  }
}

check();
