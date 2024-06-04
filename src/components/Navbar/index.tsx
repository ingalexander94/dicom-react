import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import { publicRoutes } from "src/models";

const Navbar = () => {
  return (
    <header className={styles.navigation}>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={`/${publicRoutes.TWODIMENSIONAL}`}
        >
          Imágenes 2D
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={`/${publicRoutes.TRIDIMENSIONAL}`}
        >
          Imágenes 3D
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={`/${publicRoutes.DICOM}`}
        >
          Imágenes DCOM
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to={`/${publicRoutes.VIDEODICOM}`}
        >
          Video DCOM
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
