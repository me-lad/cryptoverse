// Local types
type PropsType = {
  errors: string[];
};

// Functional component
export default function AuthFormFieldErrorsUi({ errors }: PropsType) {
  return (
    <ul className="flex list-inside list-disc flex-col gap-1">
      {errors.map((err, index) => (
        <li
          className="text-status-error-200 items-center text-[0.915rem] font-medium first:mt-2"
          key={index}
        >
          {err}
        </li>
      ))}
    </ul>
  );
}
