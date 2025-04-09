import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'O e-mail é obrigatório',
    })
    .email({
      message: 'Formato de e-mail inválido',
    })
    .toLowerCase(),
  password: z
    .string()
    .min(1, {
      message: 'A senha é obrigatória',
    })
})

export type LoginType = z.infer<typeof loginSchema>;

