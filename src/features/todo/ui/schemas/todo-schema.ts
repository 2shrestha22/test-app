import { useMemo } from "react";
import { z } from "zod";

export function useCreateTodoSchema() {
  return useMemo(() => {
    return z.object({
      title: z.string(),
    });
  }, []);
}

export type TodoFormType = z.infer<ReturnType<typeof useCreateTodoSchema>>;
