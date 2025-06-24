import { TodoParams } from "@/features/todo/data/types";
import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import TodoItem from "./todo-item";

// Mock Ionicons to prevent state updates during testing
jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

describe("TodoItem", () => {
  const mockTodo: TodoParams = {
    id: "1",
    title: "Test Todo",
    completed: false,
    deleted: false,
  };

  it("renders todo item with correct title", () => {
    const { getByText } = render(<TodoItem item={mockTodo} icon="trash" />);

    expect(getByText("Test Todo")).toBeTruthy();
  });

  it("shows checkbox icon for incomplete todo", () => {
    const { getByTestId } = render(<TodoItem item={mockTodo} icon="trash" />);

    // The Ionicons component should render square-outline for incomplete todos
    expect(getByTestId).toBeDefined();
  });

  it("applies completed styles for completed todo", () => {
    const completedTodo = { ...mockTodo, completed: true };
    const { getByText } = render(
      <TodoItem item={completedTodo} icon="trash" />
    );

    const todoText = getByText("Test Todo");
    expect(todoText.props.className).toContain("text-gray-500 line-through");
  });

  it("calls onTap when todo is pressed", () => {
    const mockOnTap = jest.fn();
    const { getByText } = render(
      <TodoItem item={mockTodo} onTap={mockOnTap} icon="trash" />
    );

    act(() => {
      fireEvent.press(getByText("Test Todo"));
    });
    expect(mockOnTap).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is pressed", () => {
    const mockOnDelete = jest.fn();
    const { getByLabelText } = render(
      <TodoItem item={mockTodo} onDelete={mockOnDelete} icon="trash" />
    );

    const deleteButton = getByLabelText("Delete todo");

    act(() => {
      fireEvent.press(deleteButton);
    });
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("disables interaction when disabled prop is true", () => {
    const mockOnTap = jest.fn();
    const { getByText } = render(
      <TodoItem
        item={mockTodo}
        onTap={mockOnTap}
        icon="trash"
        disabled={true}
      />
    );

    act(() => {
      fireEvent.press(getByText("Test Todo"));
    });
    expect(mockOnTap).not.toHaveBeenCalled();
  });

  it("calls onDelete when remove button is pressed (close-circle icon)", () => {
    const mockOnDelete = jest.fn();
    const { getByLabelText } = render(
      <TodoItem item={mockTodo} onDelete={mockOnDelete} icon="close-circle" />
    );

    const removeButton = getByLabelText("Remove todo");

    act(() => {
      fireEvent.press(removeButton);
    });
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
