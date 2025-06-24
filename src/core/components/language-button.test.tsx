import i18n from "@/i18n/i18n";
import { useI18nStore } from "@/store/i18n-store";
import { fireEvent, render } from "@testing-library/react-native";
import { LanguageToggleButton } from "./language-button";

// Mock the dependencies
jest.mock("@/i18n/i18n");
jest.mock("@/store/i18n-store", () => {
  return {
    useI18nStore: {
      getState: jest.fn(),
    },
  };
});
jest.mock("@/core/data/database/database", () => ({
  database: {
    write: jest.fn(),
    objects: jest.fn(),
    create: jest.fn(),
  },
}));
// Mock Ionicons to prevent state updates during testing
jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

const mockI18n = i18n as jest.Mocked<typeof i18n>;
const mockUseI18nStore = useI18nStore as jest.Mocked<typeof useI18nStore>;

describe("LanguageToggleButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("toggles language from English to French", () => {
    mockI18n.language = "en";
    const mockChangeLanguage = jest.fn();
    const mockSetLocale = jest.fn();

    mockI18n.changeLanguage = mockChangeLanguage;
    (mockUseI18nStore.getState as jest.Mock).mockReturnValue({
      setLocale: mockSetLocale,
    });

    const { getByTestId } = render(<LanguageToggleButton />);
    const button = getByTestId("language-toggle-button");

    fireEvent.press(button);

    expect(mockChangeLanguage).toHaveBeenCalledWith("fr");
    expect(mockSetLocale).toHaveBeenCalledWith("en");
  });

  it("toggles language from French to English", () => {
    mockI18n.language = "fr";
    const mockChangeLanguage = jest.fn();
    const mockSetLocale = jest.fn();

    mockI18n.changeLanguage = mockChangeLanguage;
    (mockUseI18nStore.getState as jest.Mock).mockReturnValue({
      setLocale: mockSetLocale,
    });

    const { getByTestId } = render(<LanguageToggleButton />);
    const button = getByTestId("language-toggle-button");

    fireEvent.press(button);

    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
    expect(mockSetLocale).toHaveBeenCalledWith("fr");
  });
});
