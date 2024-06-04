import { Html } from "@react-three/drei";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <Html center>
      <div className={styles.loader}></div>
    </Html>
  );
};

export default Loading;
