import { GlobalLoader } from '~core/ui/shared/loaders';

// ⚙️ Functional component
export default function Loading() {
  return (
    <div className="h-[40rem]">
      <GlobalLoader />
    </div>
  );
}
