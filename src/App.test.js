import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders the main heading", () => {
  render(
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  );
  expect(
    screen.getByText(/Qué está pasando en el mundo/i)
  ).toBeInTheDocument();
});
