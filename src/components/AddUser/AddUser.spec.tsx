import { render, RenderOptions, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import { AddUser } from "./AddUser";
import type { AddUserProps } from "./types";

const makeSut = ({
  createUser = jest.fn(),
  errorMessage = null,
  isOpen = false,
  onClose = jest.fn(),
  ...props
}: Partial<AddUserProps> = {}): Omit<RenderOptions, "wrapper"> => {
  const component = (
    <AddUser
      createUser={createUser}
      errorMessage={errorMessage}
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    />
  );

  return render(component);
};

let userEventSetup = userEvent.setup();

beforeEach(() => {
  userEventSetup = userEvent.setup();
});

describe("Components: AddUser", () => {
  it("should render the dialog", async () => {
    makeSut({ isOpen: true });

    const dialog = screen.queryByTestId("add-user--dialog");

    expect(dialog).toBeVisible();
  });

  it("should not render the dialog", async () => {
    makeSut({ isOpen: false });

    const dialog = screen.queryByTestId("add-user--dialog");

    expect(dialog).toBeNull();
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

  it("should render an alert when there is an error message", () => {
    const errorMessage = faker.lorem.sentence({ min: 3, max: 5 });
    makeSut({ errorMessage, isOpen: true });

    const errorAlert = screen.getByTestId("add-user--alert");

    expect(errorAlert).toHaveTextContent(errorMessage);
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

    const select = screen.getByRole("combobox", { name: "Tipo" });

    expect(select).toHaveTextContent("USER");
  });

  it("should call the onClose function when clicking the cancel button", async () => {
    const onClose = jest.fn();
    makeSut({ isOpen: true, onClose });

    const cancelButton = screen.getByTestId("add-user--cancel-button");
    await userEventSetup.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
