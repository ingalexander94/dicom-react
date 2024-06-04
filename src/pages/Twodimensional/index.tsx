import photo1 from "src/assets/2d/2023-09-06_003_OFELIA-HERNANDEZ-UpperJaw.jpg";
import photo2 from "src/assets/2d/2023-09-06_003_OFELIA-HERNANDEZ-LowerJaw.jpg";
import styles from "./twodimensional.module.css";

const TwoDimensional = () => {
  return (
    <section className={styles.twodimensional_wrapper}>
      <figure>
        <img src={photo1} alt="Photo 1" />
        <figcaption>2023-09-06_003_OFELIA-HERNANDEZ-UpperJaw.jpg</figcaption>
      </figure>
      <figure>
        <img src={photo2} alt="Photo 2" />
        <figcaption>2023-09-06_003_OFELIA-HERNANDEZ-LowerJaw.jpg</figcaption>
      </figure>
    </section>
  );
};

export default TwoDimensional;
