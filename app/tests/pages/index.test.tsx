import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import Index from "../../src/pages/index";

describe("Index", () => {
  it("should pass accessibility scan", async () => {
    const { container } = render(<Index query={{}} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
