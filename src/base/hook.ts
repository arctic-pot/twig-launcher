import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type VoidCallback = () => void;

export function useBooleanSwitcher(
  setState: Dispatch<SetStateAction<boolean>>
): [VoidCallback, VoidCallback] {
  return [() => setState(true), () => setState(false)];
}

interface IUseStorageBoundState {
  <T>(key: string, defaultValue?: T): [T, Dispatch<SetStateAction<T>>];
  json: <T>(key: string, defaultValue?: T) => [T, Dispatch<SetStateAction<T>>];
}

const useStorageBoundState: IUseStorageBoundState = function (key, defaultValue?) {
  // g stands for getter, s stands for setter.
  const [g, s] = useState(localStorage[key] ?? defaultValue);
  useEffect(() => {
    localStorage[key] = g;
  }, [g]);
  return [g, s];
} as IUseStorageBoundState;

useStorageBoundState.json = (key, defaultValue?) => {
  // g stands for getter, s stands for setter.
  const [g, s] = useState(JSON.parse(localStorage[key] ?? '""') ?? defaultValue);
  useEffect(() => {
    localStorage[key] = JSON.stringify(g);
  }, [g]);
  return [g, s];
};

export { useStorageBoundState };
