// 📦 Third-Party imports

// 📦 Internal imports
import { UserServices } from '~services/repositories/user';
import { AuthServices } from '~services/repositories/auth';
import Additional from './Additional';
import Basics from './Basics';
import DeleteAccount from './DeleteAccount';

// ⚙️ Functional component
const PersonalInformationPageWrapper = async () => {
  const { username } = await AuthServices.verifyAccessSession();
  const userData = await UserServices.getUserDataByIdentifier(
    username!,
    'username profileImage email phoneNumber fullName',
  );

  const clientVisiblePhoneNumber =
    userData?.phoneNumber.slice(0, 4) +
    ' **** ' +
    userData?.phoneNumber.slice(8);

  return (
    <>
      <Basics
        username={userData?.username!}
        phoneNumber={clientVisiblePhoneNumber}
      />

      <br />

      <Additional
        username={userData?.username!}
        email={userData?.email}
        fullName={userData?.fullName}
        profileImage={userData?.profileImage}
      />

      <br />

      <DeleteAccount username={username || ''} />
    </>
  );
};
export default PersonalInformationPageWrapper;
