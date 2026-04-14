import { chromium } from '@playwright/test';

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  const logs = [];

  page.on('console', msg => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });

  try {
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    const info = await page.evaluate(() => {
      return {
        containerFound: !!document.getElementById('three-bg'),
        canvasFound: !!document.querySelector('canvas'),
        logsFromPage: []
      };
    });

    console.log('✅ three-bg container:', info.containerFound ? 'FOUND' : 'NOT FOUND');
    console.log('✅ Canvas:', info.canvasFound ? 'FOUND' : 'NOT FOUND');

    console.log('\n📝 Console:');
    logs.filter(l => l.includes('successfully') || l.includes('initialized') || l.includes('error') || l.includes('Error')).forEach(l => console.log(l));

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

test();
