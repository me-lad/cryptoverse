import { GlobalLoader } from '~core/global/loaders';

// ⚙️ Functional component
export default function Loading() {
  return (
    <div className="h-[40rem]">
      <GlobalLoader />
    </div>
  );
}
