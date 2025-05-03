import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useAuthDialog } from '../_utils/context'

interface Props {
  children: ReactNode
}

export default function AnimationWrapper({ children }: Props) {
  const { selectedForm } = useAuthDialog()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={selectedForm}
        initial={{ opacity: 0, x: selectedForm === 'login' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: selectedForm === 'login' ? 20 : -20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
