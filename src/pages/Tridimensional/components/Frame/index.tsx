import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Loading from "../Loading";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Frame = ({ children }: Props) => {
  return (
    <Canvas
      linear
      camera={{
        position: [0, 0, 80],
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 1]} intensity={4} />
      <directionalLight position={[0, 0, -1]} intensity={4} />
      <OrbitControls />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Canvas>
  );
};

export default Frame;
