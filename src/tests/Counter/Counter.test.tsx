import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { Counter } from "./Counter";
import { expect, beforeEach, describe, it } from "vitest";

describe("Counter", () => {
  let count: HTMLElement;
  let incrementButton: HTMLElement;
  let decrementButton: HTMLElement;

  beforeEach(() => {
    render(<Counter />);
    count = screen.getByText("0");
    incrementButton = screen.getByRole("button", { name: "+" });
    decrementButton = screen.getByRole("button", { name: "-" });
  });

  it("Test decrement and increment", async () => {
    await userEvent.click(incrementButton);
    expect(count).toHaveTextContent("1");

    await userEvent.click(decrementButton);

    expect(count).toHaveTextContent("0");
  });

  it("Test decrement less than 0", async () => {
    await userEvent.click(decrementButton);

    expect(count).toHaveTextContent("0");
  });

  it("Test some increments", async () => {
    const length = 10;

    await Promise.all(
      Array.from({ length }).map(async () => {
        await userEvent.click(incrementButton);
      })
    );

    expect(count).toHaveTextContent(length.toString());
  });
});
