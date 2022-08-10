import { Dispatch, SetStateAction } from 'react';

type VoidCallback = () => void;

export function useBooleanSwitcher(
  setState: Dispatch<SetStateAction<boolean>>
): [VoidCallback, VoidCallback] {
  return [() => setState(true), () => setState(false)];
}
