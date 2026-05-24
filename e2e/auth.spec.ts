import { test, expect } from "@playwright/test";

test.describe("Auth — golden path", () => {
  test("muestra la página de login con formulario accesible", async ({
    page,
  }) => {
    await page.goto("/login");

    await expect(
      page.getByRole("heading", { level: 1, name: /Iniciar sesión/i })
    ).toBeVisible();

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Contraseña")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Entrar/i })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /Regístrate/i })
    ).toBeVisible();
  });

  test("muestra la página de registro con formulario accesible", async ({
    page,
  }) => {
    await page.goto("/register");

    await expect(
      page.getByRole("heading", { level: 1, name: /Crear cuenta/i })
    ).toBeVisible();

    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Contraseña")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Crear cuenta/i })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /Inicia sesión/i })
    ).toBeVisible();
  });

  test("redirige /dashboard a /login cuando no hay sesión", async ({
    page,
  }) => {
    await page.goto("/dashboard/templates");
    await expect(page).toHaveURL(/\/login/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Iniciar sesión/i })
    ).toBeVisible();
  });

  test("login muestra error inline con credenciales inválidas", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("nonexistent@example.com");
    await page.getByLabel("Contraseña").fill("wrongpassword");
    await page.getByRole("button", { name: /Entrar/i }).click();

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 10000 });
  });

  test("enlace en login lleva a registro y viceversa", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: /Regístrate/i }).click();
    await expect(page).toHaveURL(/\/register/);

    await page.getByRole("link", { name: /Inicia sesión/i }).click();
    await expect(page).toHaveURL(/\/login/);
  });
});
