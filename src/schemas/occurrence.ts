import { z } from 'zod'

const description = z
  .string({
    required_error: 'A descrição é obrigatória',
  })
  .min(40, {
    message: 'A descrição precisa ter no mínimo 40 caracteres',
  })
  .max(255, {
    message: 'A descrição pode ter no máximo 255 caracteres',
  })

const firstStep = z.object({
  title: z
    .string({
      required_error: 'O título é obrigatório',
    })
    .min(10, {
      message: 'O título precisa ter no mínimo 10 caracteres',
    })
    .max(127, {
      message: 'O título pode ter no máximo 127 caracteres',
    }),
  description,
})

const secondStep = z.object({
  neighborhood: z
    .string({
      required_error: 'O bairro é obrigatório',
    })
    .min(1, {
      message: 'Insira o bairro',
    }),
  zipCode: z
    .string({
      required_error: 'O CEP é obrigatório',
    })
    .length(10, {
      message: 'CEP precisa ter exatamente 8 dígitos',
    }),
  // Embora o necessário seja 8 dígitos, consideramos 10 por conta do ponto e traço. Exemplo: 18.540-000.
  street: z
    .string({
      required_error: 'A rua é obrigatória',
    })
    .min(1, {
      message: 'Insira a rua',
    }),
  reference: z.string().optional(),
})

const thirdStep = z.object({
  image: z.custom<File>((file) => file instanceof File, {
    message: 'A imagem é obrigatória',
  }),
})

export const createOccurrenceSchema = z.object({
  firstStep,
  secondStep,
  thirdStep,
})

export const updateOccurrenceSchema = z.object({
  description,
  image: z
    .custom<File>((file) => file instanceof File, {
      message: 'A imagem é obrigatória',
    })
    .nullable()
    .optional(),
})

export type CreateOcurrenceFormValues = z.infer<typeof createOccurrenceSchema>
export type UpdateOccurrenceFormValues = z.infer<typeof updateOccurrenceSchema>
