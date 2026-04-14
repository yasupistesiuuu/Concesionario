import { chromium } from '@playwright/test';

async function checkSite() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    console.log('🔍 Verificando sitio en vivo...\n');
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Check for errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Check for issues
    const issues = await page.evaluate(() => {
      const issues = [];
      
      // Check background
      const bgDiv = document.querySelector('[style*="100vw"]') || 
                   document.body.querySelector('div.fixed.top-0');
      
      if (!bgDiv) {
        issues.push('❌ Background div no encontrado');
      } else {
        const style = window.getComputedStyle(bgDiv);
        if (style.position !== 'fixed') {
          issues.push(`❌ Background position: ${style.position} (esperado: fixed)`);
        }
        if (style.zIndex !== '0') {
          issues.push(`❌ Background z-index: ${style.zIndex} (esperado: 0)`);
        }
      }

      // Check content visibility
      const content = document.querySelector('[class*="relative"][class*="z-10"]') ||
                     document.querySelector('main') ||
                     document.body.children[1];
      
      if (content) {
        const style = window.getComputedStyle(content);
        if (style.zIndex < 10) {
          issues.push(`⚠️ Content z-index: ${style.zIndex} (podría tener problemas)`);
        }
      }

      // Check for canvas
      const canvas = document.querySelector('canvas');
      if (canvas) {
        issues.push('✅ Canvas encontrado');
      }

      return issues;
    });

    console.log('📋 Verificación de elementos:');
    if (issues.length === 0) {
      console.log('✅ No se encontraron problemas');
    } else {
      issues.forEach(issue => console.log(issue));
    }

    // Take screenshot
    await page.screenshot({
      path: 'check-live.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot guardado: check-live.png');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

checkSite();
