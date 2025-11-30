// 📌 Directives
'use client';

// 📦 Third-Party imports
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';

// 📦 Internal imports
import type { StepsLabelT } from './local';
import Steps from './steps';
import Description from './description';
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
              className="mt-20 cursor-pointer !px-10 text-white"
              onClick={() => setCurrentStep('Personal Information')}
              size={'lg'}
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
