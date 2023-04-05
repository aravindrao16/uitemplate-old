import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import useFormValidation, {
  FormFormatterFn,
  FormValidationFn,
} from "./useFormValidation";

describe("useFormValidation", () => {
  const mockValue: string = "mock value";
  const mockValidator: FormValidationFn<string> = jest.fn(() => {
    return [true, null];
  });
  const mockChange = (newValue: string) =>
    ({
      target: { value: newValue },
    } as any);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("returns hook functions", () => {
    const { result } = renderHook(() => {
      return useFormValidation(mockValue, mockValidator);
    });

    expect(result.current.value).toBeTruthy();
    expect(result.current.setValue).toBeTruthy();
    expect(result.current.formatted).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.isValid).toBe(true);
    expect(result.current.validate).toBeTruthy();
    expect(result.current.onChange).toBeTruthy();
    expect(result.current.onBlur).toBeTruthy();

    expect.assertions(8);
  });

  it("calls validator on validate", () => {
    const { result } = renderHook(() => {
      return useFormValidation(mockValue, mockValidator);
    });

    result.current.validate();

    expect(mockValidator).toHaveBeenCalled();
    expect(mockValidator).toHaveBeenCalledWith(mockValue);

    expect.assertions(2);
  });

  it("supports not providing a validator", () => {
    const { result } = renderHook(() => {
      return useFormValidation(mockValue);
    });

    expect(result.current.validate()).toBe(true);

    expect.assertions(1);
  });

  it("supports formatter option", () => {
    const formatted = "formatted";
    const formatter: FormFormatterFn<string> = jest.fn(() => formatted);

    const { result } = renderHook(() => {
      return useFormValidation(mockValue, mockValidator, { formatter });
    });

    expect(formatter).toHaveBeenCalled();
    expect(formatter).toHaveBeenCalledWith(mockValue);
    expect(result.current.formatted).toEqual(formatted);

    expect.assertions(3);
  });

  it("supports debounceDelay option", () => {
    const newValue = "new value";
    const debounceDelay = 900;

    const { result } = renderHook(() => {
      return useFormValidation(mockValue, mockValidator, { debounceDelay });
    });

    act(() => result.current.setValue(newValue));
    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.value).toEqual(newValue);
    expect(mockValidator).toHaveBeenCalled();
    expect(mockValidator).toHaveBeenCalledWith(newValue);

    expect.assertions(3);
  });

  it("supports filter option", () => {
    const newValue = "abc1234";
    const expectedValue = "1234";
    const filter = jest.fn((value: string) => value.replace(/[^0-9]/g, ""));
    const { result } = renderHook(() => {
      return useFormValidation(mockValue, mockValidator, { filter });
    });

    act(() => result.current.onChange(mockChange(newValue)));
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.value).toEqual(expectedValue);

    // Value form
    act(() => result.current.setValue(newValue));
    expect(result.current.value).toEqual(expectedValue);

    // Functional form
    act(() =>
      result.current.setValue((prevValue) => {
        expect(prevValue).toEqual(expectedValue);
        return newValue;
      }),
    );
    expect(result.current.value).toEqual(expectedValue);

    expect.assertions(4);
  });

  it("supports onChange option", () => {
    const newValue = "new value";
    const onChange = jest.fn();
    const { result } = renderHook(() => {
      return useFormValidation(mockValue, mockValidator, { onChange });
    });

    act(() => result.current.onChange(mockChange(newValue)));
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.value).toEqual(newValue);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith({ target: { value: newValue } });
    expect.assertions(3);
  });

  it("supports validateOnChange option", () => {
    const newValue = "new value";
    const { result, rerender } = renderHook(
      ({ initialValue, validator, opts }) => {
        return useFormValidation(initialValue, validator, opts);
      },
      {
        initialProps: {
          initialValue: mockValue,
          validator: mockValidator,
          opts: {},
        },
      },
    );

    act(() => result.current.onChange(mockChange(newValue)));
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.value).toEqual(newValue);
    expect(mockValidator).toHaveBeenCalled();

    (mockValidator as jest.Mock).mockClear();
    rerender({
      initialValue: mockValue,
      validator: mockValidator,
      opts: {
        validateOnChange: false,
      },
    });

    act(() => result.current.onChange(mockChange(newValue)));
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.value).toEqual(newValue);
    expect(mockValidator).not.toHaveBeenCalled();

    expect.assertions(4);
  });

  it("supports clearErrorOnChange option", () => {
    const mockError = "Some error";
    const mockInvalidator: FormValidationFn<string> = jest.fn(() => {
      return [false, mockError];
    });
    const { result, rerender } = renderHook(
      ({ initialValue, validator, opts }) => {
        return useFormValidation(initialValue, validator, opts);
      },
      {
        initialProps: {
          initialValue: mockValue,
          validator: mockInvalidator,
          opts: {},
        },
      },
    );

    act(() => {
      result.current.validate();
    });

    expect(result.current.error).toEqual(mockError);

    rerender({
      initialValue: mockValue,
      validator: mockValidator,
      opts: { clearErrorOnChange: true },
    });

    act(() => result.current.onChange(mockChange("new value")));
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(result.current.error).toBeNull();

    expect.assertions(2);
  });

  it("supports onFocus option", () => {
    const onFocus = jest.fn();
    const { result } = renderHook(() => {
      return useFormValidation(mockValue, mockValidator, { onFocus });
    });

    act(() => {
      const mockFocus = {
        target: { value: mockValue },
      } as any;
      result.current.onFocus(mockFocus);
    });

    expect(result.current.value).toEqual(mockValue);
    expect(onFocus).toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalledWith({ target: { value: mockValue } });
    expect.assertions(3);
  });

  it("supports onBlur option", () => {
    const onBlur = jest.fn();
    const { result } = renderHook(() => {
      return useFormValidation(mockValue, mockValidator, { onBlur });
    });

    act(() => {
      const mockBlur = {
        target: { value: mockValue },
      } as any;
      result.current.onBlur(mockBlur);
    });

    expect(result.current.value).toEqual(mockValue);
    expect(onBlur).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalledWith({ target: { value: mockValue } });
    expect.assertions(3);
  });
});
