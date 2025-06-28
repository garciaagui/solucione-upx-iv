'use client'

import { verifyEmail } from '@/services/auth'
import { CustomAxiosError } from '@/types/error'
import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { IconWrapper, OutputContainer } from './_components'

function VerifyEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verificando seu e-mail, aguarde...')

  const searchParams = useSearchParams()

  const { mutateAsync: verifyEmailMutation } = useMutation({
    mutationFn: async (token: string) => {
      return await verifyEmail(token)
    },
    onSuccess: (data) => {
      setStatus('success')
      setMessage(data.message)
    },
    onError: (error: CustomAxiosError) => {
      setStatus('error')
      const message = error.response?.data.message || 'Erro ao verificar e-mail'
      setMessage(message)
    },
  })

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('Token de verificação ausente.')
      return
    }

    verifyEmailMutation(token)
  }, [searchParams, verifyEmailMutation])

  return (
    <>
      <IconWrapper status={status} />
      <OutputContainer status={status} message={message} />
    </>
  )
}

export default function VerifyEmail() {
  return (
    <main className="flex flex-col items-center justify-center py-4 text-center">
      <Suspense
        fallback={
          <OutputContainer status={'loading'} message={'Verificando seu e-mail, aguarde...'} />
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </main>
  )
}
