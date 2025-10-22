// 📦 Internal imports
import styles from './PortableLoader.module.css';

// 🧾 Local types
type PropsT = {
  width: `${number}px`;
  height: `${number}px`;
};

// ⚙️ Functional component
export const PortableLoader: React.FC<PropsT> = ({ width, height }) => {
  return <span style={{ width, height }} className={styles.loader}></span>;
};
