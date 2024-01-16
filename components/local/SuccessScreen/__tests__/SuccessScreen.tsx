import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SuccessScreen } from "../..";

// Mock the Firebase SDK
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
}));

jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
}));

jest.mock("next/navigation");

// Mock the ref function
jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  onValue: jest.fn(),
}));

jest.mock("../../../../firebase.js", () => ({
  userDB: {
    getDatabase: jest.fn(() => ({
      ref: jest.fn(),
      onValue: jest.fn(),
    })),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Success Screen page", () => {
  it("renders the success message with the correct text", () => {
    const { getByText } = render(<SuccessScreen />);

    const successMsg = getByText("You have successfully subscribed!");
    expect(successMsg).toBeInTheDocument();
  });
});
