// 📌 Directives
'use client';

// 📦 Third-Party imports
import { ChevronLeft } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import React, { useState } from 'react';

// 📦 Internal imports
import { type StepsLabelT, stepNumberMap, stepHeadingMap } from '../local';
import PersonalInformation from './PersonalInformation';
import ContractSign from './ContractSign';
import Review from './Review';
import Done from './Done';

// 🧾 Local types and variables
interface PropsT {
  currentStep: StepsLabelT;
  backHandler: () => void;
  nextHandler: () => void;
}

// ⚙️ Functional component
const KycForm: React.FC<PropsT> = ({
  currentStep,
  backHandler,
  nextHandler,
}) => {
  const [backDisable, setBackDisable] = useState(false);
  const [nextDisable, setNextDisable] = useState(false);

  return (
    <div className="mt-5 border-t pt-5">
      <span className="text-xs font-light opacity-50">
        Step {stepNumberMap[currentStep]} / 4
      </span>
      <h4 className="mt-2 text-xl font-medium">
        {stepHeadingMap[currentStep].title}
      </h4>
      <p className="mt-1 text-sm font-extralight opacity-50">
        {stepHeadingMap[currentStep].subtitle}
      </p>

      {currentStep === 'Personal Information' ? (
        <PersonalInformation changeNextDisable={setNextDisable} />
      ) : currentStep === 'Contract Sign' ? (
        <ContractSign changeNextDisable={setNextDisable} />
      ) : currentStep === 'Review' ? (
        <Review changeNextDisable={setNextDisable} />
      ) : (
        <Done />
      )}

      {currentStep !== 'Done' && (
        <div className="mt-10 flex items-center justify-end gap-5">
          <Button
            variant={'secondary'}
            size={'lg'}
            className="cursor-pointer rounded-sm !px-8"
            onClick={backHandler}
            disabled={backDisable}
          >
            <ChevronLeft />
            Back
          </Button>
          <Button
            variant={'default'}
            size={'lg'}
            className="cursor-pointer rounded-sm !px-8 !text-white"
            onClick={nextHandler}
            disabled={nextDisable}
          >
            Next
            <ChevronLeft className="rotate-180" />
          </Button>
        </div>
      )}
    </div>
  );
};
export default KycForm;
