import { AxiosError } from 'axios'

interface CustomErrorResponse {
  message: string
}

export type CustomAxiosError = AxiosError<CustomErrorResponse>
