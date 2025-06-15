export type Role = 'user' | 'admin' | 'manager'

export interface UserBasicInfo {
  id: string
  name: string
  email: string
}

export interface User extends UserBasicInfo {
  role: Role
}
