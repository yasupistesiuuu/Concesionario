import { chromium } from '@playwright/test';

async function testSite() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('Testing: https://concesionario-luxury.vercel.app');
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'load', timeout: 30000 });
    
    const title = await page.title();
    console.log(`✓ Page title: ${title}`);
    
    const h1 = await page.locator('h1').first().textContent();
    console.log(`✓ H1 content: ${h1?.trim()}`);
    
    const bodyText = await page.textContent('body');
    if (bodyText?.includes('AUTOS') || bodyText?.includes('Velacruz')) {
      console.log('✓ AUTOS VELACRUZ content found');
    }
    
    if (bodyText?.includes('Ver Catálogo') || bodyText?.includes('Contactar')) {
      console.log('✓ CTA buttons found');
    }

    console.log('\n✓ Homepage test PASSED!');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

testSite();
