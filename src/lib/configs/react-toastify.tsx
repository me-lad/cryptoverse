// 📦 Third-Party imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

// 🧾 Local types
export const toastsCustomID = 'verse-toast-2024';

// ⚙️ Functional component
const ReactToastify = () => {
  return (
    <ToastContainer
      limit={5}
      position="top-left"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      icon={false}
      pauseOnFocusLoss={false}
      theme="dark"
      pauseOnHover
      closeOnClick
    />
  );
};
export default ReactToastify;
