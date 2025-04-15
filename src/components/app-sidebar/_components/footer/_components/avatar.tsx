import { Avatar as AvatarContainer, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserSession } from 'next-auth'

interface Props {
  user: UserSession
}

export default function Avatar({ user }: Props) {
  const { name } = user

  return (
    <AvatarContainer className="h-8 w-8 rounded-lg">
      <AvatarImage
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`}
        alt={name}
      />
      <AvatarFallback className="rounded-lg">{name[0].toUpperCase()}</AvatarFallback>
    </AvatarContainer>
  )
}
