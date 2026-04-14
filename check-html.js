import { chromium } from '@playwright/test';

async function checkHTML() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    const response = await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    
    // Get the full HTML
    const html = await page.content();
    
    // Find three-bg in the HTML
    const hasDivInHTML = html.includes('three-bg');
    const divIndex = html.indexOf('three-bg');
    
    console.log('🔍 Checking HTML source:');
    console.log(`   three-bg found in HTML: ${hasDivInHTML ? 'YES' : 'NO'}`);
    
    if (hasDivInHTML) {
      const snippet = html.substring(Math.max(0, divIndex - 100), Math.min(html.length, divIndex + 200));
      console.log(`\n📄 Context around three-bg:\n${snippet}`);
    }
    
    // Check for Three.js script
    const hasThreeInit = html.includes('Three.js background initialized');
    console.log(`\n   Three.js init found: ${hasThreeInit ? 'YES' : 'NO'}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

checkHTML();
