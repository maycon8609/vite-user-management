import { render, RenderOptions, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NotFoundPage } from "./NotFoundPage";

const navigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigate,
}));

const makeSut = (): Omit<RenderOptions, "wrapper"> => {
  const component = <NotFoundPage />;

  return render(component);
};

let userEventSetup = userEvent.setup();

beforeEach(() => {
  userEventSetup = userEvent.setup();
});

describe("Pages: NotFoundPage", () => {
  it("should render the error icon", () => {
    makeSut();
    const errorIcon = screen.getByTestId("not-found-page--error-icon");
    expect(errorIcon).toBeVisible();
  });

  it("should render the main heading", () => {
    makeSut();
    const heading = screen.getByRole("heading", {
      name: /404 - página não encontrada/i,
    });
    expect(heading).toBeVisible();
  });

  it("should render the secondary text", () => {
    makeSut();
    const secondaryText = screen.getByText(
      /Desculpe, a página que você está procurando não existe./i
    );
    expect(secondaryText).toBeVisible();
  });

  it("should render the button to go back to the home page", () => {
    makeSut();
    const button = screen.getByRole("button", {
      name: /Ir para a página inicial/i,
    });
    expect(button).toBeVisible();
  });

  it("should call navigate function when clicking the button", async () => {
    makeSut();
    const button = screen.getByRole("button", {
      name: /Ir para a página inicial/i,
    });
    await userEventSetup.click(button);

    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
