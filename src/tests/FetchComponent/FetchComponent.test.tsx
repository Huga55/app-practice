import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { FetchComponent } from "./FetchComponent";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom/vitest";

const server = setupServer(
  http.post("/api/login", () => {
    return HttpResponse.json(
      {
        message: "success",
      },
      {
        status: 200,
      }
    );
  })
);

const changeServerResponseMessage = (message: string) => {
  server.use(
    http.post("/api/login", () => {
      return HttpResponse.json(
        {
          message,
        },
        {
          status: 200,
        }
      );
    })
  );
};

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

let submitButton: HTMLButtonElement;
let loginInput: HTMLInputElement;
let passwordInput: HTMLInputElement;

beforeEach(() => {
  render(<FetchComponent />);
  submitButton = screen.getByRole("button", { name: "Submit" });
  loginInput = screen.getByPlaceholderText("Login");
  passwordInput = screen.getByPlaceholderText("Password");

  loginInput.value = "someLogin";
  passwordInput.value = "somePassword";
});

describe("FetchComponent", () => {
  it("should show success message", async () => {
    changeServerResponseMessage("success");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Success")).toBeInTheDocument();
    });
  });

  it("should show error message", async () => {
    changeServerResponseMessage("error");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });

  it("should show unknown message", async () => {
    changeServerResponseMessage("some");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Unknown error")).toBeInTheDocument();
    });
  });
});
