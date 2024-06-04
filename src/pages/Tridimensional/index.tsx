import { useState } from "react";
import arrow from "src/assets/icons/arrow.svg";
import { OBJ } from "src/components";
import { Frame } from "./components";
import styles from "./tridimensional.module.css";
import { OBJModel } from "src/interfaces";

const obj: OBJModel[] = [
  {
    pathOBJ: "src/assets/obj/2023-09-06_003_OFELIA-HERNANDEZ-LowerJaw.obj",
    pathMTL: "src/assets/obj/2023-09-06_003_OFELIA-HERNANDEZ-LowerJaw.mtl",
    filename: "2023-09-06_003_OFELIA-HERNANDEZ-LowerJaw.obj",
  },
  {
    pathOBJ: "src/assets/obj/2023-09-06_003_OFELIA-HERNANDEZ-UpperJaw.obj",
    pathMTL: "src/assets/obj/2023-09-06_003_OFELIA-HERNANDEZ-UpperJaw.mtl",
    filename: "2023-09-06_003_OFELIA-HERNANDEZ-UpperJaw.obj",
  },
];

const Tridimensional = () => {
  const [index, setIndex] = useState<number>(0);

  const handlePrevious = () => {
    setIndex(index === 0 ? obj.length - 1 : index - 1);
  };

  const handleNext = () => {
    setIndex(index === obj.length - 1 ? 0 : index + 1);
  };

  return (
    <section className={styles.tridimensional_wrapper}>
      <h3>{obj[index].filename}</h3>
      <article>
        <button onClick={handlePrevious} className={styles.left}>
          <img src={arrow} alt="arrow icon" />
        </button>
        <div>
          <Frame>
            <OBJ urlOBJ={obj[index].pathOBJ} urlMTL={obj[index].pathMTL} />
          </Frame>
        </div>
        <button onClick={handleNext}>
          <img src={arrow} alt="arrow icon" />
        </button>
      </article>
      <p>
        <strong>{index + 1}</strong>/{obj.length}
      </p>
    </section>
  );
};

export default Tridimensional;
