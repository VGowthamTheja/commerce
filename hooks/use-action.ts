"use client";

import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (result: TOutput) => void;
  onError?: (error: string) => void;
  onCompleted?: () => void;
}

interface ReturnType<TInput, TOutput> {
  fieldErrors?: FieldErrors<TInput>;
  error?: string;
  result?: TOutput;
  isLoading: boolean;
  execute: (data: TInput) => Promise<void>;
}

export function useAction<TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
): ReturnType<TInput, TOutput> {
  const [returnValue, setReturnValue] = useState<ReturnType<TInput, TOutput>>({
    fieldErrors: undefined,
    error: undefined,
    result: undefined,
    isLoading: false,
    execute: () => Promise.resolve(),
  });

  const execute = useCallback(
    async (data: TInput) => {
      setReturnValue({
        ...returnValue,
        isLoading: true,
      });

      try {
        const result = await action(data);

        if (!result) return;

        setReturnValue({
          ...returnValue,
          fieldErrors: result.fieldErrors,
        });

        if (result.error) {
          setReturnValue({
            ...returnValue,
            error: result.error,
          });
          options.onError?.(result.error);
        }

        if (result.result) {
          setReturnValue({
            ...returnValue,
            result: result.result,
          });
          options.onSuccess?.(result.result);
        }
      } finally {
        setReturnValue({
          ...returnValue,
          isLoading: true,
        });
        options.onCompleted?.();
      }
    },
    [action, options]
  );

  return {
    fieldErrors: undefined,
    error: undefined,
    result: undefined,
    isLoading: false,
    execute,
  };
}
