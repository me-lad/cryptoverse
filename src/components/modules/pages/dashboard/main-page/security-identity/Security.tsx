// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';

// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';
import FluidContainer from '../../FluidContainer';
import { Check, Ghost, Pen, Plus, Upload, X } from 'lucide-react';
import Link from 'next/link';

// ⚙️ Functional component
const Security = () => {
  return (
    <FluidContainer condense_title="Security">
      <h2 className="text-xl font-semibold">
        Security
        <small className="mt-1 block text-xs font-normal opacity-70">
          Increase your account security strength
        </small>
      </h2>

      <div className="mt-5 *:not-first:mt-2">
        <div className={flexBetween}>
          <p>Password</p>
          <Button
            variant={'ghost'}
            disabled
            className="text-status-success-200 min-w-[6.5rem] justify-start !opacity-100"
          >
            <Check className="mt-0.5" strokeWidth={2.5} />
            Active
          </Button>
        </div>
        <div className={flexBetween}>
          <p>2-Step Verification</p>
          <Button
            variant={'ghost'}
            disabled
            className="text-status-success-200 min-w-[6.5rem] justify-start !opacity-100"
          >
            <Check className="mt-0.5" strokeWidth={2.5} />
            Active
          </Button>
        </div>
        <div className={flexBetween}>
          <p>2-FA Authenticator</p>
          <Link href={'/dashboard/two-factor-auth'}>
            <Button variant={'ghost'} className="min-w-[6.5rem] cursor-pointer">
              Activate
            </Button>
          </Link>
        </div>
        <div className={flexBetween}>
          <p>KYC Verification</p>
          <Link href={'/dashboard/kyc'}>
            <Button
              variant={'ghost'}
              className="min-w-[6.5rem] cursor-pointer justify-center"
            >
              Activate
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-3">
        <p className="text-xs font-medium opacity-90">Strength</p>
        <div className="mt-1 flex items-center gap-1">
          <div className="bg-primary h-1.5 w-5 rounded-[9999px]"></div>
          <div className="bg-primary h-1.5 w-5 rounded-[9999px]"></div>
          <div className="bg-primary h-1.5 w-5 rounded-[9999px]"></div>
          <div className="bg-background-lighter h-1.5 w-5 rounded-[9999px]"></div>
          <div className="bg-background-lighter h-1.5 w-5 rounded-[9999px]"></div>
        </div>
      </div>
    </FluidContainer>
  );
};
export default Security;
