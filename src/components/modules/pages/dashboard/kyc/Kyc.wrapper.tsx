// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useState } from 'react';

// 📦 Internal imports
import Steps from './steps';
import type { StepsLabelT, StepT } from './local';
import Description from './description';
import { Button } from '@/components/core/ui/shadcn/button';
import { ChevronRight } from 'lucide-react';
import KycForm from './form';

// ⚙️ Functional component
const KycWrapper = () => {
  const [currentStep, setCurrentStep] = useState<StepsLabelT | null>(null);

  const backHandler = () => {
    setCurrentStep(() => {
      if (currentStep === 'Personal Information') return null;
      if (currentStep === 'Contract Sign') return 'Personal Information';
      if (currentStep === 'Review') return 'Contract Sign';
      return 'Review';
    });
  };
  const nextHandler = () => {
    setCurrentStep(() => {
      if (currentStep === 'Personal Information') return 'Contract Sign';
      if (currentStep === 'Contract Sign') return 'Review';
      return 'Done';
    });
  };

  return (
    <div className="mt-5">
      <div className="bg-background rounded-sm p-4">
        <Steps currentStep={currentStep} />
      </div>

      {!currentStep ? (
        <Description>
          <div className="flex justify-center">
            <Button
              className="mt-10 cursor-pointer !px-10 text-white"
              size={'lg'}
              onClick={() => setCurrentStep('Personal Information')}
            >
              Start
              <ChevronRight strokeWidth={4} className="mt-0.5 size-3.5" />
            </Button>
          </div>
        </Description>
      ) : (
        <KycForm
          currentStep={currentStep}
          backHandler={backHandler}
          nextHandler={nextHandler}
        />
      )}
    </div>
  );
};
export default KycWrapper;
