import { Status } from './complaint'
import { UserBasicInfo } from './user'

export interface Reply {
  id: string
  createdAt: Date
  updatedAt: Date
  description: string
  images: string[]
  userId: string
  complaintId: string
  complaintStatus: Status
  user: UserBasicInfo
}
