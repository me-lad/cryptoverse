// Packages imports
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

// Local imports
import { flexCenter } from "@/lib/shared/tw-custom";

// Local types
type PropsType = {
  visibility: boolean;
  toggleVisibility: () => void;
};

// Functional component
export default function AuthFormFieldTogglerPasswordUi({
  visibility,
  toggleVisibility,
}: PropsType) {
  return (
    <span
      onClick={toggleVisibility}
      className={clsx(
        "absolute top-[0.6rem] right-3 z-50 m-auto cursor-pointer",
        flexCenter,
      )}
    >
      {visibility ? <Eye size={18} /> : <EyeOff size={18} />}
    </span>
  );
}
