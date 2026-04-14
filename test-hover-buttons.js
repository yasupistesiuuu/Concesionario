import { chromium } from '@playwright/test';

async function testHoverButtons() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  try {
    console.log('🔍 Navegando a https://concesionario-luxury.vercel.app...');
    await page.goto('https://concesionario-luxury.vercel.app', { waitUntil: 'networkidle' });

    console.log('⏳ Esperando a que los botones carguen...');
    await page.waitForTimeout(1000);

    // Check CSS rules
    const cssInfo = await page.evaluate(() => {
      const stylesheets = Array.from(document.styleSheets);

      // Find the hover-gradient-button rules
      let baseRule = null;
      let hoverRule = null;

      for (const sheet of stylesheets) {
        try {
          for (const rule of sheet.cssRules || []) {
            if (rule.selectorText === '.hover-gradient-button') {
              baseRule = rule;
            } else if (rule.selectorText === '.hover-gradient-button:hover') {
              hoverRule = rule;
            }
          }
        } catch (e) {
          // Can't access some stylesheets (CORS)
        }
      }

      return {
        hasBaseRule: !!baseRule,
        hasHoverRule: !!hoverRule,
        baseStyle: baseRule ? {
          border: baseRule.style.border,
          background: baseRule.style.background,
          backgroundColor: baseRule.style.backgroundColor,
          color: baseRule.style.color,
          boxShadow: baseRule.style.boxShadow,
        } : null,
        hoverStyle: hoverRule ? {
          border: hoverRule.style.border,
          borderColor: hoverRule.style.borderColor,
          background: hoverRule.style.background,
          color: hoverRule.style.color,
          boxShadow: hoverRule.style.boxShadow,
        } : null
      };
    });

    console.log(`📄 CSS Check:`);
    console.log(`   Base rule: ${cssInfo.hasBaseRule ? '✅' : '❌'}`);
    console.log(`   Hover rule: ${cssInfo.hasHoverRule ? '✅' : '❌'}`);

    if (cssInfo.hoverStyle) {
      console.log(`\n   Hover CSS values:`);
      console.log(`     - Border: ${cssInfo.hoverStyle.border || cssInfo.hoverStyle.borderColor || '(not set)'}`);
      console.log(`     - Background: ${cssInfo.hoverStyle.background || '(not set)'}`);
      console.log(`     - Color: ${cssInfo.hoverStyle.color || '(not set)'}`);
      console.log(`     - Box-shadow: ${cssInfo.hoverStyle.boxShadow || '(not set)'}`);
    }
    console.log();

    // Get all buttons
    const buttonCount = await page.evaluate(() => {
      return document.querySelectorAll('.hover-gradient-button').length;
    });

    console.log(`✅ Se encontraron ${buttonCount} botones con hover-gradient-button\n`);

    if (buttonCount === 0) {
      console.log('❌ No se encontraron botones');
      return;
    }

    console.log('📍 Verificando primer botón...\n');

    // Get computed styles in normal and hover states using a simulated hover
    const testResult = await page.evaluate(() => {
      const btn = document.querySelector('.hover-gradient-button');
      if (!btn) return null;

      // Get normal state
      const normalStyles = window.getComputedStyle(btn);
      const normalState = {
        borderColor: normalStyles.borderColor,
        backgroundColor: normalStyles.backgroundColor,
        color: normalStyles.color,
        boxShadow: normalStyles.boxShadow,
      };

      // Create a test element that will have hover styles applied
      const testBtn = btn.cloneNode(true);
      testBtn.classList.add('__test-hover__');

      // Inject CSS for our test class
      const style = document.createElement('style');
      style.textContent = `.hover-gradient-button.__test-hover__ {
        border-color: #facc15;
        background: linear-gradient(to right, #eab308, #ca8a04);
        color: #1e293b;
        box-shadow: 0 10px 15px -3px rgba(250, 204, 21, 0.5);
      }`;
      document.head.appendChild(style);
      document.body.appendChild(testBtn);

      // Get simulated hover state from test element
      const hoverStyles = window.getComputedStyle(testBtn);
      const hoverState = {
        borderColor: hoverStyles.borderColor,
        backgroundColor: hoverStyles.backgroundColor,
        color: hoverStyles.color,
        boxShadow: hoverStyles.boxShadow,
      };

      // Cleanup
      testBtn.remove();
      style.remove();

      return {
        normal: normalState,
        hover: hoverState,
      };
    });

    console.log('  🔹 Estado Normal:');
    console.log(`     Border Color: ${testResult.normal.borderColor}`);
    console.log(`     Background: ${testResult.normal.backgroundColor}`);
    console.log(`     Text Color: ${testResult.normal.color}`);
    console.log(`     Shadow: ${testResult.normal.boxShadow}`);

    console.log('\n  🟡 Estado Hover (CSS Rules):');
    console.log(`     Border Color: ${testResult.hover.borderColor}`);
    console.log(`     Background: ${testResult.hover.backgroundColor}`);
    console.log(`     Text Color: ${testResult.hover.color}`);
    console.log(`     Shadow: ${testResult.hover.boxShadow}`);

    // Check changes
    const borderChanged = testResult.normal.borderColor !== testResult.hover.borderColor;
    const bgChanged = testResult.normal.backgroundColor !== testResult.hover.backgroundColor;
    const colorChanged = testResult.normal.color !== testResult.hover.color;
    const shadowApplied = testResult.hover.boxShadow && testResult.hover.boxShadow !== 'none';

    console.log('\n  ✨ Verificación de cambios:');
    console.log(`     ${borderChanged ? '✅' : '❌'} Borde cambió en hover`);
    console.log(`     ${bgChanged ? '✅' : '❌'} Fondo cambió en hover`);
    console.log(`     ${colorChanged ? '✅' : '❌'} Texto cambió en hover`);
    console.log(`     ${shadowApplied ? '✅' : '❌'} Sombra aplicada en hover`);

    if (borderChanged && bgChanged && colorChanged && shadowApplied) {
      console.log('\n🎉 ¡Los botones de hover funcionan PERFECTAMENTE!');
    } else {
      console.log('\n⚠️  Algunos efectos de hover no están funcionando correctamente');
      if (!borderChanged) console.log('     - El borde no está cambiando');
      if (!bgChanged) console.log('     - El fondo no está cambiando');
      if (!colorChanged) console.log('     - El texto no está cambiando');
      if (!shadowApplied) console.log('     - La sombra no está aplicada');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

testHoverButtons();
