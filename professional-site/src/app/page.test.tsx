import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Professional site home page", () => {
  it("shows the professional hero and title", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /mario salazar/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/software engineer \| frontend developer/i),
    ).toBeInTheDocument();
  });

  it("includes about, career journey, and portfolio sections", () => {
    render(<Home />);

    expect(
      screen.getAllByRole("heading", { level: 2, name: /about me/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { level: 2, name: /career journey/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /portfolio/i }),
    ).toBeInTheDocument();
  });
});
