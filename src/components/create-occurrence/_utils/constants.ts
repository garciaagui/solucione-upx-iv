import { z } from 'zod'

const firstStepSchema = z.object({
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
  description: z
    .string({
      required_error: 'A descrição é obrigatória',
    })
    .min(40, {
      message: 'A descrição precisa ter no mínimo 40 caracteres',
    })
    .max(255, {
      message: 'A descrição pode ter no máximo 255 caracteres',
    }),
})

const secondStepSchema = z.object({
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

const thirdStepSchema = z.object({
  image: z.custom<File>((file) => file instanceof File, {
    message: 'A imagem é obrigatória',
  }),
})

export const createOccurrenceSchema = z.object({
  firstStep: firstStepSchema,
  secondStep: secondStepSchema,
  thirdStep: thirdStepSchema,
})

export const steps = [
  { step: 1, label: 'Descrição' },
  { step: 2, label: 'Localização' },
  { step: 3, label: 'Imagem' },
]

export type CreateOccurrenceType = z.infer<typeof createOccurrenceSchema>
