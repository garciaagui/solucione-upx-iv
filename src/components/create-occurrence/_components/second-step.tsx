import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useStepper } from '@/contexts/stepper'
import { OcurrenceFormValues } from '@/schemas/occurrence'
import { UseFormReturn } from 'react-hook-form'
import { zipCodeMask } from '../_utils/functions'

interface Props {
  form: UseFormReturn<OcurrenceFormValues>
}

export default function SecondStep({ form }: Props) {
  const { control, trigger } = form
  const { nextStep, previousStep } = useStepper()

  const handleNextStep = async () => {
    const isValid = await trigger('secondStep', { shouldFocus: true })

    if (isValid) {
      nextStep()
    }
  }

  return (
    <>
      <FormField
        control={control}
        name="secondStep.street"
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
        name="secondStep.neighborhood"
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
        name="secondStep.zipCode"
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
        name="secondStep.reference"
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

      <div className="flex w-full justify-end gap-4">
        <Button type="button" variant="secondary" onClick={previousStep}>
          Voltar
        </Button>
        <Button type="button" onClick={handleNextStep}>
          Próximo
        </Button>
      </div>
    </>
  )
}
