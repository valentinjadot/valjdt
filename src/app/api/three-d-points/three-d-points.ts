import { IPoint, Metadata } from "@/types";
import { connectToPinecone } from "@/utils/connectToPinecone";
import { ScoredPineconeRecord } from "@pinecone-database/pinecone";
import { DEFAULT_VECTOR } from "./constants";
import * as druid from "@saehrimnir/druidjs";
import { normalizePoint } from "./normalize";

type ThreeDCoordinatesList = number[];

const EVERYTHING = 1000;

export const threeDPoints = async (): Promise<IPoint[]> => {
  const allVectors: ScoredPineconeRecord<Metadata>[] = await getAllVectors();

  const coordinatesList: ThreeDCoordinatesList = reduceDimensionality(
    allVectors.map((vector) => vector.values)
  );

  const points = addMetadataToPoints(
    generatePoints(coordinatesList),
    allVectors
  );

  return normalizePoint(points);
};

const generatePoints = (threeDCoordinatesList: ThreeDCoordinatesList) => {
  let points: Omit<IPoint, "metadata">[] = [];
  for (let i = 0; i < threeDCoordinatesList.length; i += 3) {
    points.push({
      x: threeDCoordinatesList[i] || 0,
      y: threeDCoordinatesList[i + 1] || 0,
      z: threeDCoordinatesList[i + 2] || 0,
    });
  }
  return points;
};

const addMetadataToPoints = (
  points: Omit<IPoint, "metadata">[],
  allVectors: ScoredPineconeRecord<Metadata>[]
): IPoint[] => {
  return points.map((point, index) => {
    return {
      ...point,
      metadata: allVectors[index].metadata as Metadata,
    };
  });
};

const getAllVectors = async (): Promise<ScoredPineconeRecord<Metadata>[]> => {
  const index = await connectToPinecone();

  const queryResult = await index.query({
    vector: DEFAULT_VECTOR,
    topK: EVERYTHING,
    includeMetadata: true,
    includeValues: true,
  });

  console.log(queryResult.matches);

  return queryResult.matches || [];
};

const reduceDimensionality = (vectorValues: number[][]) => {
  let matrix = druid.Matrix.from(vectorValues);

  const dr = new druid.PCA(matrix, {
    d: 3,
  }).transform();

  const validReducedData =
    typeof dr._data === "object" &&
    Object.keys(dr._data).length > 0 &&
    typeof dr._data[0] === "number";

  if (!validReducedData) throw new Error("Dimensionality reduction failed");

  return Object.values(dr._data) as ThreeDCoordinatesList;
};
