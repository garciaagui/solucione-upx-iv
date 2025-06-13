import { Reply } from './replies'
import { UserBasicInfo } from './user'

export type Status = 'Aberto' | 'Analise' | 'Andamento' | 'Finalizado' | 'Arquivado'

export interface Complaint {
  id: string
  createdAt: Date
  updatedAt: Date
  description: string
  images: string[]
  userId: string
  title: string
  street: string
  neighborhood: string
  zipCode: string
  addressReference: string | null
  status: Status
  user: UserBasicInfo
  replies: Reply[]
}
