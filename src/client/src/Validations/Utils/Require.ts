import { RefinementCtx, ZodIssueCode } from 'zod';

export const Require =
  (label: string) =>
  <T>(value: T | null, ctx: RefinementCtx) => {
    if (value === null) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `${label} is required.`
      });
    }
  };
