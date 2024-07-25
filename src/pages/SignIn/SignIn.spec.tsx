import { render, RenderOptions, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SignIn } from "./SignIn";
import { faker } from "@faker-js/faker";
import type { AuthContextProps } from "@/contexts";

const navigate = jest.fn();

const mockUseAuth: AuthContextProps = {
  loggedUser: null,
  signed: false,
  signIn: jest.fn(),
  signOut: jest.fn(),
  signUp: jest.fn(),
};

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => mockUseAuth,
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigate,
}));
jest.mock("@/components/Copyright", () => ({
  Copyright: () => <div data-testid="copyright" />,
}));

const makeSut = (): Omit<RenderOptions, "wrapper"> => {
  const component = <SignIn />;

  return render(component);
};

let userEventSetup = userEvent.setup();

beforeEach(() => {
  userEventSetup = userEvent.setup();
  jest.clearAllMocks();
});

describe("Pages: SignIn", () => {
  it("should render the sign title", () => {
    makeSut();
    const title = screen.getByTestId("sign-in--title");
    expect(title).toBeVisible();
  });

  it("should display error message if email or password is missing", async () => {
    makeSut();

    const button = screen.getByRole("button", { name: /Entrar/i });
    await userEventSetup.click(button);

    const errorMessage = screen.getByText(
      /E-mail e senha obrigatórios para acessar a aplicação/i
    );

    expect(mockUseAuth.signIn).not.toHaveBeenCalled();
    expect(errorMessage).toBeVisible();
  });

  it("should display error message from signIn function", async () => {
    mockUseAuth.signIn = jest.fn().mockReturnValueOnce("Invalid credentials");
    makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    const fieldEmail = screen.getByLabelText(/Endereço de e-mail/i);
    const fieldPassword = screen.getByLabelText(/Senha/i);
    const button = screen.getByRole("button", { name: /Entrar/i });

    await userEventSetup.type(fieldEmail, email);
    await userEventSetup.type(fieldPassword, password);
    await userEventSetup.click(button);

    const errorMessage = screen.getByTestId("sign-in--error-alert");

    expect(mockUseAuth.signIn).toHaveBeenCalledWith(email, password);
    expect(errorMessage).toHaveTextContent("Invalid credentials");
  });

  it('should call the signIn function with email and password and navigate to "/home"', async () => {
    makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    const fieldEmail = screen.getByLabelText(/Endereço de e-mail/i);
    const fieldPassword = screen.getByLabelText(/Senha/i);
    const button = screen.getByRole("button", { name: /Entrar/i });

    await userEventSetup.type(fieldEmail, email);
    await userEventSetup.type(fieldPassword, password);
    await userEventSetup.click(button);

    expect(mockUseAuth.signIn).toHaveBeenCalledWith(email, password);
    expect(navigate).toHaveBeenCalledWith("/home");
  });

  it("should render the copyright component", () => {
    makeSut();
    const copyright = screen.getByTestId("copyright");
    expect(copyright).toBeVisible();
  });
});
