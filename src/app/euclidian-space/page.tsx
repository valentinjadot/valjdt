"use client";

import { Canvas } from "@react-three/fiber";
import { Sphere } from "@react-three/drei"; // Importing some basic geometries

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { IPoint } from "@/types";

interface IParticle {
  position: [number, number, number];
}

const Page = () => {
  const [particles, setParticles] = useState<IParticle[]>([]);

  async function fetchPoints() {
    const response = await fetch("/api/three-d-points", {
      method: "GET",
    });

    const { success, points } = await response.json();

    if (!(success && points.length > 0)) {
      throw new Error("Failed to fetch points");
    }

    return points as IPoint[];
  }

  useEffect(() => {
    async function loadData() {
      const points = await fetchPoints();
      setParticles(points.map((p) => ({ position: [p.x, p.y, p.z] })));
    }

    void loadData();
  }, []);

  return (
    <div className={styles.scene}>
      <Canvas
        shadows
        className={styles.canvas}
        camera={{
          position: [-10, 17, 17],
        }}
      >
        {particles.map((particle, index) => (
          <Sphere key={index} position={particle.position} args={[0.2, 15, 15]}>
            <meshPhysicalMaterial color={"white"} />
          </Sphere>
        ))}
        <ambientLight color={"white"} intensity={3} />
      </Canvas>
    </div>
  );
};

export default Page;
