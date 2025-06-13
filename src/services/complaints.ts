import api from '@/lib/axios'
import { Complaint } from '@/types/complaint'
import { UUID } from 'crypto'

export const getComplaintById = async (id: UUID): Promise<Complaint> => {
  try {
    const response = await api.get(`/complaints/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
