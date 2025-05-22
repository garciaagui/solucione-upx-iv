import LoadingMessage from '@/components/loading-message'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormWrapper,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UpdateOccurrenceFormValues } from '@/schemas/occurrence'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<UpdateOccurrenceFormValues>
  isLoading: boolean
  onSubmit: (data: UpdateOccurrenceFormValues) => void
}

export default function Form({ form, isLoading, onSubmit }: Props) {
  const { control, handleSubmit } = form

  return (
    <FormWrapper {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          disabled={isLoading}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Detalhe o andamento da resolução do problema" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          disabled={isLoading}
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
              <FormDescription>
                A imagem é opcional, mas recomendada para melhor entendimento da solução.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button disabled={isLoading} type="submit">
            {!isLoading ? 'Finalizar' : <LoadingMessage message="Aguarde..." />}
          </Button>
        </div>
      </form>
    </FormWrapper>
  )
}
