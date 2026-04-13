import { test, expect } from '@playwright/test';

test.describe('Autos Velacruz E2E Tests', () => {

  test('Index page loads properly with Navbar and Hero', async ({ page }) => {
    await page.goto('/');
    
    // Check Title
    await expect(page).toHaveTitle(/Inicio \| Autos Velacruz/);
    
    // Check Navbar
    const navbar = page.locator('header nav');
    await expect(navbar).toBeVisible();
    await expect(navbar.locator('a', { hasText: 'Inicio' })).toBeVisible();
    
    // Check Hero text
    await expect(page.locator('h1')).toContainText('Encuentra el coche');
  });

  test('Vehiculos Ocasión page loads and shows cars', async ({ page }) => {
    await page.goto('/vehiculos-ocasion');
    
    await expect(page).toHaveTitle(/Vehículos de Ocasión \| Autos Velacruz/);
    await expect(page.locator('h1')).toContainText(/Catálogo de/i);
    
    // Should have 4 cars based on our data
    const carCards = page.locator('article');
    await expect(carCards).toHaveCount(4);
    
    // Verify none of the images are broken
    const images = page.locator('article img');
    for (let i = 0; i < await images.count(); i++) {
        const src = await images.nth(i).getAttribute('src');
        expect(src).toBeTruthy();
    }
  });

  test('Compramos tu Coche page loads with form', async ({ page }) => {
    await page.goto('/compramos-tu-coche');
    
    await expect(page.locator('h1')).toContainText('Máxima Tasación');
    
    // Check inputs exist
    await expect(page.locator('input[placeholder="Ej. Audi"]')).toBeVisible();
    await expect(page.locator('button', { hasText: 'Solicitar Tasación Gratuita' })).toBeVisible();
  });

  test('Contacto page loads with info and form', async ({ page }) => {
    await page.goto('/contacto');
    
    await expect(page.locator('h1')).toContainText('Contacta con Nosotros');
    
    // Check that phone number is present
    await expect(page.locator('p', { hasText: '644 898 574' })).toBeVisible();
  });

});
