import { render, RenderOptions, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import { SignUp } from "./SignUp";
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
  const component = <SignUp />;

  return render(component);
};

let userEventSetup = userEvent.setup();

beforeEach(() => {
  userEventSetup = userEvent.setup();
  jest.clearAllMocks();
});

describe("Pages: SignUp", () => {
  it("should render the sign up title", () => {
    makeSut();
    const title = screen.getByTestId("sign-up--title");
    expect(title).toBeVisible();
  });

  it("should display error message if name, email or password is missing", async () => {
    makeSut();

    const button = screen.getByRole("button", { name: /Inscrever-se/i });
    await userEventSetup.click(button);

    const errorMessage = screen.getByText(
      /Nome, e-mail e senha obrigatórios para criar um novo usuario/i
    );

    expect(mockUseAuth.signUp).not.toHaveBeenCalled();
    expect(errorMessage).toBeVisible();
  });

  it("should display error message from signUp function", async () => {
    mockUseAuth.signUp = jest.fn().mockReturnValueOnce("Invalid credentials");
    makeSut();

    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const fieldName = screen.getByLabelText(/Nome completo/i);
    const fieldEmail = screen.getByLabelText(/Endereço de e-mail/i);
    const fieldPassword = screen.getByLabelText(/Senha/i);
    const button = screen.getByRole("button", { name: /Inscrever-se/i });

    await userEventSetup.type(fieldName, name);
    await userEventSetup.type(fieldEmail, email);
    await userEventSetup.type(fieldPassword, password);
    await userEventSetup.click(button);

    const errorMessage = screen.getByTestId("sign-up--error-alert");

    expect(mockUseAuth.signUp).toHaveBeenCalledWith(name, email, password);
    expect(errorMessage).toHaveTextContent("Invalid credentials");
  });

  it('should call the signUp function with name, email and password and navigate to "/home"', async () => {
    makeSut();

    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const fieldName = screen.getByLabelText(/Nome completo/i);
    const fieldEmail = screen.getByLabelText(/Endereço de e-mail/i);
    const fieldPassword = screen.getByLabelText(/Senha/i);
    const button = screen.getByRole("button", { name: /Inscrever-se/i });

    await userEventSetup.type(fieldName, name);
    await userEventSetup.type(fieldEmail, email);
    await userEventSetup.type(fieldPassword, password);
    await userEventSetup.click(button);

    expect(mockUseAuth.signUp).toHaveBeenCalledWith(name, email, password);
    expect(navigate).toHaveBeenCalledWith("/home");
  });

  it("should render the copyright component", () => {
    makeSut();
    const copyright = screen.getByTestId("copyright");
    expect(copyright).toBeVisible();
  });
});
