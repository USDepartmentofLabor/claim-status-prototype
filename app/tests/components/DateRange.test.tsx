import { render, screen } from "@testing-library/react";

import DateRange from "../../src/components/DateRange";

it("outputs a formatted date range", () => {
  render(<DateRange start="2021-01-01" end="2021-01-31" />);

  expect(screen.getByText("1/1/2021 – 1/31/2021")).toBeInTheDocument();
});
