import React, { RefObject, use, useEffect, useRef, useState } from "react";
import { Camera, useFrame, useThree } from "@react-three/fiber";
import Model from "./Model";

import _ from "lodash";
import {
  CAMERA_LERPING_SPEED,
  CAMERA_SLOW_DRIFT,
  JUMP_TO_NEXT_CHECKPOINT_PROBABILITY,
} from "@/constants";
import { ICameraCheckpoint } from "@/types";
import { OrbitControls, OrbitControlsProps } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Vector3 } from "three";

interface IProps {
  getNextCheckpoint: () => ICameraCheckpoint;
  isUserInteracting: boolean;
}

function Universe(props: IProps): JSX.Element {
  const initialCheckpoint = props.getNextCheckpoint();

  const orbitRef = useRef<any>(null);
  const checkpoint = useRef(initialCheckpoint);

  const updateCameraPositionAndTarget = (
    camera: Camera,
    position: Vector3,
    target: Vector3
  ) => {
    camera.position.lerp(position, CAMERA_LERPING_SPEED);
    if (orbitRef.current != null) {
      orbitRef.current.target.lerp(target, CAMERA_LERPING_SPEED);
    }
  };

  useFrame(({ camera }) => {
    if (Math.random() < JUMP_TO_NEXT_CHECKPOINT_PROBABILITY) {
      checkpoint.current = props.getNextCheckpoint();
    }

    if (!props.isUserInteracting) {
      updateCameraPositionAndTarget(
        camera,
        checkpoint.current.position,
        checkpoint.current.target
      );
    }
  });

  return (
    <>
      <Model />
      <OrbitControls
        ref={orbitRef}
        zoomSpeed={0.008}
        enableZoom
        enablePan
        enableDamping
        autoRotateSpeed={0.1}
        dampingFactor={0.08}
        maxPolarAngle={Math.PI}
        panSpeed={0.005}
        rotateSpeed={0.005}
        target={
          checkpoint ? checkpoint.current.target : initialCheckpoint.target
        }
      />
    </>
  );
}

export default Universe;
