import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:4321/sobre-nosotros', { waitUntil: 'networkidle' });

    // Esperar un poco para que Framer Motion se renderice
    await page.waitForTimeout(2000);

    // Obtener info sobre el contenedor de testimonios
    const containerInfo = await page.evaluate(() => {
      // Buscar el contenedor con flex justify-center
      const containers = document.querySelectorAll('[class*="flex"][class*="justify-center"]');

      let testimonialContainer = null;
      for (let container of containers) {
        if (container.textContent?.includes('Lo que nuestros') || container.textContent?.includes('opiniones')) {
          testimonialContainer = container;
          break;
        }
      }

      if (!testimonialContainer) {
        // Buscar por el mask-image
        const allDivs = document.querySelectorAll('div');
        for (let div of allDivs) {
          const style = window.getComputedStyle(div);
          if (style.maskImage || div.className?.includes('mask')) {
            testimonialContainer = div;
            break;
          }
        }
      }

      if (!testimonialContainer) {
        return { error: 'Contenedor no encontrado' };
      }

      const rect = testimonialContainer.getBoundingClientRect();
      const style = window.getComputedStyle(testimonialContainer);

      // Buscar motion.divs dentro
      const motionDivs = testimonialContainer.querySelectorAll('[style*="transform"]');

      return {
        containerHeight: rect.height,
        containerWidth: rect.width,
        overflow: style.overflow,
        maskImage: style.maskImage ? 'sí' : 'no',
        motionDivsFound: motionDivs.length,
        childDivs: testimonialContainer.children.length,
        firstChildDisplay: testimonialContainer.children[0] ? window.getComputedStyle(testimonialContainer.children[0]).display : 'N/A',
        firstChildHeight: testimonialContainer.children[0] ? testimonialContainer.children[0].getBoundingClientRect().height : 'N/A',
      };
    });

    console.log('\n📊 Información del contenedor de testimonios:');
    console.log(JSON.stringify(containerInfo, null, 2));

    // Verificar si hay animación en el HTML
    const hasAnimation = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      for (let el of allElements) {
        const style = window.getComputedStyle(el);
        if (style.animation || el.getAttribute('data-motion')) {
          return true;
        }
      }
      return false;
    });

    console.log(`\n🎬 ¿Hay animaciones detectadas?: ${hasAnimation}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
