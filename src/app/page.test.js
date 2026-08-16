import { render, screen } from "@testing-library/react";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import HomePage from "../app/page";

test("renders the main heading", () => {
  render(
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
  expect(
    screen.getByText(/Qué está pasando en el mundo/i)
  ).toBeInTheDocument();
});
