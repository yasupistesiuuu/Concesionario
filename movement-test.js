import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const delays = [0, 3000, 6000];
  
  try {
    console.log('🔗 Conectando...');
    await page.goto('https://concesionario-luxury.vercel.app/sobre-nosotros');
    await page.waitForLoadState('networkidle');
    
    console.log('\n📸 Capturando movimiento del carrusel en 3 momentos:');
    
    for (let i = 0; i < delays.length; i++) {
      await page.waitForTimeout(delays[i] === 0 ? 1000 : delays[i]);
      
      // Obtener posición del motion.div
      const y = await page.evaluate(() => {
        const motionDivs = Array.from(document.querySelectorAll('[class*="flex"][class*="flex-col"]'))
          .filter(el => {
            const style = window.getComputedStyle(el);
            return style.transform && style.transform.includes('translateY') || style.transform.includes('matrix');
          });
        
        if (motionDivs.length > 0) {
          const transform = window.getComputedStyle(motionDivs[0]).transform;
          const match = transform.match(/[\d.\-]+/g);
          return match ? match[5] : 'N/A';
        }
        return 'No encontrado';
      });
      
      console.log(`  T=${delays[i]/1000}s: translateY = ${y}px`);
    }
    
    console.log('\n✅ Si los valores de translateY cambian, el carrusel se está moviendo correctamente');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
