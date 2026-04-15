import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Capturar errores en consola
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`❌ JS Error: ${msg.text()}`);
    }
  });

  try {
    console.log('🔗 Conectando a Vercel...');
    await page.goto('https://concesionario-luxury.vercel.app/sobre-nosotros', { 
      waitUntil: 'networkidle' 
    });

    console.log('⏳ Esperando hidratación de React...');
    await page.waitForTimeout(4000);

    // Verificar si Framer Motion está presente
    const hasMotion = await page.evaluate(() => {
      return typeof window !== 'undefined' && 
             (typeof window.MotionConfig !== 'undefined' ||
              document.querySelector('[class*="motion"]') !== null);
    });

    console.log(`Motion presente: ${hasMotion ? '✅ SÍ' : '⚠️ NO'}`);

    // Verificar transformaciones
    const transforms = await page.evaluate(() => {
      const elements = document.querySelectorAll('div');
      const animated = [];
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.transform && style.transform !== 'none') {
          animated.push({
            tag: el.tagName,
            transform: style.transform.substring(0, 50),
            hasChildren: el.children.length
          });
        }
      });
      return animated.slice(0, 5);
    });

    console.log('\n✨ Elementos con transformación (animación):');
    transforms.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.tag} - transform: ${t.transform}... (hijos: ${t.hasChildren})`);
    });

    // Tomar screenshot
    await page.screenshot({ path: 'vercel-live.png', fullPage: true });
    console.log('\n📸 Screenshot guardado: vercel-live.png');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
