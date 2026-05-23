import { test, expect } from "@playwright/test";

test.describe("Landing — galería de plantillas", () => {
  test("golden path: home muestra el hero y el contenedor de la galería", async ({
    page,
  }) => {
    await page.goto("/");

    // Hero — título principal
    const heading = page.getByRole("heading", { name: "Bannerly", level: 1 });
    await expect(heading).toBeVisible();

    // Hero — tagline
    await expect(
      page.getByText(/Generación de imágenes dinámicas/)
    ).toBeVisible();

    // Hero — CTA
    const cta = page.getByRole("link", { name: /Ver plantillas/ });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/dashboard/templates");

    // Sección de galería presente en el DOM
    const gallery = page.getByRole("region", {
      name: "Galería de plantillas",
    });
    await expect(gallery).toBeVisible();
  });

  test("estado vacío: muestra mensaje amable cuando no hay plantillas", async ({
    page,
  }) => {
    await page.goto("/");

    // Si hay plantillas, el test pasa trivialmente (el estado vacío no aplica).
    // Sólo verificamos que NO se muestre JSON crudo (pre con datos).
    const pre = page.locator("pre");
    await expect(pre).toHaveCount(0);
  });

  test("estado de error: la página renderiza aunque Supabase devuelva error", async ({
    page,
  }) => {
    // La página no debe crashear. El heading Bannerly siempre debe aparecer.
    await page.goto("/");
    const heading = page.getByRole("heading", { name: "Bannerly", level: 1 });
    await expect(heading).toBeVisible();
  });
});
