import { useState, useEffect, DependencyList } from 'react';

export function useMemoReliable<T extends (...args: any[]) => any>(
  cb: T,
  deps?: DependencyList
): any {
  const [val, setVal] = useState<{ current?: any }>({ current: cb() });
  useEffect(() => {
    setVal({ current: cb() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return val.current;
}
export function useCallbackReliable<T extends (...args: any[]) => any>(
  cb: T,
  deps?: DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemoReliable(() => cb, deps);
}

export const getParamsInUrl = (key: string) => {
  let url = window.location.href;
  let param = '';
  const questionMarkIndex = url.indexOf('?');
  const poundMarkIndex = url.indexOf('#');
  if (questionMarkIndex >= 0 && questionMarkIndex < poundMarkIndex) {
    url = url.split('#')[0];
  }
  const urlArr = url.split('?');
  if (urlArr.length > 1) {
    const params = new URLSearchParams(urlArr[1]);
    param = params.get(key);
  }
  console.log(param, url);
  return param;
};
