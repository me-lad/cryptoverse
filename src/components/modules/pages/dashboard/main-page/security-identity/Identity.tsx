// 📦 Third-Party imports
import { Button } from '~core/ui/shadcn/button';
import { Check, Upload } from 'lucide-react';

// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';
import FluidContainer from '../../FluidContainer';

// ⚙️ Functional component
const Identity = () => {
  return (
    <FluidContainer condense_title="Identity">
      <h2 className="text-xl font-semibold">
        Identity Verification
        <small className="mt-1 block text-xs font-normal opacity-70">
          This process only takes around 1 minute.
        </small>
      </h2>

      <div className="mt-5 *:not-first:mt-2">
        <div className={`${flexBetween} mt-2.5`}>
          <p>Basic Information</p>
          <Button
            variant={'ghost'}
            disabled
            className="text-status-success-200 min-w-28 justify-start !opacity-100"
          >
            <Check className="mt-0.5" strokeWidth={2.5} />
            Uploaded
          </Button>
        </div>

        <div className={flexBetween}>
          <p>Additional Information</p>
          <Button
            variant={'ghost'}
            className="min-w-28 cursor-pointer justify-start !opacity-100"
          >
            <Upload />
            Upload
          </Button>
        </div>

        <div className={flexBetween}>
          <p>ID Photo</p>
          <Button
            variant={'ghost'}
            className="min-w-28 cursor-pointer justify-start !opacity-100"
          >
            <Upload />
            Upload
          </Button>
        </div>

        <div className={flexBetween}>
          <p>Terms & Agreements</p>
          <Button
            variant={'ghost'}
            className="min-w-28 cursor-pointer justify-start !opacity-100"
          >
            <Upload />
            Upload
          </Button>
        </div>
      </div>
    </FluidContainer>
  );
};
export default Identity;
