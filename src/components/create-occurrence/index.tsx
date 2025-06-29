import ConfirmDialog from '@/components/confirm-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { QUERY_KEYS } from '@/constants/query-keys'
import { useAuth } from '@/contexts/auth-context'
import { StepperProvider, useStepper } from '@/contexts/stepper'
import { createOccurrenceSchema, CreateOcurrenceFormValues } from '@/schemas/occurrence'
import { ToastError, ToastSuccess } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import StepperProgress from '../stepper-progress'
import { FirstStep, SecondStep, ThirdStep } from './_components'
import { generateFormData, requestOccurrenceCreation } from './_utils/functions'

const STEPS = [
  { step: 1, label: 'Descrição' },
  { step: 2, label: 'Localização' },
  { step: 3, label: 'Imagem' },
]

interface Props {
  isOpen: boolean
  handleOpen: (open: boolean) => void
}

function Component({ isOpen, handleOpen }: Props) {
  const [loading, setLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const { loggedUser } = useAuth()
  const { currentStep, resetStep } = useStepper()
  const queryClient = useQueryClient()

  const userId = Number(loggedUser?.id)

  const form = useForm<CreateOcurrenceFormValues>({
    resolver: zodResolver(createOccurrenceSchema),
    mode: 'onChange',
    defaultValues: {
      firstStep: {
        title: '',
        description: '',
      },
      secondStep: {
        neighborhood: '',
        reference: '',
        street: '',
        zipCode: '',
      },
      thirdStep: {
        image: undefined,
      },
    },
  })

  const { handleSubmit, reset, formState } = form

  const resetForm = () => {
    reset()
    resetStep()
  }

  const handleDialogOpenChange = (open: boolean) => {
    const hasFilledFields = formState.isDirty

    if (!open && hasFilledFields && !loading) {
      setShowConfirmDialog(true)
    } else if (!loading) {
      handleOpen(open)
      if (!open) resetForm()
    }
  }

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false)
    handleOpen(false)
    resetForm()
  }

  const createMutation = useMutation({
    mutationFn: async (data: CreateOcurrenceFormValues) => {
      setLoading(true)
      const formData = generateFormData(data, userId)
      await requestOccurrenceCreation(formData)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.OCCURRENCES],
      })
      handleOpen(false)
      resetForm()
      ToastSuccess('Reclamação registrada com sucesso')
    },
    onError: (error) => {
      console.error(error)
      ToastError(error.message)
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  const handleCreation = (formData: CreateOcurrenceFormValues) => {
    createMutation.mutate(formData)
  }

  const renderStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <FirstStep form={form} closeDialog={() => handleDialogOpenChange(false)} />
      case 2:
        return <SecondStep form={form} />
      case 3:
        return <ThirdStep form={form} loading={loading} />
      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Nova reclamação</DialogTitle>

            <DialogDescription className="text-muted-foreground">
              Preencha os campos abaixo para registrar uma nova ocorrência
            </DialogDescription>

            <div className="py-2">
              <StepperProgress currentStep={currentStep} stepsArray={STEPS} />
            </div>
          </DialogHeader>

          <Form {...form}>
            <form
              id="create-occurrence-form"
              className="space-y-4"
              onSubmit={handleSubmit(handleCreation)}
            >
              {renderStep(currentStep)}
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={showConfirmDialog}
        description="Há informações preenchidas. Deseja sair?"
        title="Descartar dados?"
        onConfirm={closeConfirmDialog}
        onOpenChange={setShowConfirmDialog}
      />
    </>
  )
}

export default function CreateOccurrence({ isOpen, handleOpen }: Props) {
  return (
    <StepperProvider stepsNumber={3}>
      <Component isOpen={isOpen} handleOpen={handleOpen} />
    </StepperProvider>
  )
}
