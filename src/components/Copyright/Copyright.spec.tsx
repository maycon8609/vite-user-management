import { render, RenderOptions, screen } from "@testing-library/react";
import { TypographyProps } from "@mui/material";

import { Copyright } from "./Copyright";

const makeSut = (
  props: Partial<TypographyProps> = {}
): Omit<RenderOptions, "wrapper"> => {
  const component = <Copyright {...props} />;

  return render(component);
};

describe("Components: Copyright", () => {
  it("deveria renderizar o copyright", () => {
    const copyrightContent = `Copyright © maycon silva ${new Date().getFullYear()}.`
    makeSut();

    const copyright = screen.getByTestId("copyright--typography");

    expect(copyright).toHaveTextContent(copyrightContent);
  });
});
