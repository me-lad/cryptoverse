// 📦 Third-Party imports
import React from 'react';
import clsx from 'clsx';

// 📦 Internal imports
import { flexCenter } from '~styles/tw-custom';
import { steps, type StepsLabelT } from '../local';

// 🧾 Local types
interface PropsT {
  currentStep: StepsLabelT | null;
}

// ⚙️ Functional component
const Steps: React.FC<PropsT> = ({ currentStep }) => {
  return (
    <>
      <h2 className="text-center text-xl font-semibold">
        KYC Verification Steps
      </h2>

      <div className={`${flexCenter} mx-auto mt-10 w-3/4`}>
        {steps.map((step, index) => (
          <div key={step.label} className="flex">
            <div className={`${flexCenter} flex-col gap-2`}>
              <div
                className={clsx(
                  'rounded-md p-2.5 *:size-6',
                  flexCenter,
                  currentStep === step.label
                    ? 'bg-primary'
                    : 'bg-background-lighter',
                )}
              >
                <step.icon />
              </div>
              <p className="min-w-40 text-center font-medium">{step.label}</p>
            </div>

            {index !== steps.length - 1 && (
              <span className="bg-foreground/20 mt-5 h-[1px] w-20"></span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default Steps;
