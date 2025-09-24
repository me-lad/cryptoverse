// 📌 Directives

// 📦 Third-Party imports
import { Button } from '@/components/core/ui/shadcn/button';
import { Search } from 'lucide-react';

// 📦 Internal imports

// 🧾 Local types

// ⚙️ Functional component
export default function HeaderSearchUi() {
  return (
    <div className="relative">
      {/* Icon */}
      <Button className="cursor-pointer" size="lg" variant="secondary">
        <Search strokeWidth={2.5} color="#fff" />
      </Button>

      {/* Modal */}
      <div></div>
    </div>
  );
}
