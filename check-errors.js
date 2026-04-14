import { chromium } from '@playwright/test';

async function checkErrors() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  const errors = [];
  const logs = [];

  page.on('console', msg => {
    const text = msg.text();
    logs.push(`[${msg.type()}] ${text}`);
    if (msg.type() === 'error') {
      errors.push(text);
    }
  });

  try {
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);

    const domInfo = await page.evaluate(() => {
      return {
        backgroundContainer: !!document.getElementById('three-background-container'),
        canvas: !!document.querySelector('canvas'),
        body: !!document.body,
        errors: []
      };
    });

    console.log('🔍 DOM Check:');
    console.log(`   Background container: ${domInfo.backgroundContainer ? '✅' : '❌'}`);
    console.log(`   Canvas: ${domInfo.canvas ? '✅' : '❌'}`);

    if (errors.length > 0) {
      console.log('\n❌ Errors encontrados:');
      errors.forEach(err => console.log(`   ${err}`));
    } else {
      console.log('\n✅ Sin errores en consola');
    }

    console.log('\n📝 Console logs:');
    logs.forEach(log => console.log(`   ${log}`));

  } catch (error) {
    console.error('Fatal:', error.message);
  } finally {
    await browser.close();
  }
}

checkErrors();
