"use client";

import { Canvas } from "@react-three/fiber";
import { CameraControls, Sphere, Text } from "@react-three/drei"; // Importing some basic geometries

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { IPoint } from "@/types";

const MULTIPLICATOR = 20;

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState<IPoint[]>([]);

  async function fetchPoints() {
    const response = await fetch("/api/three-d-points", {
      method: "GET",
      next: { revalidate: 4000 },
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
      setLoading(false);
      console.log(points);
    }

    void loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.scene}>
      <Canvas
        shadows
        className={styles.canvas}
        camera={{
          position: [-5, 15, 25],
        }}
      >
        <CameraControls />
        {points.map((point, index) => (
          <group key={index}>
            <Sphere
              key={index}
              position={[
                point.x * MULTIPLICATOR,
                point.y * MULTIPLICATOR,
                point.z * MULTIPLICATOR,
              ]}
              args={[0.2, 15, 15]}
            >
              <meshPhysicalMaterial
                color={
                  point.metadata.text.toLowerCase().match("boire")
                    ? "hotpink"
                    : "white"
                }
              />
            </Sphere>
            <Text
              position={[
                point.x * MULTIPLICATOR + 0.5,
                point.y * MULTIPLICATOR,
                point.z * MULTIPLICATOR,
              ]}
              color={
                point.metadata.text.toLowerCase().match("boire")
                  ? "hotpink"
                  : "white"
              }
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
