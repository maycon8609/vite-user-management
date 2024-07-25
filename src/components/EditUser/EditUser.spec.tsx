import { render, RenderOptions, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import { EditUser } from "./EditUser";
import type { EditUserProps } from "./types";
import type { User } from "@/global/types";

const mockUser: User = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  type: "USER",
};

const makeSut = ({
  handleChange = jest.fn(),
  handleSaveChange = jest.fn(),
  onClose = jest.fn(),
  user = mockUser,
  ...props
}: Partial<EditUserProps> = {}): Omit<RenderOptions, "wrapper"> => {
  const component = (
    <EditUser
      handleChange={handleChange}
      handleSaveChange={handleSaveChange}
      onClose={onClose}
      user={user}
      {...props}
    />
  );

  return render(component);
};

let userEventSetup = userEvent.setup();

beforeEach(() => {
  userEventSetup = userEvent.setup();
});

describe("Components: EditUser", () => {
  it("should render the dialog", async () => {
    makeSut();
    const dialog = screen.queryByTestId("edit-user--dialog");
    expect(dialog).toBeVisible();
  });

  it("should not render the dialog", async () => {
    makeSut({ user: null });
    const dialog = screen.queryByTestId("edit-user--dialog");
    expect(dialog).toBeNull();
  });

  it("should render the dialog with a title", () => {
    makeSut();
    const title = screen.getByTestId("edit-user--dialog-title");
    expect(title).toHaveTextContent("Editar usuario");
  });

  it("should render the fields", () => {
    makeSut();

    const fieldName = screen.getByRole("textbox", { name: "Nome" });
    const fieldEmail = screen.getByRole("textbox", { name: "E-mail" });
    const fieldPassword = screen.getByLabelText(/Senha/i);
    const select = screen.getByRole("combobox", { name: "Tipo" });

    expect(fieldName).toHaveValue(mockUser.name);
    expect(fieldEmail).toHaveValue(mockUser.email);
    expect(fieldPassword).toHaveValue(mockUser.password);
    expect(select).toHaveTextContent(mockUser.type);
  });

  it("should call the onClose function when clicking the cancel button", async () => {
    const onClose = jest.fn();
    makeSut({ onClose });

    const cancelButton = screen.getByTestId("edit-user--cancel-button");
    await userEventSetup.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call the handleSaveChange function when clicking the confirm button", async () => {
    const handleSaveChange = jest.fn();
    makeSut({ handleSaveChange });

    const saveButton = screen.getByTestId("edit-user--save-button");
    await userEventSetup.click(saveButton);

    expect(handleSaveChange).toHaveBeenCalledTimes(1);
  });
});
