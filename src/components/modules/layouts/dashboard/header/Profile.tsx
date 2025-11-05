// 📦 Third-Party imports
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~core/ui/shadcn/tooltip';
import { Button } from '~core/ui/shadcn/button';

// 📦 Internal imports
import { extractUsername } from '~helpers/generators';
import { AuthServices } from '~services/auth';

// ⚙️ Functional component
const Profile = async () => {
  const { username } = await AuthServices.verifyAccessSession();

  if (!username) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="border-b-foreground/35 cursor-pointer border-y-2 border-t-transparent"
          variant={'ghost'}
          size={'icon'}
        >
          {extractUsername(username)}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{username} Profile</TooltipContent>
    </Tooltip>
  );
};
export default Profile;
