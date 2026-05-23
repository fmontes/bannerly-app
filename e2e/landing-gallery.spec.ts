import { test, expect } from "@playwright/test";

test.describe("Landing page — galería de plantillas", () => {
  test("golden path: hero visible, click en card abre modal y se puede cerrar", async ({
    page,
  }) => {
    await page.goto("/");

    // 1. Hero y galería visibles
    await expect(page.getByRole("heading", { level: 1, name: "Bannerly" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Plantillas disponibles" })).toBeVisible();

    // Si no hay plantillas en el entorno de test, verificamos el estado vacío y salimos
    const firstCard = page.getByRole("button").first();
    const emptyMessage = page.getByText("Todavía no hay plantillas.");

    const hasCards = await firstCard.isVisible().catch(() => false);
    const isEmpty = await emptyMessage.isVisible().catch(() => false);

    if (isEmpty) {
      await expect(emptyMessage).toBeVisible();
      return;
    }

    if (!hasCards) {
      // Ni cards ni empty state — algo raro, fallar con mensaje claro
      throw new Error("La galería no muestra ni cards ni estado vacío");
    }

    // 2. Click en la primera card
    const cardName = await firstCard.locator("p").first().textContent();
    await firstCard.click();

    // 3. Modal aparece con la info del template
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    if (cardName) {
      await expect(modal.getByRole("heading", { name: cardName })).toBeVisible();
    }

    // 4. Cerrar modal con el botón X
    await modal.getByRole("button", { name: "Cerrar modal" }).click();
    await expect(modal).toBeHidden();
  });

  test("cierre de modal con tecla Escape", async ({ page }) => {
    await page.goto("/");

    const firstCard = page.getByRole("button").first();
    const hasCards = await firstCard.isVisible().catch(() => false);
    if (!hasCards) return;

    await firstCard.click();

    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
  });

  test("cierre de modal con click en el backdrop", async ({ page }) => {
    await page.goto("/");

    const firstCard = page.getByRole("button").first();
    const hasCards = await firstCard.isVisible().catch(() => false);
    if (!hasCards) return;

    await firstCard.click();

    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();

    // Click en el backdrop (fuera del panel interno)
    await modal.click({ position: { x: 10, y: 10 } });
    await expect(modal).toBeHidden();
  });
});
