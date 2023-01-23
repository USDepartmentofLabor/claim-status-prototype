import { render, screen } from "@testing-library/react";

import DollarAmount from "../../src/components/DollarAmount";

it("outputs a formatted dollar value", () => {
  render(
    <>
      <DollarAmount amount={123} />
      <DollarAmount amount={456.75} />
      <DollarAmount amount="9" />
    </>
  );

  expect(screen.getByText("$123.00", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("$456.75", { exact: false })).toBeInTheDocument();
  expect(screen.getByText("$9.00", { exact: false })).toBeInTheDocument();
});
