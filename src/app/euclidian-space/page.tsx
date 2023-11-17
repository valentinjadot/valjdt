"use client";

import { Canvas } from "@react-three/fiber";
import { Sphere } from "@react-three/drei"; // Importing some basic geometries

import styles from "./page.module.css";
import { useEffect } from "react";

const particlesData = [
  { position: [1, 1, 1] },
  { position: [-1, -1, -1] },
  { position: [2, 0, -2] },
];

const Page = () => {
  async function fetchPoints() {
    const response = await fetch("/api/three-d-points", {
      method: "GET",
    });

    const { success, points } = await response.json();

    if (success) {
      console.log(points);
    }
  }

  useEffect(() => {
    void fetchPoints();
  }, []);

  return (
    <div className={styles.scene}>
      <Canvas
        shadows
        className={styles.canvas}
        camera={{
          position: [-6, 7, 7],
        }}
      >
        {particlesData.map((particle, index) => (
          <Sphere key={index} position={particle.position} args={[0.1, 16, 16]}>
            <meshPhysicalMaterial color={"white"} />
          </Sphere>
        ))}
        <ambientLight color={"white"} intensity={3} />
      </Canvas>
    </div>
  );
};

export default Page;
