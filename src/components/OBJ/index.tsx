import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

type Props = {
  urlOBJ: string;
  urlMTL: string;
};

const OBJ = ({ urlOBJ }: Props) => {
  const obj = useLoader(OBJLoader, urlOBJ);

  return (
    <mesh>
      <primitive object={obj} />
    </mesh>
  );
};

export default OBJ;
