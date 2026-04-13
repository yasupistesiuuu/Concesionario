# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Autos Velacruz E2E Tests >> Vehiculos Ocasión page loads and shows cars
- Location: tests\app.spec.ts:20:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected pattern: /Catálogo de/i
Error: strict mode violation: locator('h1') resolved to 5 elements:
    1) <h1 class="text-4xl md:text-5xl font-bold mb-6">…</h1> aka getByRole('heading', { name: 'Catálogo de Ocasión' })
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
      - generic [ref=e17]:
        - heading "Catálogo de Ocasión" [level=1] [ref=e18]
        - paragraph [ref=e19]: Descubre nuestra amplia variedad de vehículos de todas las marcas y segmentos. Todos nuestros coches cuentan con revisión exhaustiva y cambio de titularidad incluido.
      - generic [ref=e20]:
        - generic [ref=e21]: "Filtros:"
        - button "Todos" [ref=e22]
        - button "Menos de 10.000€" [ref=e23]
        - button "SUV / Familiar" [ref=e24]
        - button "Automático" [ref=e25]
      - generic [ref=e26]:
        - article [ref=e27]:
          - generic [ref=e28]:
            - img "Audi A6 ultra Avant" [ref=e29]
            - generic [ref=e30]: Disponible
          - generic [ref=e31]:
            - heading "Audi A6 ultra Avant" [level=3] [ref=e32]
            - generic [ref=e34]:
              - img [ref=e35]
              - text: 186.000 km
            - generic [ref=e37]:
              - generic [ref=e38]: 17.900 €
              - link "Me interesa" [ref=e39] [cursor=pointer]:
                - /url: /contacto?car=1
        - article [ref=e40]:
          - generic [ref=e41]:
            - img "Peugeot 5008 Sport pack" [ref=e42]
            - generic [ref=e43]: Disponible
          - generic [ref=e44]:
            - heading "Peugeot 5008 Sport pack" [level=3] [ref=e45]
            - generic [ref=e47]:
              - img [ref=e48]
              - text: 138.000 km
            - generic [ref=e50]:
              - generic [ref=e51]: 7.900 €
              - link "Me interesa" [ref=e52] [cursor=pointer]:
                - /url: /contacto?car=2
        - article [ref=e53]:
          - generic [ref=e54]:
            - img "Seat Alhambra 2.0 TDI Ecomotive" [ref=e55]
            - generic [ref=e56]: Disponible
          - generic [ref=e57]:
            - heading "Seat Alhambra 2.0 TDI Ecomotive" [level=3] [ref=e58]
            - generic [ref=e60]:
              - img [ref=e61]
              - text: 138.856 km
            - generic [ref=e63]:
              - generic [ref=e64]: 15.500 €
              - link "Me interesa" [ref=e65] [cursor=pointer]:
                - /url: /contacto?car=3
        - article [ref=e66]:
          - generic [ref=e67]:
            - img "Audi A4 Avant 2.0 TDI S line" [ref=e68]
            - generic [ref=e69]: Disponible
          - generic [ref=e70]:
            - heading "Audi A4 Avant 2.0 TDI S line" [level=3] [ref=e71]
            - generic [ref=e73]:
              - img [ref=e74]
              - text: 185.000 km
            - generic [ref=e76]:
              - generic [ref=e77]: 14.900 €
              - link "Me interesa" [ref=e78] [cursor=pointer]:
                - /url: /contacto?car=4
  - contentinfo [ref=e79]:
    - paragraph [ref=e80]: © 2026 Autos Velacruz. Todos los derechos reservados.
  - generic [ref=e83]:
    - button "Menu" [ref=e84]:
      - img [ref=e86]
      - generic: Menu
    - button "Inspect" [ref=e90]:
      - img [ref=e92]
      - generic: Inspect
    - button "Audit" [ref=e94]:
      - generic [ref=e95]:
        - img [ref=e96]
        - img [ref=e99]
      - generic: Audit
    - button "Settings" [ref=e102]:
      - img [ref=e104]
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
  17 |     await expect(page.locator('h1')).toContainText('Encuentra el coche');
  18 |   });
  19 | 
  20 |   test('Vehiculos Ocasión page loads and shows cars', async ({ page }) => {
  21 |     await page.goto('/vehiculos-ocasion');
  22 |     
  23 |     await expect(page).toHaveTitle(/Vehículos de Ocasión \| Autos Velacruz/);
> 24 |     await expect(page.locator('h1')).toContainText(/Catálogo de/i);
     |                                      ^ Error: expect(locator).toContainText(expected) failed
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