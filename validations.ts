import { z } from "zod";

export const SearchSchema = z.object({
  search: z.string().trim().min(1, "Enter more than 1 symbol"),
});

export type SearchValues = z.infer<typeof SearchSchema>;
