import { render, RenderOptions, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import { HomeHeader } from "./HomeHeader";
import type { HomeHeaderProps } from "./types";
import type { User } from "@/global/types";

const mockUser: User = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  type: "USER",
};

const makeSut = ({
  handleAddUser = jest.fn(),
  handleEditProfile = jest.fn(),
  user = mockUser,
  ...props
}: Partial<HomeHeaderProps> = {}): Omit<RenderOptions, "wrapper"> => {
  const component = (
    <HomeHeader
      handleAddUser={handleAddUser}
      handleEditProfile={handleEditProfile}
      user={user}
      {...props}
    />
  );

  return render(component);
};

let userEventSetup = userEvent.setup();

beforeEach(() => {
  userEventSetup = userEvent.setup();
  mockUser.type = "USER";
});

describe("Components: HomeHeader", () => {
  it("should render profile image", () => {
    makeSut();
    const image = screen.getByTestId("home-header--profile-image");
    expect(image).toBeVisible();
  });

  it("should render the user name", () => {
    makeSut();
    const userName = screen.getByTestId("home-header--profile-name");
    expect(userName).toHaveTextContent(mockUser.name);
  });

  it('should not render the content to add new use wen type user equal "USER"', () => {
    makeSut();
    const addUserContainer = screen.queryByTestId(
      "home-header--add-user--container"
    );
    expect(addUserContainer).toBeNull();
  });

  it('should render the content to add new use wen type user equal "ADMIN"', () => {
    mockUser.type = "ADMIN";
    makeSut();
    const addUserContainer = screen.getByTestId(
      "home-header--add-user--container"
    );
    expect(addUserContainer).toBeVisible();
  });

  it('should render the title to add new use wen type user equal "ADMIN"', () => {
    mockUser.type = "ADMIN";
    makeSut();

    const addUserTitle = screen.getByTestId("home-header--add-user--title");
    expect(addUserTitle).toBeVisible();
  });

  it("should call handleAddUser function wen click on add icon button", async () => {
    mockUser.type = "ADMIN";
    const handleAddUser = jest.fn();
    makeSut({ handleAddUser });

    const addIconButton = screen.getByTestId("home-header--add-user--icon");
    await userEventSetup.click(addIconButton);

    expect(handleAddUser).toHaveBeenCalledTimes(1);
  });
});
