import { CameraOff } from 'lucide-react'

export default function ImageFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 bg-zinc-800 text-white">
      <CameraOff size={14} />
      <span className="text-sm">Erro ao carregar imagem</span>
    </div>
  )
}
