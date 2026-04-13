# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Autos Velacruz E2E Tests >> Index page loads properly with Navbar and Hero
- Location: tests\app.spec.ts:5:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected substring: "Encuentra el coche"
Error: strict mode violation: locator('h1') resolved to 5 elements:
    1) <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">…</h1> aka getByRole('heading', { name: 'Encuentra el coche que mereces' })
    2) <h1>…</h1> aka getByText('No islands detected.')
    3) <h1>Audit</h1> aka locator('#header-left').getByText('Audit')
    4) <h1>No accessibility or performance issues detected.</h1> aka getByText('No accessibility or')
    5) <h1>…</h1> aka locator('h1').filter({ hasText: 'Settings' })

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - link "Autos Velacruz" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e7]: Autos
        - text: Velacruz
      - navigation [ref=e8]:
        - link "Inicio" [ref=e9] [cursor=pointer]:
          - /url: /
        - link "Vehículos de Ocasión" [ref=e10] [cursor=pointer]:
          - /url: /vehiculos-ocasion
        - link "Compramos tu Coche" [ref=e11] [cursor=pointer]:
          - /url: /compramos-tu-coche
        - link "Financiación" [ref=e12] [cursor=pointer]:
          - /url: "#"
        - link "Garantía" [ref=e13] [cursor=pointer]:
          - /url: "#"
        - link "Contacto" [ref=e14] [cursor=pointer]:
          - /url: /contacto
  - main [ref=e15]:
    - generic [ref=e16]:
      - img "Autos Velacruz Premium Showcase" [ref=e18]
      - generic [ref=e20]:
        - generic [ref=e21]: Tu concesionario premium en Valdemoro
        - heading "Encuentra el coche que mereces" [level=1] [ref=e25]:
          - text: Encuentra el coche
          - text: que mereces
        - paragraph [ref=e26]: Revisión exhaustiva, transparencia y tratos personalizados. Disfruta de la máxima calidad y confianza en la compra de tu próximo vehículo de ocasión.
        - generic [ref=e27]:
          - link "Ver Catálogo" [ref=e28] [cursor=pointer]:
            - /url: /vehiculos-ocasion
          - link "Tasar mi coche" [ref=e29] [cursor=pointer]:
            - /url: /compramos-tu-coche
    - generic [ref=e30]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - heading "Vehículos Destacados" [level=2] [ref=e33]
          - paragraph [ref=e34]: Nuestra selección premium de la semana, revisada y garantizada.
        - link "Ver catálogo completo" [ref=e35] [cursor=pointer]:
          - /url: /vehiculos-ocasion
          - text: Ver catálogo completo
          - img [ref=e36]
      - generic [ref=e38]:
        - article [ref=e39]:
          - generic [ref=e40]:
            - img "Audi A6 ultra Avant" [ref=e41]
            - generic [ref=e42]: Disponible
          - generic [ref=e43]:
            - heading "Audi A6 ultra Avant" [level=3] [ref=e44]
            - generic [ref=e46]:
              - img [ref=e47]
              - text: 186.000 km
            - generic [ref=e49]:
              - generic [ref=e50]: 17.900 €
              - link "Me interesa" [ref=e51] [cursor=pointer]:
                - /url: /contacto?car=1
        - article [ref=e52]:
          - generic [ref=e53]:
            - img "Peugeot 5008 Sport pack" [ref=e54]
            - generic [ref=e55]: Disponible
          - generic [ref=e56]:
            - heading "Peugeot 5008 Sport pack" [level=3] [ref=e57]
            - generic [ref=e59]:
              - img [ref=e60]
              - text: 138.000 km
            - generic [ref=e62]:
              - generic [ref=e63]: 7.900 €
              - link "Me interesa" [ref=e64] [cursor=pointer]:
                - /url: /contacto?car=2
        - article [ref=e65]:
          - generic [ref=e66]:
            - img "Seat Alhambra 2.0 TDI Ecomotive" [ref=e67]
            - generic [ref=e68]: Disponible
          - generic [ref=e69]:
            - heading "Seat Alhambra 2.0 TDI Ecomotive" [level=3] [ref=e70]
            - generic [ref=e72]:
              - img [ref=e73]
              - text: 138.856 km
            - generic [ref=e75]:
              - generic [ref=e76]: 15.500 €
              - link "Me interesa" [ref=e77] [cursor=pointer]:
                - /url: /contacto?car=3
    - generic [ref=e79]:
      - heading "Por qué elegir Velacruz" [level=2] [ref=e80]
      - generic [ref=e81]:
        - generic [ref=e82]:
          - img [ref=e84]
          - heading "Revisión Exhaustiva" [level=3] [ref=e86]
          - paragraph [ref=e87]: Revisamos cada vehículo minuciosamente antes de su venta para garantizar su perfecto estado.
        - generic [ref=e88]:
          - img [ref=e90]
          - heading "Financiación Personalizada" [level=3] [ref=e92]
          - paragraph [ref=e93]: Adaptamos la financiación a tus necesidades para que te lleves el coche que deseas sin preocupaciones.
        - generic [ref=e94]:
          - img [ref=e96]
          - heading "Entrega a Domicilio" [level=3] [ref=e98]
          - paragraph [ref=e99]: Entregamos tu nuevo vehículo directamente en la puerta de tu casa en cualquier punto de la península.
  - contentinfo [ref=e100]:
    - paragraph [ref=e101]: © 2026 Autos Velacruz. Todos los derechos reservados.
  - generic [ref=e104]:
    - button "Menu" [ref=e105]:
      - img [ref=e107]
      - generic: Menu
    - button "Inspect" [ref=e111]:
      - img [ref=e113]
      - generic: Inspect
    - button "Audit" [ref=e115]:
      - generic [ref=e116]:
        - img [ref=e117]
        - img [ref=e120]
      - generic: Audit
    - button "Settings" [ref=e123]:
      - img [ref=e125]
      - generic: Settings
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Autos Velacruz E2E Tests', () => {
  4  | 
  5  |   test('Index page loads properly with Navbar and Hero', async ({ page }) => {
  6  |     await page.goto('/');
  7  |     
  8  |     // Check Title
  9  |     await expect(page).toHaveTitle(/Inicio \| Autos Velacruz/);
  10 |     
  11 |     // Check Navbar
  12 |     const navbar = page.locator('header nav');
  13 |     await expect(navbar).toBeVisible();
  14 |     await expect(navbar.locator('a', { hasText: 'Inicio' })).toBeVisible();
  15 |     
  16 |     // Check Hero text
> 17 |     await expect(page.locator('h1')).toContainText('Encuentra el coche');
     |                                      ^ Error: expect(locator).toContainText(expected) failed
  18 |   });
  19 | 
  20 |   test('Vehiculos Ocasión page loads and shows cars', async ({ page }) => {
  21 |     await page.goto('/vehiculos-ocasion');
  22 |     
  23 |     await expect(page).toHaveTitle(/Vehículos de Ocasión \| Autos Velacruz/);
  24 |     await expect(page.locator('h1')).toContainText(/Catálogo de/i);
  25 |     
  26 |     // Should have 4 cars based on our data
  27 |     const carCards = page.locator('article');
  28 |     await expect(carCards).toHaveCount(4);
  29 |     
  30 |     // Verify none of the images are broken
  31 |     const images = page.locator('article img');
  32 |     for (let i = 0; i < await images.count(); i++) {
  33 |         const src = await images.nth(i).getAttribute('src');
  34 |         expect(src).toBeTruthy();
  35 |     }
  36 |   });
  37 | 
  38 |   test('Compramos tu Coche page loads with form', async ({ page }) => {
  39 |     await page.goto('/compramos-tu-coche');
  40 |     
  41 |     await expect(page.locator('h1')).toContainText('Máxima Tasación');
  42 |     
  43 |     // Check inputs exist
  44 |     await expect(page.locator('input[placeholder="Ej. Audi"]')).toBeVisible();
  45 |     await expect(page.locator('button', { hasText: 'Solicitar Tasación Gratuita' })).toBeVisible();
  46 |   });
  47 | 
  48 |   test('Contacto page loads with info and form', async ({ page }) => {
  49 |     await page.goto('/contacto');
  50 |     
  51 |     await expect(page.locator('h1')).toContainText('Contacta con Nosotros');
  52 |     
  53 |     // Check that phone number is present
  54 |     await expect(page.locator('p', { hasText: '644 898 574' })).toBeVisible();
  55 |   });
  56 | 
  57 | });
  58 | 
```