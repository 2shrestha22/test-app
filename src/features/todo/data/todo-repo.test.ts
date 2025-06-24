import { TodoDao } from "@/core/data/database/dao/todo-dao";
import { TodoRepo } from "./todo-repo";

// Mock the TodoDao dependency
jest.mock("@/core/data/database/dao/todo-dao", () => ({
  TodoDao: {
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockTodoDao = TodoDao as jest.Mocked<typeof TodoDao>;

describe("TodoRepo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getTodos", () => {
    it("should return all todos mapped to TodoParams format", async () => {
      mockTodoDao.getAll.mockReturnValue([
        {
          id: "1",
          title: "Test Todo 1",
          completed: false,
          deleted: false,
        },
      ] as any);

      await TodoRepo.getTodos();

      expect(mockTodoDao.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateTodo", () => {
    it("should update a todo successfully", async () => {
      mockTodoDao.update.mockReturnValue({
        id: "1",
        title: "Updated Todo",
        completed: true,
        deleted: false,
      } as any);

      await TodoRepo.updateTodo({
        id: "1",
        title: "Updated Todo",
        completed: true,
        deleted: false,
      });

      expect(mockTodoDao.update).toHaveBeenCalledWith("1", {
        title: "Updated Todo",
        completed: true,
      });

      expect(mockTodoDao.update).toHaveBeenCalledTimes(1);
    });
  });

  describe("createTodo", () => {
    it("should create a todo successfully", async () => {
      mockTodoDao.add.mockReturnValue({
        id: "1",
        title: "Test Todo",
        completed: false,
        deleted: false,
      } as any);

      await TodoRepo.createTodo("Test Todo");

      expect(mockTodoDao.add).toHaveBeenCalledTimes(1);
    });
  });

  describe("softDelete", () => {
    it("should soft delete a todo successfully", async () => {
      await TodoRepo.softDelete("1");

      expect(mockTodoDao.softDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe("delete", () => {
    it("should delete a todo successfully", async () => {
      await TodoRepo.delete("1");

      expect(mockTodoDao.delete).toHaveBeenCalledTimes(1);
    });
  });
});
