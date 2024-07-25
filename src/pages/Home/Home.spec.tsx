import { render, RenderOptions, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import { Home } from "./Home";
import type { AuthContextProps, UserManagementContextProps } from "@/contexts";
import type { User } from "@/global/types";

const navigate = jest.fn();

const mockUsers: User[] = [
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    type: "ADMIN",
  },
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    type: "USER",
  },
];

const mockUseAuth: AuthContextProps = {
  loggedUser: {
    id: mockUsers[0].id,
    type: mockUsers[0].type,
  },
  signed: true,
  signIn: jest.fn(),
  signOut: jest.fn(),
  signUp: jest.fn(),
};

const mockUseUserManagement: UserManagementContextProps = {
  users: mockUsers,
  deleteUser: jest.fn(),
  updateUser: jest.fn(),
  createUser: jest.fn(),
};

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => mockUseAuth,
}));

jest.mock("@/hooks/useUserManagement", () => ({
  useUserManagement: () => mockUseUserManagement,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigate,
}));

jest.mock("@/components/AddUser", () => ({
  AddUser: () => <div data-testid="add-user" />,
}));

jest.mock("@/components/EditProfile", () => ({
  EditProfile: () => <div data-testid="edit-profile" />,
}));

jest.mock("@/components/EditUser", () => ({
  EditUser: () => <div data-testid="edit-user" />,
}));

jest.mock("@/components/HomeHeader", () => ({
  HomeHeader: ({
    handleEditProfile = jest.fn(),
    handleAddUser = jest.fn(),
  }) => (
    <div data-testid="home-header">
      <button onClick={handleEditProfile}>Edit Profile</button>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  ),
}));

const makeSut = (): Omit<RenderOptions, "wrapper"> => {
  const component = <Home />;

  return render(component);
};

let userEventSetup = userEvent.setup();

beforeEach(() => {
  userEventSetup = userEvent.setup();
  jest.clearAllMocks();
});

describe("Pages: Home", () => {
  it("should render the home header", () => {
    makeSut();
    const homeHeader = screen.getByTestId("home-header");
    expect(homeHeader).toBeVisible();
  });

  it("should render the list of users", () => {
    makeSut();
    const listItem = screen.getAllByRole("listitem");
    expect(listItem).toHaveLength(mockUseUserManagement.users.length - 1);
  });

  it("should open the edit profile modal", async () => {
    makeSut();

    const editProfileButton = screen.getByText(/Edit Profile/i);
    await userEventSetup.click(editProfileButton);
    const editProfileModal = screen.getByTestId("edit-profile");

    expect(editProfileModal).toBeVisible();
  });

  it("should open the add user modal", async () => {
    makeSut();

    const addUserButton = screen.getByText(/Add User/i);
    await userEventSetup.click(addUserButton);
    const addUserModal = screen.getByTestId("add-user");

    expect(addUserModal).toBeVisible();
  });

  it("should open the edit user modal when edit icon is clicked", async () => {
    makeSut();

    const editIcons = screen.getAllByLabelText("edit");
    await userEventSetup.click(editIcons[0]);
    const editUserModal = screen.getByTestId("edit-user");

    expect(editUserModal).toBeVisible();
  });

  it("should call deleteUser function when delete icon is clicked", async () => {
    makeSut();

    const deleteIcons = screen.getAllByLabelText("delete");
    await userEventSetup.click(deleteIcons[0]);

    await waitFor(() =>
      expect(mockUseUserManagement.deleteUser).toHaveBeenCalled()
    );
  });
});
