/**
 * `useMemoCompare` is exactly like `useMemo` but instead of using a dependency
 * array, it uses a compare function to determine if the value has changed or
 * not. This can compare nested or partial properties or any other method to
 * determine equality. Return `true` if the previous and next values are equal.
 *
 * This hook isn't meant to avoid expensive calculations as an optimization, but
 * instead it can be used to provide a more ergonomic interface for custom hooks
 * instead of forcing the caller to memoize arrays and objects before using the
 * hook.
 *
 * Example
 *
 * ```
 * const App = ({ data }) => {
 *   const [state, setState] = useState();
 *
 *   // Use the previous data object if the id hasn't changed
 *   const dataMemo = useMemoCompare(data, (prev, next) => {
 *     return prev && prev.id === next.id;
 *   });
 *
 *   // This only fires when the data truly changes, even if it's a new object
 *   // on every render
 *   useEffect(() => {
 *     dataMemo.compute()
 *       .then((value) => setState(value));
 *   }, [dataMemo]);
 *
 *   return <div>{state}</div>;
 * };
 * ```
 *
 * Credit: https://usehooks.com/useMemoCompare/
 */
import { useEffect, useRef } from "react";

type CompareFn<T> = (previous: T, next: T) => boolean;

const useMemoCompare = <T>(next: T, compare: CompareFn<T>): T => {
  const previousRef = useRef<T>();
  const previous = previousRef.current;

  const isEqual = previous ? compare(previous, next) : false;

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  return isEqual && previous ? previous : next;
};

export default useMemoCompare;
