import { useState } from "react";

export interface Step {
  number: number;
  title: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

export const useMultiStepForm = ({ 
  steps,
  setCount,
  setRegistered,
}: { 
  steps: Step[] 
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  setRegistered?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber <= Math.min(step + 1, steps.length)) {
      setStep(stepNumber);
    }
  };
  const handleReset = () => {
    setStep(1);
    if (setCount && setRegistered) {
      setCount(0);
      setRegistered(0);
    }
    localStorage.setItem("profileIds", JSON.stringify([]));
  };
  const handleGotoStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= steps.length) {
      setStep(stepNumber);
    }
  };

  return {
    step,
    handleNext,
    handlePrevious,
    handleStepClick,
    handleReset,
    handleGotoStep,
  };
};

