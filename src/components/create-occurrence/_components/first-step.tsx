import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useStepper } from '@/contexts/stepper'
import { UseFormReturn } from 'react-hook-form'
import { CreateOccurrenceType } from '../_utils/constants'

interface Props {
  form: UseFormReturn<CreateOccurrenceType>
  closeDialog: () => void
}

export default function FirstStep({ form, closeDialog }: Props) {
  const { control, trigger } = form
  const { nextStep } = useStepper()

  const handleNextStep = async () => {
    const isValid = await trigger('firstStep', { shouldFocus: true })

    if (isValid) {
      nextStep()
    }
  }

  return (
    <>
      <FormField
        control={control}
        name="firstStep.title"
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
        name="firstStep.description"
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

      <div className="flex w-full justify-end gap-4">
        <Button type="button" variant="secondary" onClick={closeDialog}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleNextStep}>
          Próximo
        </Button>
      </div>
    </>
  )
}
