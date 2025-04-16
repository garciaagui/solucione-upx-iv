import { Check } from 'lucide-react'
import { Separator } from './ui/separator'

interface StepperProgressProps {
  currentStep: number
  stepsArray: { step: number; label: string }[]
}

interface StepComponentProps {
  currentStep: number
  stepLabel: string
  stepNumber: number
  totalSteps: number
}

function StepComponent({ currentStep, stepLabel, stepNumber, totalSteps }: StepComponentProps) {
  const renderIcon = () => {
    const baseClasses =
      'size-4 rounded-full text-[10px] font-medium flex items-center justify-center'
    const activeStepClasses = 'bg-primary text-secondary'
    const nextStepClasses = 'bg-muted text-muted-foreground'

    if (stepNumber === currentStep) {
      return <div className={`${baseClasses} ${activeStepClasses}`}>{stepNumber}</div>
    } else if (stepNumber > currentStep) {
      return <div className={`${baseClasses} ${nextStepClasses}`}>{stepNumber}</div>
    } else {
      return <Check color="hsl(var(--primary))" size={16} />
    }
  }

  const renderText = () => {
    const textColor = stepNumber > currentStep ? 'text-muted-foreground' : 'text-primary'

    return <span className={`${textColor} text-sm font-medium`}>{stepLabel}</span>
  }

  const renderDivider = () => {
    const bgColor = stepNumber < currentStep ? 'bg-primary' : 'bg-muted'

    if (stepNumber < totalSteps) {
      return <Separator className={`${bgColor} hidden flex-1 sm:block`} />
    } else {
      return null
    }
  }

  return (
    <>
      <div className="flex w-auto items-center justify-start gap-2">
        {renderIcon()}
        {renderText()}
      </div>

      {renderDivider()}
    </>
  )
}

export default function StepperProgress({ currentStep, stepsArray }: StepperProgressProps) {
  return (
    <div className="flex items-center justify-evenly gap-3 sm:justify-between">
      {stepsArray.map(({ step, label }, index) => {
        return (
          <StepComponent
            key={index}
            currentStep={currentStep}
            stepLabel={label}
            stepNumber={step}
            totalSteps={stepsArray.length}
          />
        )
      })}
    </div>
  )
}
