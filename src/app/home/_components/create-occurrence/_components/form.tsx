import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormWrapper,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { UseFormReturn } from 'react-hook-form'
import { CreateOccurrenceType } from '../_utils/constants'
import { zipCodeMask } from '../_utils/functions'

interface Props {
  form: UseFormReturn<CreateOccurrenceType>
  handleCreation: (data: CreateOccurrenceType) => void
}

export default function Form({ form, handleCreation }: Props) {
  const { control, handleSubmit } = form

  return (
    <FormWrapper {...form}>
      <form onSubmit={handleSubmit(handleCreation)} id="create-occurrence-form">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Falta de coleta de lixo" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva detalhadamente o problema ocorrido, mencionando horários, frequência e impacto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <legend>Localização</legend>

        <FormField
          control={control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Rua das Flores, n. 123" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Centro" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: 18.540-000"
                  type="text"
                  maxLength={10}
                  {...field}
                  onChange={(e) => {
                    const formatted = zipCodeMask(e.target.value)
                    field.onChange(formatted)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referência (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Na praça em frente ao mercado" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    field.onChange(file)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormWrapper>
  )
}
