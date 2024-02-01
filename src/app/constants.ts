import * as THREE from "three";
import { ICameraCheckpoint } from "./types";

export const JUMP_TO_NEXT_CHECKPOINT_PROBABILITY = 0.0005;
export const CAMERA_LERPING_SPEED = 0.005;
export const CAMERA_SLOW_DRIFT = new THREE.Vector3(0, 0.00005, 0.000005);

export const CAMERA_CHECKPOINTS: ICameraCheckpoint[] = [
  {
    position: new THREE.Vector3(
      -1.8902862766203452,
      -10.059623003222585,
      -9.448457282856157
    ),
    target: new THREE.Vector3(0, 0, 0),
  },
  {
    position: new THREE.Vector3(
      1.0350680211244754,
      -8.900309339120255,
      -9.208664934345684
    ),
    target: new THREE.Vector3(11.8, 73, 0),
  },
  {
    position: new THREE.Vector3(
      -1.0768210728196461,
      -0.6197790427368659,
      -7.442524941149503
    ),
    target: new THREE.Vector3(-16.0, 158.5, 0),
  },
  {
    position: new THREE.Vector3(
      -0.2799933853755867,
      -9.875456011629812,
      -10.362669920281654
    ),
    target: new THREE.Vector3(-25, -2.70703125, 0),
  },
  {
    position: new THREE.Vector3(
      1.35572525822435,
      0.23499068367046272,
      -7.488510691722582
    ),
    target: new THREE.Vector3(-25, -2.70703125, 0),
  },
  {
    position: new THREE.Vector3(
      2.624767587018898,
      -3.1534538684778295,
      -8.462711301841157
    ),
    target: new THREE.Vector3(-25, -2.70703125, 0),
  },
  {
    position: new THREE.Vector3(
      -0.037965571261239006,
      -3.7084717530715965,
      -10.594219149352387
    ),
    target: new THREE.Vector3(-25, -2.70703125, 0),
  },
];
