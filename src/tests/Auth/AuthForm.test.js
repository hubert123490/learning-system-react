import AuthForm from "../../components/Auth/AuthForm";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

describe("AuthForm tests", () => {
  test("checks if login is disabled", async () => {
    // Arrange

    // Act
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthForm />
        </BrowserRouter>
      );
    });

    // Assert
    screen.debug();
    const loginButton = await screen.findByRole('button', { name :'Zaloguj się'})
    expect(loginButton).toBeDisabled();
  });

  test("checks if new account button is enabled", async () => {
    // Arrange

    // Act
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthForm />
        </BrowserRouter>
      );
    });

    // Assert
    screen.debug();
    const loginButton = await screen.findByRole('button', { name :'Stwórz nowe konto'})
    expect(loginButton).toBeEnabled();
  });
});
