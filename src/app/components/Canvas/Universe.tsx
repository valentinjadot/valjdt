import React from "react";
import { extend, useFrame } from "@react-three/fiber";

import Model from "./Model";
import { OrbitControls } from "@react-three/drei";

function Universe(): JSX.Element {
  useFrame(({ camera }) => {
    console.log(camera.position);

    camera.position.z -= 0.00005;
    camera.position.y -= 0.000005;
  });

  return (
    <>
      <Model />
      <OrbitControls
        zoomSpeed={0.025}
        enableZoom
        enablePan
        enableDamping
        maxPolarAngle={Math.PI}
      />
    </>
  );
}

export default Universe;
