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
import { useForm } from 'react-hook-form'
import { createOccurrenceSchema, CreateOccurrenceType } from './_utils/constants'
import { zipCodeMask } from './_utils/functions'

export default function CreateOccurrence() {
  const form = useForm<CreateOccurrenceType>({
    resolver: zodResolver(createOccurrenceSchema),
  })

  const { handleSubmit, control } = form

  const create = () => console.log('TESTE')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Abrir reclamação</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova reclamação</DialogTitle>
          <DialogDescription>Nova reclamação</DialogDescription>
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
                    <Input placeholder="Exemplo: Falta de coleta de lixo" type="text" {...field} />
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
                      placeholder="Forneça uma descrição detalhada do problema"
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
                    <Input placeholder="X" type="text" {...field} />
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
                    <Input placeholder="X" type="text" {...field} />
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
                      placeholder="X"
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
                    <Input placeholder="X" type="text" {...field} />
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
