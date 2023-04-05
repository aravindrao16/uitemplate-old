/**
 * `useFormValidation` provides a helpful wrapper around typical controlled
 * form input validation state. It takes an initial value, a validator and
 * several options for handling events, filtering and debouncing.
 *
 * Example
 *
 * ```
 * const PhoneField = () => {
 *   const phone = useFormValidation("", validatePhone, {
 *     filter: filterNumbers,
 *     formatter: formatPhone,
 *   });
 *
 *   return (
 *     <>
 *       {!phone.isValid ? <p>{phone.error}</p> : null}
 *       <input
 *         value={phone.formatted}
 *         onChange={phone.onChange}
 *         onBlur={phone.onBlur}
 *       />
 *     </>
 *   );
 * };
 * ```
 */
import useDebounce from "hooks/useDebounce";
import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const debounceDelayDefault = process.env.JEST_WORKER_ID ? 0 : 500;

type FormValidationError = null | string;
type FormValidationResult = [boolean, FormValidationError];

type FormFormatterFn<T> = (value: T) => T;
type FormFilterFn<T> = (value: T) => T;
type FormSetValueFn<T> = Dispatch<SetStateAction<T>>;
type FormOnChangeFn<E> = (evt: ChangeEvent<E>) => void;
type FormOnFocusFn<E> = (evt: FocusEvent<E>) => void;
type FormOnBlurFn<E> = (evt: FocusEvent<E>) => void;
type FormValidationFn<T> = (value: T) => FormValidationResult;

type FormValidationOptions<T, E> = {
  debounceDelay?: number; // Defaults to 500ms, set to 0 to disable debouncing validation checks
  onChange?: FormOnChangeFn<E>; // Trigger extra functionality when onChange is triggered
  validateOnChange?: boolean; // Whether to validate when onChange is triggered. Defaults true
  clearErrorOnChange?: boolean; // Whether to clear validation error when onChange is triggered. Defaults false
  onFocus?: FormOnFocusFn<E>; // Trigger extra functionality when onFocus is triggered
  onBlur?: FormOnBlurFn<E>; // Trigger extra functionality when onBlur is triggered
  formatter?: FormFormatterFn<T>; // Can provide a formatted value each time it's changed (e.g. (555) 123-1234)
  filter?: FormFilterFn<T>; // Filter out invalid values for something like phone number fields
};

type FormValidationHookResult<T, E> = {
  value: T;
  setValue: FormSetValueFn<T>;
  formatted: T;
  error: FormValidationError;
  isValid: boolean;
  validate: () => boolean; // Manually validate without debounce - useful for onSubmit
  onChange: FormOnChangeFn<E>; // Pass to input as an onChange handler
  onFocus: FormOnFocusFn<E>; // Pass to input as onFocus handler
  onBlur: FormOnBlurFn<E>; // Pass to input as an onBlur handler
};

const validateFields = <T, E>(fields: FormValidationHookResult<T, E>[]) => {
  if (fields.some((field) => !field.validate)) {
    throw new Error("all fields must have a `validate` function defined");
  }
  return fields.reduce((valid, field) => {
    return field.validate() && valid;
  }, true);
};

const useFormValidation = <
  T extends string | number | boolean,
  E extends HTMLInputElement | HTMLSelectElement | HTMLOptionElement,
>(
  initialValue: T,
  validator?: FormValidationFn<T>,
  opts?: FormValidationOptions<T, E>,
): FormValidationHookResult<T, E> => {
  const {
    debounceDelay = debounceDelayDefault,
    onChange: customOnChange,
    onFocus: customOnFocus,
    onBlur: customOnBlur,
    formatter,
    filter,
  } = opts || {};
  const validateOnChange = opts?.validateOnChange ?? true;
  const clearErrorOnChange = opts?.clearErrorOnChange ?? false;
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true); // Default to valid unless changed
  const [error, setError] = useState<FormValidationError>(null);
  const changed = useRef(false);
  const debouncedValue = useDebounce(value, debounceDelay);

  // This takes a parameter so it doesn't trigger re-renders on the useState
  // value above
  const validate = useCallback(
    (value: T): boolean => {
      if (validator) {
        const [valid, error] = validator(value);
        setIsValid(valid);
        setError(error);
        return valid;
      }
      return true;
    },
    [validator],
  );

  const onChange = useCallback(
    (evt: ChangeEvent<E>) => {
      if (clearErrorOnChange) {
        setError(null);
      }
      const value = evt.target.value as T;
      const newValue = filter ? filter(value) : value;
      setValue(newValue);
      changed.current = true;
      if (customOnChange) {
        customOnChange(evt);
      }
    },
    [filter, customOnChange, clearErrorOnChange],
  );

  const onFocus = useCallback(
    (evt: FocusEvent<E>) => {
      if (customOnFocus) {
        customOnFocus(evt);
      }
    },
    [customOnFocus],
  );

  const onBlur = useCallback(
    (evt: FocusEvent<E>) => {
      validate(evt.target.value as T);
      if (customOnBlur) {
        customOnBlur(evt);
      }
    },
    [validate, customOnBlur],
  );

  const filterSetValue: FormSetValueFn<T> = useCallback(
    (stateAction: SetStateAction<T>) => {
      changed.current = true;
      if (typeof stateAction === "function") {
        setValue((prevValue) => {
          let newValue = stateAction(prevValue);
          if (filter) {
            newValue = filter(newValue);
          }
          return newValue;
        });
      } else {
        const newValue = filter ? filter(stateAction) : stateAction;
        setValue(newValue);
      }
    },
    [filter],
  );

  const formatted = useMemo(
    () => (formatter ? formatter(value) : value),
    [value, formatter],
  );

  // Ensure value stays up to date with initialValue as it may not have a stable
  // value for the firs few renders, but only if the value hasn't already been
  // changed
  useEffect(() => {
    if (!changed.current) {
      setValue(initialValue);
    }
  }, [initialValue]);

  // Validate debounced values only after we've attempted to change it
  useEffect(() => {
    if (changed.current && validateOnChange) {
      validate(debouncedValue);
    }
  }, [debouncedValue, validate, validateOnChange]);

  return {
    value,
    setValue: filterSetValue,
    formatted,
    error,
    isValid,
    // This ensures validate immediately sets state on current value and doesn't
    // wait for debounce
    validate: () => validate(value),
    onChange,
    onFocus,
    onBlur,
  };
};

export default useFormValidation;
export { validateFields };
export type {
  FormValidationError,
  FormValidationOptions,
  FormValidationResult,
  FormFormatterFn,
  FormFilterFn,
  FormValidationFn,
  FormOnChangeFn,
  FormSetValueFn,
  FormValidationHookResult,
};
