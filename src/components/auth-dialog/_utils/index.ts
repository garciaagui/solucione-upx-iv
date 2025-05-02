import { z } from 'zod'

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
  password: z.string().min(1, {
    message: 'A senha é obrigatória',
  }),
})

export const registerSchema = z
  .object({
    name: z.string().min(10, {
      message: 'O nome deve ter no mínimo 10 caracteres',
    }),
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
      .min(10, {
        message: 'A senha deve ter no mínimo 10 caracteres',
      })
      .refine(
        (value) =>
          /[A-Z]/.test(value) && // Letra maiúscula
          /[a-z]/.test(value) && // Letra minúscula
          /[0-9]/.test(value) && // Número
          /[^A-Za-z0-9]/.test(value), // Caractere especial
        {
          message: 'A senha inserida não atende aos requisitos',
        },
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
