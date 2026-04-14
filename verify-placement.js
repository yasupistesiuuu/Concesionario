import { chromium } from '@playwright/test';

async function verifyPlacement() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  try {
    console.log('🔍 Verificando posición del fondo...\n');
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Check background div
    const bgInfo = await page.evaluate(() => {
      const bgDiv = document.body.querySelector('div[style*="100vw"]') ||
                    document.body.firstChild;

      if (!bgDiv) return { found: false };

      const style = window.getComputedStyle(bgDiv);
      const rect = bgDiv.getBoundingClientRect();

      return {
        found: true,
        position: style.position,
        zIndex: style.zIndex,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        pointerEvents: style.pointerEvents,
      };
    });

    console.log('📊 Background Div Status:');
    if (bgInfo.found) {
      console.log(`✅ Encontrado`);
      console.log(`   Position: ${bgInfo.position}`);
      console.log(`   Z-Index: ${bgInfo.zIndex}`);
      console.log(`   Tamaño: ${Math.round(bgInfo.width)}x${Math.round(bgInfo.height)}px`);
      console.log(`   Top-Left: (${Math.round(bgInfo.top)}, ${Math.round(bgInfo.left)})`);
      console.log(`   Pointer-events: ${bgInfo.pointerEvents}`);

      if (bgInfo.position === 'fixed' && bgInfo.zIndex === '0') {
        console.log('\n✅ Posicionamiento CORRECTO');
      } else {
        console.log('\n⚠️ Posicionamiento INCORRECTO');
      }
    } else {
      console.log('❌ Fondo no encontrado');
    }

    // Take full page screenshot
    await page.screenshot({
      path: 'verify-placement.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot completo: verify-placement.png');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

verifyPlacement();
