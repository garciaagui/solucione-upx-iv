'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { IconWrapper, OutputContainer } from './_components'

function VerifyEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verificando seu e-mail, aguarde...')

  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('Token de verificação ausente.')
      return
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || 'Erro ao verificar e-mail')
        }

        setStatus('success')
        setMessage(data.message)
      } catch (err) {
        const error = err as Error
        setStatus('error')
        setMessage(error.message || 'Erro ao verificar e-mail')
      }
    }

    verifyEmail()
  }, [searchParams])

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
