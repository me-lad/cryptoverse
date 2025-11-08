import { CircleCheck, ClipboardList, Pen, SquareUserRound } from 'lucide-react';

export type StepsLabelT =
  | 'Personal Information'
  | 'Contract Sign'
  | 'Review'
  | 'Done';

export interface StepT {
  label: StepsLabelT;
  icon: React.FC;
}

export const steps: StepT[] = [
  {
    label: 'Personal Information',
    icon: SquareUserRound,
  },

  {
    label: 'Contract Sign',
    icon: Pen,
  },

  {
    label: 'Review',
    icon: ClipboardList,
  },

  {
    label: 'Done',
    icon: CircleCheck,
  },
] as const;

export const stepNumberMap: { [key in StepsLabelT]: number } = {
  'Personal Information': 1,
  'Contract Sign': 2,
  Review: 3,
  Done: 4,
};

export const stepHeadingMap: {
  [key in StepsLabelT]: {
    title: string;
    subtitle: string;
  };
} = {
  'Personal Information': {
    title: 'Verify your identity',
    subtitle: 'Fill in the required fields with your personal information',
  },
  'Contract Sign': {
    title: 'Terms and Agreements',
    subtitle:
      'Read below carefully and after confirmation, proceed to the next step.',
  },
  Review: {
    title: 'Review your information',
    subtitle:
      'Please take a moment to double-check your details for accuracy before submitting',
  },
  Done: {
    title: 'Your request is currently under review',
    subtitle: 'Please wait for confirmation',
  },
};
