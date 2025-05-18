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
import { ToastError, ToastSuccess } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from './_components'

interface Props {
  isOpen: boolean
  handleOpen: (open: boolean) => void
}

export default function UpdateOccurrence({ isOpen, handleOpen }: Props) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const userId = Number(session?.token.user.id)

  const form = useForm<UpdateOccurrenceFormValues>({
    resolver: zodResolver(updateOccurrenceSchema),
    mode: 'onChange',
    defaultValues: {
      description: '',
      image: undefined,
    },
  })

  const {
    formState: { isDirty, isSubmitting },
    reset,
  } = form

  const handleDialogOpenChange = (open: boolean) => {
    const hasFilledFields = isDirty

    if (!open && hasFilledFields && !isSubmitting) {
      setShowConfirmDialog(true)
    } else if (!isSubmitting) {
      handleOpen(open)
      if (!open) reset()
    }
  }

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false)
    handleOpen(false)
    reset()
  }

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateOccurrenceFormValues) => {
      // const formData = generateFormData(data, userId)
      // await requestOccurrenceUpdate(formData)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.OCCURRENCES],
      })
      handleOpen(false)
      reset()
      ToastSuccess('Atualização registrada com sucesso')
    },
    onError: (error) => {
      console.error(error)
      ToastError(error.message)
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

          <Form form={form} onSubmit={handleUpdate} />
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
