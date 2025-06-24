import { render, screen } from "@testing-library/react-native";
import React from "react";
import TextField from "./text-field";

describe("TextField", () => {
  it("renders without crashing", () => {
    render(<TextField testID="text-input" />);

    const textInput = screen.getByTestId("text-input");
    expect(textInput).toBeTruthy();
  });

  it("forwards props to TextInput", () => {
    const placeholder = "Enter your text";
    const testId = "test-input";

    render(
      <TextField
        placeholder={placeholder}
        testID={testId}
        value="test value"
        maxLength={10}
      />
    );

    const textInput = screen.getByTestId(testId);
    expect(textInput).toBeTruthy();
    expect(textInput.props.placeholder).toBe(placeholder);
    expect(textInput.props.value).toBe("test value");
    expect(textInput.props.maxLength).toBe(10);
  });

  it("displays error message when error prop is provided", () => {
    const errorMessage = "This field is required";

    render(<TextField placeholder="Test input" error={errorMessage} />);

    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeTruthy();
  });

  it("applies red color style to error text", () => {
    const errorMessage = "Invalid input";

    render(<TextField placeholder="Test input" error={errorMessage} />);

    const errorText = screen.getByText(errorMessage);
    expect(errorText.props.style).toEqual({ color: "red" });
  });
});
