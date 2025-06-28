import { CustomAxiosError } from '@/types/error'
import { ToastError } from '../toast'

export const handleMutationError = (error: Error, customMessage = 'Erro inesperado') => {
  const axiosError = error as CustomAxiosError
  const message = axiosError.response?.data.message || customMessage
  ToastError(message)
}
