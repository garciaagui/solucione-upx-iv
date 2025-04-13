import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { createOccurrenceSchema, CreateOccurrenceType } from './_utils/constants'
import { generateFormData, zipCodeMask } from './_utils/functions'

export default function CreateOccurrence() {
  const { data: session } = useSession()
  const userId = Number(session?.token.user.id)

  const form = useForm<CreateOccurrenceType>({
    resolver: zodResolver(createOccurrenceSchema),
  })

  const { handleSubmit, control } = form

  const create = async (data: CreateOccurrenceType) => {
    const formData = generateFormData(data, userId)

    await fetch('/api/occurrences', {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <Dialog>
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

        <Form {...form}>
          <form onSubmit={handleSubmit(create)} id="create-occurrence-form">
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
        </Form>

        <Button type="submit" form="create-occurrence-form">
          Finalizar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
