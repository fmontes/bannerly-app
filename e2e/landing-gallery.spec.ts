import { test, expect } from "@playwright/test";

test.describe("Landing — galería de plantillas", () => {
  test("golden path: hero visible y contenedor de galería presente", async ({
    page,
  }) => {
    await page.goto("/");

    // Hero
    await expect(
      page.getByRole("heading", { level: 1, name: "Bannerly" })
    ).toBeVisible();

    await expect(
      page.getByText(/Generación de imágenes dinámicas vía API/)
    ).toBeVisible();

    const cta = page.getByRole("link", { name: /Ver mis plantillas/ });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/dashboard/templates");

    // Galería — el section de galería debe estar presente
    const gallery = page.getByRole("region", {
      name: "Galería de plantillas",
    });
    await expect(gallery).toBeVisible();

    // No debe haber JSON crudo en la página
    await expect(page.getByText(/"template_uid"/)).not.toBeVisible();
  });

  test("estado vacío: mensaje amable si no hay plantillas", async ({ page }) => {
    // Con Supabase sin datos o sin conexión la página no debe crashear
    await page.goto("/");
    // La heading del hero debe seguir visible independientemente del estado de datos
    await expect(
      page.getByRole("heading", { level: 1, name: "Bannerly" })
    ).toBeVisible();

    // O hay cards, o estado vacío, o estado de error — ninguno es un JSON crudo
    const hasCards = await page.getByRole("list", { name: "Plantillas" }).count() > 0;
    const hasEmpty = await page.getByText(/Todavía no hay plantillas/).count() > 0;
    const hasError = await page.getByText(/Error de conexión/).count() > 0;

    expect(hasCards || hasEmpty || hasError).toBe(true);
  });
});
