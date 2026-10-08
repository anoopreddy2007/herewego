import { z } from "zod";

export const suggestionSchema = z
  .object({
    player: z
      .string()
      .trim()
      .min(2, "Player name must be at least 2 characters")
      .max(60, "Player name is too long"),

    fromClub: z
      .string()
      .trim()
      .min(2, "From club is required")
      .max(50, "From club is too long"),

    toClub: z
      .string()
      .trim()
      .min(2, "To club is required")
      .max(50, "To club is too long"),

    window: z
      .string()
      .trim()
      .min(1, "Transfer window is required"),

    sourceUrl: z
      .string()
      .trim()
      .url("Enter a valid URL")
      .max(300, "Source URL is too long")
      .refine(
        (url) => url.startsWith("https://"),
        "Source must use HTTPS"
      ),

    note: z
      .string()
      .trim()
      .max(140, "Note must be 140 characters or less")
      .optional()
      .or(z.literal("")),

    creditName: z
      .string()
      .trim()
      .max(30, "Credit name is too long")
      .optional()
      .or(z.literal("")),

    creditOk: z.boolean().optional().default(false),

    email: z
      .string()
      .trim()
      .email("Enter a valid email")
      .max(254, "Email is too long")
      .optional()
      .or(z.literal("")),

    website: z.string().optional().default(""),

    t: z.string().optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (
      data.fromClub.trim().toLowerCase() ===
      data.toClub.trim().toLowerCase()
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["toClub"],
        message: "From and to can't be the same club",
      });
    }

    if (data.note && /https?:\/\/|www\./i.test(data.note)) {
      ctx.addIssue({
        code: "custom",
        path: ["note"],
        message: "Note must not contain a link",
      });
    }
  });

export type SuggestionInput = z.infer<typeof suggestionSchema>;