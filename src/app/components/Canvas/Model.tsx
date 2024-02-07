import React, { useEffect, useRef } from "react";
import { extend, useLoader } from "@react-three/fiber";
import { PLYLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

extend({ PLYLoader });

function Model(): JSX.Element {
  const geometry = useLoader(
    PLYLoader,
    "val-compressed.ply",
    undefined,
    (progressEvent) => {
      console.log(Math.floor(progressEvent.loaded / progressEvent.total) * 100);
    }
  );

  const meshRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (geometry) {
      const newGeometry = new THREE.BufferGeometry().copy(geometry);
      newGeometry.computeVertexNormals();
      const colors = newGeometry.attributes.color.array;

      const material = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.01,
      });

      material.color = new THREE.Color().fromArray(colors);

      if (meshRef.current) {
        meshRef.current.geometry = newGeometry;
        meshRef.current.material = material;
      }
    }
  }, [geometry]);

  return <points ref={meshRef} />;
}

export default Model;
