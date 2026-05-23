import { test, expect } from '@playwright/test';

test('Guest checkout flow - Shopware 6', async ({ page }) => {
  // 1. Open storefront
  await page.goto('https://www.shopware6-demo.development-s25.com/');

  // Accept cookies
  const cookieBtn = page.getByRole('button', { name: 'Nur technisch notwendige' });
  await expect(cookieBtn).toBeVisible();
  await cookieBtn.click();

  // Assert homepage loaded
  await expect(page).toHaveURL(/shopware6-demo/);
  await expect(page.getByRole('navigation', { name: 'Hauptnavigation' })).toBeVisible();

  // 2. Navigate to product listing
  const menLink = page.getByRole('link', { name: 'Men', exact: true });
  await expect(menLink).toBeVisible();
  await menLink.click();

  await expect(page).toHaveURL(/men|Men/);

  // 3. Open product
  const product = page.getByRole('link', { name: 'Demo Produkt' });
  await expect(product).toBeVisible();
  await product.click();

  // Assert product page
  await expect(page.getByRole('button', { name: 'In den Warenkorb' })).toBeVisible();

  // 4. Add to cart
  await page.getByRole('button', { name: 'In den Warenkorb' }).click();

  // Assert cart notification or cart page link exists
  await expect(page.getByRole('link', { name: /Warenkorb|cart/i })).toBeVisible();

  // 5. Go to checkout
  await page.getByRole('link', { name: 'Zur Kasse' }).click();

  await expect(page).toHaveURL(/checkout/);

  // 6. Fill guest checkout form
  await page.getByRole('textbox', { name: 'Vorname' }).fill('Test');
  await page.getByRole('textbox', { name: 'Nachname' }).fill('User');
  await page.getByRole('textbox', { name: 'E-Mail-Adresse' }).fill('test@example.com');
  await page.getByRole('textbox', { name: 'Straße und Hausnummer' }).fill('Test Street 1');
  await page.getByRole('textbox', { name: 'PLZ' }).fill('10000');
  await page.getByRole('textbox', { name: 'Ort' }).fill('Berlin');

  // Continue
  await page.getByRole('button', { name: 'Weiter' }).click();

  // 7. Shipping/payment
  const agbCheckbox = page.getByRole('checkbox', { name: /AGB/i });
  await expect(agbCheckbox).toBeVisible();
  await agbCheckbox.check();

  const payment = page.getByRole('radio', { name: /Cash on delivery/i });
  await expect(payment).toBeVisible();
  await payment.check();

  // 8. Confirm order page
  await expect(page).toHaveURL(/confirm/);

  const orderBtn = page.getByRole('button', { name: 'Zahlungspflichtig bestellen' });
  await expect(orderBtn).toBeVisible();

  await Promise.all([
  page.waitForURL(/finish|order|success/),
  orderBtn.click()
]);

  // 9. FINAL ASSERTION - order success
  await expect(page).toHaveURL(/finish|order|success/i);

  // Shopware usually shows a success message
  await expect(
  page.getByText(/Danke für Ihre Bestellung|Vielen Dank|Thank you/i)
).toBeVisible({ timeout: 15000 });
});