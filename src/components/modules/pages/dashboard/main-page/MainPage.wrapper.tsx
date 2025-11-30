// 📌 Directives

// 📦 Third-Party imports

// 📦 Internal imports
import Market from './market';
import Identity from './security-identity/Identity';
import Security from './security-identity/Security';
import UserData from './user-data';

// ⚙️ Functional component
const MainPageWrapper = () => {
  return (
    <div>
      <UserData />

      <div className="mt-20 md:hidden">
        <Security />
      </div>
      <div className="mt-20 md:hidden">
        <Identity />
      </div>

      <div className="mt-20 hidden items-start md:flex">
        <div className="w-1/2 -translate-x-2.5 pl-2.5">
          <Security />
        </div>
        <div className="w-1/2 pl-2.5">
          <Identity />
        </div>
      </div>

      <div className="mt-20">
        <Market />
      </div>
    </div>
  );
};
export default MainPageWrapper;
