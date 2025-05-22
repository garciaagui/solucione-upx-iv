import ConfirmDialog from '@/components/confirm-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { QUERY_KEYS } from '@/constants/query-keys'
import { UpdateOccurrenceFormValues, updateOccurrenceSchema } from '@/schemas/occurrence'
import { OccurrenceWithRelations } from '@/types/globals'
import { ToastError, ToastSuccess } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from './_components'
import { generateFormData, requestReplyCreation } from './_utils/functions'

interface Props {
  isOpen: boolean
  occurrence: OccurrenceWithRelations
  handleOpen: (open: boolean) => void
}

export default function UpdateOccurrence({ isOpen, occurrence, handleOpen }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const adminId = Number(session?.token.user.id)

  const form = useForm<UpdateOccurrenceFormValues>({
    resolver: zodResolver(updateOccurrenceSchema),
    mode: 'onChange',
    defaultValues: {
      description: '',
      image: undefined,
    },
  })

  const {
    formState: { isDirty },
    reset,
  } = form

  const handleDialogOpenChange = (open: boolean) => {
    const hasFilledFields = isDirty

    if (!open && hasFilledFields && !isLoading) {
      setShowConfirmDialog(true)
    } else if (!isLoading) {
      handleOpen(open)
      if (!open) reset()
    }
  }

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false)
    handleOpen(false)
    reset()
  }

  const invalidateQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.OCCURRENCES] }),
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.OCCURRENCE_BY_ID] }),
    ])
  }

  const updateMutation = useMutation({
    mutationFn: async (formValues: UpdateOccurrenceFormValues) => {
      setIsLoading(true)

      const occurrenceValues = {
        occurrenceId: occurrence.id,
        occurrenceStatus: occurrence.status,
      }

      const formData = generateFormData(adminId, formValues, occurrenceValues)
      await requestReplyCreation(formData)
    },
    onSuccess: async () => {
      await invalidateQueries()

      handleOpen(false)
      reset()
      ToastSuccess('Atualização registrada com sucesso')
    },
    onError: (error) => {
      console.error(error)
      ToastError(error.message)
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  const handleUpdate = (formData: UpdateOccurrenceFormValues) => {
    updateMutation.mutate(formData)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Atualização</DialogTitle>

            <DialogDescription className="text-muted-foreground">
              Preencha os campos abaixo para registrar uma atualização da reclamação
            </DialogDescription>
          </DialogHeader>

          <Form form={form} isLoading={isLoading} onSubmit={handleUpdate} />
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
