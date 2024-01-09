import React from "react";
import { Canvas as ThreeCanvas, extend } from "@react-three/fiber";
import { PLYLoader } from "three/examples/jsm/Addons.js";
import Universe from "./Universe";

extend({ PLYLoader });

function Canvas(): JSX.Element {
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
        position: [-3.100072314707832, -8.135709112107289, -9.249370277387756],
      }}
    >
      <Universe />
    </ThreeCanvas>
  );
}

export default Canvas;
