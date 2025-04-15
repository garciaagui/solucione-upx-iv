import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface ContextValue {
  currentStep: number
  nextStep: () => void
  previousStep: () => void
  resetStep: () => void
  stepsNumber: number
}

interface ProviderProps {
  children: ReactNode
  initialStep?: number
  stepsNumber: number
}

const StepperContext = createContext<ContextValue | undefined>(undefined)

export const StepperProvider = ({ stepsNumber, initialStep = 1, children }: ProviderProps) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep)

  const previousStep = useCallback(() => {
    setCurrentStep((prevState) => Math.max(0, prevState - 1))
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prevState) => Math.min(stepsNumber, prevState + 1))
  }, [stepsNumber])

  const resetStep = useCallback(() => {
    setCurrentStep(initialStep)
  }, [initialStep])

  return (
    <StepperContext.Provider
      value={{ currentStep, nextStep, previousStep, resetStep, stepsNumber }}
    >
      {children}
    </StepperContext.Provider>
  )
}

export const useStepper = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('"useStepper" must be used within "StepperProvider"')
  }
  return context
}
