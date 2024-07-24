import { render, RenderOptions, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddUser } from "./AddUser";
import { AddUserProps } from "./types";
import { UserManagementContextProps } from "@/contexts";

const mockedUseUserManagement: UserManagementContextProps = {
  users: [],
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

jest.mock("../../hooks", () => ({
  useUserManagement: () => mockedUseUserManagement,
}));

const makeSut = ({
  isOpen = false,
  onClose = jest.fn(),
  ...props
}: Partial<AddUserProps> = {}): Omit<RenderOptions, "wrapper"> => {
  const component = <AddUser isOpen={isOpen} onClose={onClose} {...props} />;

  return render(component);
};

let userEventSetup = userEvent.setup();

beforeEach(() => {
  userEventSetup = userEvent.setup();
  mockedUseUserManagement.createUser = jest.fn();
});

describe("Components: AddUser", () => {
  it("should not render the dialog", async () => {
    makeSut({ isOpen: false });

    const dialog = screen.queryByTestId("add-user--dialog");

    expect(dialog).toBeNull();
  });

  it("should render the AddUser component dialog", () => {
    makeSut({ isOpen: true });

    const dialog = screen.getByTestId("add-user--dialog");

    expect(dialog).toHaveTextContent("Adicionar usuario");
  });

  it("should render the dialog with a title", () => {
    makeSut({ isOpen: true });

    const title = screen.getByTestId("add-user--dialog-title");

    expect(title).toHaveTextContent("Adicionar usuario");
  });

  it("should render a form", () => {
    makeSut({ isOpen: true });

    const form = screen.getByTestId("add-user--form");

    expect(form).toBeVisible();
  });

  it("should render the fields", () => {
    makeSut({ isOpen: true });

    const fieldName = screen.getByTestId("add-user--field-name");
    const fieldEmail = screen.getByTestId("add-user--field-email");
    const fieldPassword = screen.getByTestId("add-user--field-password");

    expect(fieldName).toBeVisible();
    expect(fieldEmail).toBeVisible();
    expect(fieldPassword).toBeVisible();
  });

  it('should render the select and set a default value of "USER"', () => {
    makeSut({ isOpen: true });

    const formSelect = screen.getByTestId("add-user--form-control--select");

    expect(formSelect).toHaveTextContent(/USER/);
  });

  it("should call the onClose function when clicking the cancel button", async () => {
    const onClose = jest.fn();
    makeSut({ isOpen: true, onClose });

    const cancelButton = screen.getByTestId("add-user--cancel-button");
    await userEventSetup.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
