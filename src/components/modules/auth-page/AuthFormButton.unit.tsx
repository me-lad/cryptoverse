// Directives
"use client";

// Packages imports
import { useFormStatus } from "react-dom";

// Local imports
import { Button } from "@/components/ui/shadcn/button";

// Local types
type PropsType = {
  buttonText: string;
  additiveClassName?: string;
};

// Functional component
export default function AuthFormButtonUnit({
  buttonText,
  additiveClassName = "mt-4 flex cursor-pointer items-center",
}: PropsType) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={`w-full text-white ${additiveClassName}`}
      size="lg"
      type="submit"
      disabled={pending}
    >
      <span>{pending ? "Processing..." : buttonText}</span>
    </Button>
  );
}
