import React, { Suspense, useRef, useState } from "react";
import { Canvas as ThreeCanvas, extend } from "@react-three/fiber";
import { PLYLoader } from "three/examples/jsm/Addons.js";
import Universe from "./Universe";
import _ from "lodash";
import { ICameraCheckpoint } from "@/types";
import { Html } from "@react-three/drei";

extend({ PLYLoader });

interface IProps {
  cameraCheckpoints: ICameraCheckpoint[];
}

function Loader() {
  return <Html center>Loading...</Html>;
}

function Canvas(props: IProps): JSX.Element {
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const startInactivityTimer = () => {
    inactivityTimer.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 300);
  };

  const stopInactivityTimer = () => {
    if (inactivityTimer.current != null) {
      clearTimeout(inactivityTimer.current);
    }
  };

  const handleUserInteraction = () => {
    setIsUserInteracting(true);

    stopInactivityTimer();
    startInactivityTimer();
  };

  const getNextCheckpoint = () => {
    return _.sample(props.cameraCheckpoints)!;
  };

  return (
    <ThreeCanvas
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      camera={{
        fov: 35,
        near: 0.1,
        far: 1000,
        position: getNextCheckpoint().position,
      }}
      onPointerDown={() => {
        handleUserInteraction();
      }}
      onWheel={() => {
        handleUserInteraction();
      }}
    >
      <Suspense fallback={<Loader />}>
        <Universe
          getNextCheckpoint={getNextCheckpoint}
          isUserInteracting={isUserInteracting}
        />
      </Suspense>
    </ThreeCanvas>
  );
}

export default Canvas;
