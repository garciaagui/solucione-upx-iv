import LoadingMessage from '@/components/loading-message'
import { Button } from '@/components/ui/button'
import {
  FormControl,
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
  onSubmit: (data: UpdateOccurrenceFormValues) => void
}

export default function Form({ form, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  return (
    <FormWrapper {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder="Detalhe o andamento da resolução do problema"
                  {...field}
                />
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
                  disabled={isSubmitting}
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

        <Button disabled={isSubmitting} type="submit">
          {!isSubmitting ? 'Finalizar' : <LoadingMessage message="Aguarde..." />}
        </Button>
      </form>
    </FormWrapper>
  )
}
