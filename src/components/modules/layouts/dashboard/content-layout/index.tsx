// 📦 Third-Party imports
import React from 'react';

// 🧾 Local types
interface PropsT {
  children: React.ReactNode;
}

// ⚙️ Functional component
const ContentLayout: React.FC<PropsT> = ({ children }) => {
  return (
    <div className="h-[calc(100dvh-_70px_)] overflow-y-auto px-4 py-8 sm:px-8">
      {children}
    </div>
  );
};
export default ContentLayout;
