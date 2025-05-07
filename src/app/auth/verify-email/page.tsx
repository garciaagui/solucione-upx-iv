'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IconWrapper, OutputContainer } from './_components'

export default function VerifyEmail() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verificando seu e-mail, aguarde...')

  const searchParams = useSearchParams()
  const router = useRouter()

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
      } catch (err: any) {
        setStatus('error')
        setMessage(err.message)
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <main className="flex flex-col items-center justify-center py-4 text-center">
      <IconWrapper status={status} />
      <OutputContainer status={status} message={message} />
    </main>
  )
}
