import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

type Props = {
  urlOBJ: string;
  urlMTL: string;
};

const OBJ = ({ urlOBJ }: Props) => {
  const obj = useLoader(OBJLoader, urlOBJ);
  const copiedScene = useMemo(() => obj.clone(), [obj]);
  return (
    <mesh>
      <primitive object={copiedScene} />
    </mesh>
  );
};

export default OBJ;
