// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';
import SidebarSettings from './SidebarSettings';
import DateTime from './DateTime';

// ⚙️ Functional component
const DashboardFooter = () => {
  return (
    <div className="px-7 py-4">
      <div className={flexBetween}>
        <div>
          <SidebarSettings />
        </div>

        <div>
          <DateTime />
        </div>
      </div>
    </div>
  );
};
export default DashboardFooter;
