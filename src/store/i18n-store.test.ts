/* eslint-disable @typescript-eslint/no-require-imports */
import { act, renderHook } from "@testing-library/react-native";
import { useI18nStore } from "./i18n-store";

// Mock the database
jest.mock("@/core/data/database/database", () => ({
  database: {
    write: jest.fn((fn) => fn()),
    objects: jest.fn(() => []),
    create: jest.fn(),
  },
}));

describe("i18nStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with default locale", () => {
    const { result } = renderHook(() => useI18nStore());

    expect(result.current.locale).toBe("en");
  });

  it("updates locale when setLocale is called", () => {
    const { result } = renderHook(() => useI18nStore());

    act(() => {
      result.current.setLocale("fr");
    });

    expect(result.current.locale).toBe("fr");
  });

  it("initializes locale from database when available", () => {
    const mockDatabase = require("@/core/data/database/database").database;
    mockDatabase.objects.mockReturnValue([{ locale: "fr" }]);

    const { result } = renderHook(() => useI18nStore());

    act(() => {
      result.current.initializeLocale();
    });

    expect(result.current.locale).toBe("fr");
  });
});
