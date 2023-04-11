import { useEffect, useReducer } from "react";

export function useFfmpeg() {
  const [state, dispatch] = useReducer(
    (prev: Partial<IUseCheckFfmpeg>, curr: Partial<IUseCheckFfmpeg>) => ({
      ...prev,
      ...curr,
    }),
    {}
  );
  useEffect(() => {
    dispatch({ isLoading: true });
    window.api
      .isFfmpegInstalled()
      .then((installed: boolean) => dispatch({ isInstalled: installed }))
      .catch(() => dispatch({ isInstalled: false, isError: true }))
      .finally(() => dispatch({ isLoading: false }));
  }, []);

  return state;
}

interface IUseCheckFfmpeg {
  isInstalled: boolean;
  isError: boolean;
  isLoading: boolean;
}
