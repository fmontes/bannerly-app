import { test, expect } from "@playwright/test";

test.describe("Landing — galería de plantillas", () => {
  test("golden path: hero visible y galería renderizada", async ({ page }) => {
    await page.goto("/");

    // Hero
    await expect(
      page.getByRole("heading", { level: 1, name: "Bannerly" })
    ).toBeVisible();

    await expect(
      page.getByText(/Generación de imágenes dinámicas vía API/)
    ).toBeVisible();

    const cta = page.getByRole("link", { name: /Ver plantillas/ });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/dashboard/templates");

    // Gallery section heading
    await expect(
      page.getByRole("heading", { level: 2, name: /Plantillas disponibles/ })
    ).toBeVisible();

    // Either gallery, empty state, or error state renders — the page must not crash
    const galleryList = page.getByRole("list", {
      name: /Galería de plantillas/,
    });
    const emptyState = page.getByText(/Aún no hay plantillas/);
    const errorState = page.getByText(/Error de conexión/);

    const rendered = await Promise.race([
      galleryList.waitFor({ state: "visible", timeout: 5000 }).then(() => "gallery"),
      emptyState.waitFor({ state: "visible", timeout: 5000 }).then(() => "empty"),
      errorState.waitFor({ state: "visible", timeout: 5000 }).then(() => "error"),
    ]).catch(() => "timeout");

    expect(["gallery", "empty", "error"]).toContain(rendered);
  });
});
