import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("initial UI is rendered as expected", () => {
  render(<App />);
  expect(screen.getByTestId("app-input")).toHaveValue("");
  expect(screen.getByTestId("submit-button")).toHaveTextContent("+ Create");
  expect(screen.getByTestId("url-list").childNodes).toHaveLength(0);
});

function hasInputValue(e, inputValue) {
  return screen.getByDisplayValue(inputValue) === e;
}

test("Check input values", () => {
  render(<App />);
  const input = screen.getByTestId("app-input");
  fireEvent.change(input, { target: { value: "123" } });
  expect(hasInputValue(input, "123")).toBe(true);
});

