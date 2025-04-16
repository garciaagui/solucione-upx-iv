import LoadingMessage from '@/components/loading-message'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useStepper } from '@/contexts/stepper'
import { UseFormReturn } from 'react-hook-form'
import { CreateOccurrenceType } from '../_utils/constants'

interface Props {
  form: UseFormReturn<CreateOccurrenceType>
  loading: boolean
}

export default function ThirdStep({ form, loading }: Props) {
  const { control } = form
  const { previousStep } = useStepper()

  return (
    <>
      <FormField
        control={control}
        disabled={loading}
        name="thirdStep.image"
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

      <div className="flex w-full justify-end gap-4">
        <Button disabled={loading} type="button" variant="secondary" onClick={previousStep}>
          Voltar
        </Button>
        <Button disabled={loading} form="create-occurrence-form" type="submit">
          {!loading ? 'Finalizar' : <LoadingMessage message="Criando..." />}
        </Button>
      </div>
    </>
  )
}
