"use client";

import { Canvas } from "@react-three/fiber";
import { Sphere, Text } from "@react-three/drei"; // Importing some basic geometries

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { IPoint } from "@/types";

const Page = () => {
  const [points, setPoints] = useState<IPoint[]>([]);

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
      setPoints(points);
      console.log(points);
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
        {points.map((point, index) => (
          <group key={index}>
            <Sphere
              key={index}
              position={[point.x, point.y, point.z]}
              args={[0.2, 15, 15]}
            >
              <meshPhysicalMaterial color={"white"} />
            </Sphere>
            <Text
              position={[point.x + 0.5, point.y, point.z]}
              color={"white"}
              fontSize={1}
            >
              {point.metadata.text.substring(0, 10)}
            </Text>
          </group>
        ))}

        <ambientLight color={"white"} intensity={3} />
      </Canvas>
    </div>
  );
};

export default Page;
