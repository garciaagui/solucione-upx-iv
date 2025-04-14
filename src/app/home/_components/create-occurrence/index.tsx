import ConfirmDialog from '@/components/confirm-dialog'
import LoadingMessage from '@/components/loading-message'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { QUERY_KEYS } from '@/constants/query-keys'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from './_components'
import { createOccurrenceSchema, CreateOccurrenceType } from './_utils/constants'
import { generateFormData, requestOccurrenceCreation } from './_utils/functions'

export default function CreateOccurrence() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const userId = Number(session?.token.user.id)

  const form = useForm<CreateOccurrenceType>({
    resolver: zodResolver(createOccurrenceSchema),
    defaultValues: {
      description: '',
      image: undefined,
      neighborhood: '',
      reference: '',
      street: '',
      title: '',
      zipCode: '',
    },
  })

  const { reset, watch } = form

  const formFields = watch()
  const hasFilledFields = Object.values(formFields).some((value) =>
    typeof value === 'string' ? value.trim() !== '' : !!value,
  )

  const handleDialogOpenChange = (open: boolean) => {
    if (!open && hasFilledFields && !loading) {
      setShowConfirmDialog(true)
    } else if (!loading) {
      setIsOpen(open)
      if (!open) reset()
    }
  }

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false)
    setIsOpen(false)
    reset()
  }

  const createMutation = useMutation({
    mutationFn: async (data: CreateOccurrenceType) => {
      setLoading(true)
      const formData = generateFormData(data, userId)
      await requestOccurrenceCreation(formData)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.OCCURRENCES],
      })
      setIsOpen(false)
      reset()
    },
    onSettled: () => {
      setLoading(false)
    },
  })

  const handleCreation = (formData: CreateOccurrenceType) => {
    createMutation.mutate(formData)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger asChild>
          <Button variant="default">Abrir reclamação</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Nova reclamação</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Preencha os campos abaixo para registrar uma nova ocorrência
            </DialogDescription>
          </DialogHeader>

          <Form form={form} loading={loading} handleCreation={handleCreation} />

          <Button disabled={loading} form="create-occurrence-form" type="submit">
            {!loading ? 'Finalizar' : <LoadingMessage message="Criando..." />}
          </Button>
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
