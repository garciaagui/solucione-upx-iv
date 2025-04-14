import { Loader2 } from 'lucide-react'

interface LoadingMessageProps {
  message: string
  className?: string
}

export default function LoadingMessage({ message, className }: LoadingMessageProps) {
  return (
    <div className={`${className} flex w-full flex-row items-center justify-center gap-2`}>
      <Loader2 className="animate-spin" />
      <span>{message}</span>
    </div>
  )
}
