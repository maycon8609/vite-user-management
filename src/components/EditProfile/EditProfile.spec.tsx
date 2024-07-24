import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import type { RenderOptions } from "@testing-library/react";

import { EditProfile } from "./EditProfile";
import type { User } from "@/types";
import type { EditProfileProps } from "./types";

const mockUser: User = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  type: "USER",
};

const makeSut = ({
  handleChange = jest.fn(),
  handleSaveChanges = jest.fn(),
  onClose = jest.fn(),
  user = mockUser,
  ...props
}: Partial<EditProfileProps> = {}): Omit<RenderOptions, "wrapper"> => {
  const component = (
    <EditProfile
      handleChange={handleChange}
      handleSaveChanges={handleSaveChanges}
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

describe("Components: EditProfile", () => {
  it('should render the "EditProfile" component', () => {
    makeSut();

    const dialog = screen.getByTestId("edit-profile--dialog");

    expect(dialog).toBeVisible();
  });

  it('should not render the "EditProfile" component with no pass user', () => {
    makeSut({ user: null });

    const dialog = screen.queryByTestId("edit-profile--dialog");

    expect(dialog).toBeNull();
  });

  it("should render the profile picture", () => {
    makeSut();

    const imageProfile = screen.getByTestId("edit-profile--image-profile");

    expect(imageProfile).toBeVisible();
  });

  it("should render user information", () => {
    makeSut();

    const userName = screen.getByTestId("edit-profile--user-name");
    const fieldName = screen.getByRole("textbox", { name: "Nome" });
    const fieldEmail = screen.getByRole("textbox", { name: "E-mail" });
    const fieldPassword = screen.getByLabelText(/Senha/i);

    expect(userName).toHaveTextContent(mockUser.name);
    expect(fieldName).toHaveValue(mockUser.name);
    expect(fieldEmail).toHaveValue(mockUser.email);
    expect(fieldPassword).toHaveValue(mockUser.password);
  });

  it("should call the handleChange function when typing in some input", async () => {
    const name = faker.person.fullName();
    const handleChange = jest.fn();
    makeSut({ handleChange });

    const fieldName = screen.getByRole("textbox", { name: "Nome" });
    await userEventSetup.type(fieldName, name);

    expect(handleChange).toHaveBeenCalledTimes(name.length);
  });

  it("should call handleSaveChanges when clicking save", async () => {
    const handleSaveChanges = jest.fn();
    makeSut({ handleSaveChanges });

    const saveButton = screen.getByTestId("edit-profile--save-button");
    await userEventSetup.click(saveButton);

    expect(handleSaveChanges).toHaveBeenCalledTimes(1);
  });

  it("should call the onClose function when clicking the cancel button", async () => {
    const onClose = jest.fn();
    makeSut({ onClose });

    const cancelButton = screen.getByTestId("edit-profile--cancel-button");
    await userEventSetup.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
