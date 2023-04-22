import { z } from 'zod';

export const SetupDto = z.object({
  server: z.string(),
  operator: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    owner: z.object({
      name: z.string(),
      email: z.string(),
    })
  }),
  oauth2: z.object({
    fbAppId: z.string(),
    googleClientId: z.string(),
  })
});

export type SetupDto = z.infer<typeof SetupDto>;
